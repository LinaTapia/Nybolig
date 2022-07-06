//Contenedor de los fomularios login - crear cuenta y actualiza contraseña.
const formulario = document.getElementById("contenedor-formulario");

// Clase constructora Usuario
class Usuario {
    constructor(nombre, email, contrasenia) {
        this.nombre = nombre;
        this.email = email;
        this.contrasenia = contrasenia;
    }
}

//Array para cuentas creadas
const usuarios = [];

//Función con cuentas ya existentes en la Base de datos
const usuariosPorDefecto = () => {
    usuarios.push(new Usuario("admin123", "admin@gmail.com", "admin123"));
    usuarios.push(new Usuario("coder123", "coder@gmail.com", "house123"));
}

usuariosPorDefecto();


//Función para volver a desplegar formulario de login
const login = () => {
    formulario.innerHTML = "";
    formulario.innerHTML += `
    <h2 class="section-01__titulo">Comienza a usar Nybolig</h2>
    <p class="section-01__bajada">No tienes cuenta? <span class="section-01__bajada--link" id="crear-cuenta">Créala
            aquí.</span></p>
    <div class="form-floating mb-4">
        <input type="text" class="form-control section-01__form" id="usuario" placeholder="Usuario">
        <label for="usuario" class="section-01__placeholder"><i class="bi bi-person-fill"></i> Usuario</label>
    </div>
    <div class="form-floating">
        <input type="password" class="form-control section-01__form" id="contrasenia" placeholder="Contraseña">
        <label for="contrasenia" class="section-01__placeholder"><i class="bi bi-lock-fill"></i> Contraseña</label>
    </div>
    <p class="section-01__error text-center pt-3 d-none" id="error"></p>
    <p class="section-01__forget text-center my-4 pb-2" id="restablecer">¿Olvidaste tu Contraseña?</p>
    <a href="#" class="btn d-flex align-items-center justify-content-center section-01__btn" id="boton-login">Iniciar</a>`;

    //Login
    const usuarioInput = document.getElementById("usuario");
    const contraInput = document.getElementById("contrasenia");
    const botonIniciar = document.getElementById("boton-login");
    const mensajeError = document.getElementById("error");

    const usuarioExiste = () => {
        let buscar = usuarios.find((usuario) => usuario.nombre === usuarioInput.value && usuario.contrasenia === contraInput.value);

        const usuarioValido = () => {
            const guardarUsuarioLogeado = () => {
                const usuarioLogeado = {
                    usuario: usuarioInput.value
                }
                sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioLogeado));
            }

            guardarUsuarioLogeado();
            mensajeError.innerText = "";
            botonIniciar.href = "./procesos.html";
        }

        const llenarCampos = () => {
            alertAdvertencia("Debes llenar todos los campos.");
        }

        const usuarioInvalido = () => {
            alertErrores("Usuario y/o contraseña incorrectos.");
        }

        buscar !== undefined ? usuarioValido() :
            usuarioInput.value == "" || contraInput.value == "" ? llenarCampos() :
            buscar == undefined ? usuarioInvalido() : "";
    }

    botonIniciar.addEventListener("click", () => {
        usuarioExiste();
    });

    //Crear Cuenta
    const crearCuenta = document.getElementById("crear-cuenta");
    crearCuenta.addEventListener("click", () => {
        cuenta();

    });

    //Restablecer Contraseña
    const restCont = document.getElementById("restablecer");
    restCont.addEventListener("click", () => {
        restablecer();
    });
}

const cuenta = () => {
    formulario.innerHTML = "";
    formulario.innerHTML += `
    <h2 class="section-01__titulo">Crea una cuenta <i class="bi bi-box-arrow-in-left" id="redirect"></i></h2>
    <p class="section-01__bajada">Empieza a usar la plataforma para reclutadores favorita.</p>
    <div class="form-floating mb-4">
        <input type="text" class="form-control section-01__form" id="usuarioNuevo" placeholder="Usuario">
        <label for="usuarioNuevo" class="section-01__placeholder"><i class="bi bi-person-fill"></i>
            Usuario</label>
    </div>
    <div class="form-floating mb-4">
        <input type="email" class="form-control section-01__form" id="correoNuevo"
            placeholder="correo">
        <label for="correoNuevo" class="section-01__placeholder"><i class="bi bi-envelope-fill"></i>
            E-mail</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control section-01__form" id="contraseniaNuevo"
            placeholder="Contraseña">
        <label for="contraseniaNuevo" class="section-01__placeholder"><i class="bi bi-lock-fill"></i>
            Contraseña</label>
    </div>
    <p class="section-01__error text-center py-3 d-none" id="error"></p>
    <a href="#"
        class="btn d-flex align-items-center justify-content-center section-01__btn" id="boton-cuenta">Iniciar</a>`;


    const crearBoton = document.getElementById("boton-cuenta");
    const crearUsuario = document.getElementById("usuarioNuevo");
    const crearCorreo = document.getElementById("correoNuevo");
    const crearContra = document.getElementById("contraseniaNuevo");
    const mensajeError = document.getElementById("error");
    const redirect = document.getElementById("redirect");

    redirect.addEventListener("click", () => {
        login();
    });

    crearBoton.addEventListener("click", () => {

        let buscar = usuarios.find((usuario) => usuario.nombre === crearUsuario.value || usuario.email === crearCorreo.value);

        const usuarioValido = () => {
            const guardarNuevaCuenta = () => {
                const cuentaCreada = {
                    usuario: crearUsuario.value,
                    correo: crearCorreo.value
                }

                sessionStorage.setItem("cuentaCreada", JSON.stringify(cuentaCreada));
            }

            usuarios.push(new Usuario(crearUsuario.value, crearCorreo.value, crearContra.value));

            guardarNuevaCuenta();
            alertExito("Cuenta creada correctamente.", login());
        }

        const llenarCampos = () => {
            alertAdvertencia("Debes llenar todos los campos.");
        }

        const usuarioInvalido = () => {
            alertErrores("Usuario y/o Correo ya registrado.");
        }

        buscar !== undefined ? usuarioInvalido() :
            crearUsuario.value == "" || crearCorreo.value == "" || crearContra.value == "" ? llenarCampos() :
            buscar == undefined && crearContra !== "" ? usuarioValido() : "";
    });

    const obtenerCuentaGuardada = () => {
        const cuentaCreada = JSON.parse(sessionStorage.getItem("cuentaCreada"));

        const trueCondition = () => {
            crearUsuario.value = cuentaCreada.usuario;
            crearCorreo.value = cuentaCreada.correo;
        }

        sessionStorage.getItem("cuentaCreada") && trueCondition();
    }

    obtenerCuentaGuardada();
}

const restablecer = () => {
    formulario.innerHTML = "";
    //Template para confirmar cuenta antes de restablecer contraseña
    const tempComprobarUsuario = `
    <h2 class="section-01__titulo">Restablece tu contraseña <i class="bi bi-box-arrow-in-left" id="redirect"></i></h2>
       <div class="form-floating my-4">
            <input type="email" class="form-control section-01__form" id="ResCorreo"
                placeholder="correo">
            <label for="ResCorreo" class="section-01__placeholder"><i class="bi bi-envelope-fill"></i>
                E-mail</label>
        </div>
        <div class="form-floating mb-3">
            <input type="password" class="form-control section-01__form" id="ResContrasenia"
                placeholder="Contraseña">
            <label for="ResContrasenia" class="section-01__placeholder"><i class="bi bi-lock-fill"></i>
                Contraseña</label>
        </div>
        <p class="section-01__error text-center py-3 d-none" id="ResError"></p>
        <a href="#" class="btn d-flex align-items-center justify-content-center section-01__btn mt-5"
            id="boton-continuar">Continuar</a>`;

    const tempNuevaContrasenia = `
    <h2 class="section-01__titulo">Restablece tu contraseña <i class="bi bi-box-arrow-in-left" id="redirect"></i></h2>
    <div class="form-floating my-4">
        <input type="password" class="form-control section-01__form" id="contraseniaNueva"
            placeholder="Contraseña">
        <label for="contraseniaNueva" class="section-01__placeholder"><i class="bi bi-lock-fill"></i>
            Contraseña Nueva</label>
    </div>
    <div class="form-floating mb-3">
        <input type="password" class="form-control section-01__form" id="confirmarContrasenia"
            placeholder="Contraseña">
        <label for="confirmarContrasenia" class="section-01__placeholder"><i class="bi bi-lock-fill"></i>
            Confirma Contraseña</label>
    </div>
        <p class="section-01__error text-center py-3 d-none" id="ResError2"></p>
        <p class="section-01__exito text-center py-3 d-none" id="exito"></p>
        <a href="#" class="btn d-flex align-items-center justify-content-center section-01__btn mt-4"
            id="boton-confirmar">Confirmar</a>`;

    formulario.innerHTML += tempComprobarUsuario;

    const contBoton = document.getElementById("boton-continuar");
    const inputCorreo = document.getElementById("ResCorreo");
    const inputContra = document.getElementById("ResContrasenia");
    const mensajeError = document.getElementById("ResError");
    const redirect = document.getElementById("redirect");

    redirect.addEventListener("click", () => {
        login();
    });

    contBoton.addEventListener("click", () => {

        let buscar = usuarios.find((usuario) => usuario.email === inputCorreo.value && usuario.contrasenia === inputContra.value);

        const usuarioValido = () => {
            formulario.innerHTML = "";
            formulario.innerHTML += tempNuevaContrasenia;
            // Constantes cambiar la contraseña
            const inputContraNueva = document.getElementById("contraseniaNueva");
            const inputContraConf = document.getElementById("confirmarContrasenia");
            const confBoton = document.getElementById("boton-confirmar");
            const mensajeError2 = document.getElementById("ResError2");
            const mensajeExito = document.getElementById("exito");
            const redirect = document.getElementById("redirect");

            redirect.addEventListener("click", () => {
                login();
            });

            confBoton.addEventListener("click", () => {

                const contraseñasNueva = () => {
                    alertAdvertencia("La contraseña actual debe ser distinta a la anterior.");
                }

                const llenarCampos = () => {
                    alertAdvertencia("Debes llenar todos los campos.");
                }

                const contraseñasIguales = () => {
                    alertErrores("Las contraseñas deben ser idénticas.");
                }

                const contraseñaValida = () => {
                    buscar.contrasenia = inputContraNueva.value;
                    alertExito("Contraseña modificada correctamente.", login());
                }

                inputContraNueva.value == buscar.contrasenia ? contraseñasNueva() :
                    inputContraNueva.value == "" || inputContraConf.value == "" ? llenarCampos() :
                    inputContraNueva.value !== inputContraConf.value ? contraseñasIguales() :
                    inputContraNueva.value !== buscar.contrasenia && inputContraConf.value == inputContraNueva.value ? contraseñaValida() : "";
            });
        }

        const llenarCampos = () => {
            alertAdvertencia("Debes llenar todos los campos.");
        }

        const usuarioInvalido = () => {
            alertErrores("Usuario y/o Correo ya registrado.");
        }

        buscar !== undefined ? usuarioValido() :
            inputCorreo.value == "" || inputContra.value == "" ? llenarCampos() :
            buscar == undefined ? usuarioInvalido() : "";
    });
}

// Iniciar con el formulario de login al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    login();
});

//Alertas
const alertAdvertencia = (mensaje) => {
    Swal.fire({
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        icon: 'warning',
        iconColor: '#ffffff',
        title: mensaje,
        position: 'center-end',
        padding: '0.85em 0 0.85em 0.85em',
        background: '#FFBD35',
        color: '#ffffff',
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

const alertErrores = (mensaje) => {
    Swal.fire({
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        icon: 'error',
        iconColor: '#ffffff',
        title: mensaje,
        position: 'center-end',
        padding: '0.85em 0 0.85em 0.85em',
        background: '#F94C66',
        color: '#ffffff',
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}

const alertExito = (mensaje) => {
    Swal.fire({
        toast: true,
        timer: 3000,
        showConfirmButton: false,
        icon: 'success',
        iconColor: '#ffffff',
        title: mensaje,
        position: 'center-end',
        padding: '0.85em 0 0.85em 0.85em',
        background: '#34BE82',
        color: '#ffffff',
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}