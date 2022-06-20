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



//Función para volver a 
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
    <p class="section-01__forget text-center my-4 pb-2">¿Olvidaste tu Contraseña?</p>
    <a href="#" class="btn d-flex align-items-center justify-content-center section-01__btn" id="boton-login">Iniciar</a>`;

    //Login
    const usuarioInput = document.getElementById("usuario");
    const contraInput = document.getElementById("contrasenia");
    const botonIniciar = document.getElementById("boton-login");
    const mensajeError = document.getElementById("error");

    const usuarioExiste = () => {
        let buscarNombre = usuarios.find((usuario) => usuario.nombre === usuarioInput.value);
        let buscarContra = usuarios.find((usuario) => usuario.contrasenia === contraInput.value);
        if (buscarNombre !== undefined & buscarContra !== undefined) {
            botonIniciar.href = "/procesos.html";

        } else if (usuarioInput.value == "" || contraInput.value == "") {
            mensajeError.classList.remove("d-none");
            mensajeError.innerText = "";
            mensajeError.innerText = "Debes llenar todos los campos";

        } else if (buscarNombre != usuarioInput.value || buscarContra != contraInput.value) {
            mensajeError.classList.remove("d-none");
            mensajeError.innerText = "";
            mensajeError.innerText = "Usuario y/o contraseña incorrectos";
        }
    }

    botonIniciar.addEventListener("click", () => {
        usuarioExiste();
    });

    //Crear Cuenta
    const crearCuenta = document.getElementById("crear-cuenta");
    crearCuenta.addEventListener("click", () => {
        cuenta();

    });
}

const cuenta = () => {
    formulario.innerHTML = "";
    formulario.innerHTML += `
    <h2 class="section-01__titulo">Crea una cuenta</h2>
    <p class="section-01__bajada">Empieza a usar la plataforma para reclutadores favorita.</p>
    <div class="form-floating mb-4">
        <input type="text" class="form-control section-01__form" id="usuarioNuevo" placeholder="Usuario">
        <label for="usuarioNuevo" class="section-01__placeholder"><i class="bi bi-person-fill"></i>
            Usuario</label>
    </div>
    <div class="form-floating mb-4">
        <input type="text" class="form-control section-01__form" id="correoNuevo"
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

    crearBoton.addEventListener("click", () => {

        let buscarNombre = usuarios.find((usuario) => usuario.nombre === crearUsuario.value);
        let buscarCorreo = usuarios.find((usuario) => usuario.email === crearCorreo.value);

        if (buscarNombre !== undefined || buscarCorreo !== undefined) {
            mensajeError.classList.remove("d-none");
            mensajeError.innerText = "";
            mensajeError.innerText = "Usuario y/o Correo ya registrado";
            console.log(buscarNombre);
            console.log(buscarCorreo);

        } else if (crearUsuario.value == "" || crearCorreo.value == "" || crearContra.value == "") {
            mensajeError.classList.remove("d-none");
            mensajeError.innerText = "";
            mensajeError.innerText = "Debes llenar todos los campos";
            console.log(crearUsuario.value);
            console.log(crearCorreo.value);

        } else if (buscarNombre == undefined & buscarCorreo == undefined & crearContra !== "") {
            usuarios.push(new Usuario(crearUsuario.value, crearCorreo.value, crearContra.value));
            login();
        }
    });
}

// Iniciar con el formulario de login al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    login();
});
