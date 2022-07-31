//Contenedor de las cards
const cardTemplate = document.getElementById("card-procesos");
// Campos modal
const formularioP = document.getElementById("formulario");
const cargoP = document.getElementById("cargoP");
const clienteP = document.getElementById("clienteP");
const requisitoP = document.getElementById("requisitoP");
const contadorProcesos = document.getElementById("todos-procesos");
const contadorActivos = document.getElementById("procesos-activos");
const contadorCerrados = document.getElementById("procesos-cerrados");
const tabActivo = document.getElementById("card-procesos-activos");
const tabCerrado = document.getElementById("card-procesos-cerrados");
const btnBuscar = document.getElementById("buscarBtn");
const buscarCargo = document.getElementById("cargoSearch");



const usuarioLogeado = () => {
    const usuarioLogeado = JSON.parse(sessionStorage.getItem("usuarioLogeado"));
    const trueCondition = () => {
        document.getElementById("perfil").innerHTML = `<span>Usuario:</span> ${usuarioLogeado.usuario} <span class="d-none" id="userId">${usuarioLogeado.id}</span>`;
    }
    user = JSON.parse(sessionStorage.getItem("usuarioLogeado")) &&
        sessionStorage.getItem("usuarioLogeado") && trueCondition();
}

usuarioLogeado();

const idPerfil = document.getElementById("userId").innerText;

//Clase Constructora Proceso
class Proceso {
    constructor(cargo, cliente, requisito, activo, perfil) {
        this.cargo = cargo.toUpperCase();
        this.cliente = capitalizarCliente(cliente);
        this.requisito = requisito.toUpperCase();
        this.activo = activo;
        this.idPerfil = perfil;
    }
}

//Array de procesos
const procesos = [];

//Función para Capitalizar el nombre del cliente
const capitalizarCliente = (cliente) => {
    return cliente.charAt(0).toUpperCase() + cliente.slice(1);
}

//Función con procesos pre-agregados
const procesosPorDefecto = () => {
    //Perfil Admin
    procesos.push(new Proceso("Desarrollador Full Stack", "Cencosud", "React JS - Python - MySQL", "Activo", 1));
    procesos.push(new Proceso("Desarrollador Front-End", "Globant", "HTML5 - CSS3 - JS - Bootstrap 5", "Cerrado", 1));
    procesos.push(new Proceso("Desarrollador Back-End", "Walmart", "Ruby", "Activo", 1));
    procesos.push(new Proceso("Desarrollador UX/UI", "Entel", "Figma", "Activo", 1));
    //Perfil Coder
    procesos.push(new Proceso("Diseñador UX/UI", "Latam", "Figma", "Activo", 2));
    procesos.push(new Proceso("Desarrollador DevOps", "Falabella", "Python", "Cerrado", 2));
    procesos.push(new Proceso("Desarrollador Back-End", "Globant", "Ruby", "Activo", 2));
}

procesosPorDefecto();


const templateProcess = () => {
    cardTemplate.innerHTML = "";
    let listado = procesos.filter((proceso) => proceso.idPerfil == idPerfil);
    listado.forEach((proceso) => {

        cardTemplate.innerHTML += `
            <div
            class="card-procesos d-md-flex p-4 justify-content-between align-items-center my-2">
            <div class="card-procesos__desc me-4">
                <h5 class="card-procesos__title mb-1">${proceso.cargo}</h5>
                <p class="card-procesos__client my-1">${proceso.cliente}</p>
                <p class="card-procesos__requirement mb-2 mb-md-0">${proceso.requisito}
                </p>
            </div>
            <div class="d-flex flex-column flex-md-row">
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--aqua m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Candidatos</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--green m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Posibles</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--blue m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Entrevista</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--yellow m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Oferta</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--red m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Contratado</p>
                </div>
            </div>
        </div>`
    });

    contadorProcesos.innerHTML = "";
    contadorProcesos.innerHTML = listado.length;
}

//Cargar procesos existentes en la web
templateProcess();

const agregarProceso = () => {

    const mensajeError = document.getElementById("add-error");

    const trueCondition = () => {
        mensajeError.classList.remove("d-none");
        mensajeError.innerText = "";
        mensajeError.innerText = "Debes llenar todos los campos.";
    }

    const falseCondition = () => {
        procesos.push(new Proceso(cargoP.value, clienteP.value, requisitoP.value, "Activo", idPerfil));
        templateProcess();
        filtroActivo();
        alertaExito();
    }

    cargoP.value == "" || clienteP.value == "" || requisitoP.value == "" ? trueCondition() : falseCondition();
}

const guardarProceso = () => {
    const datosProcesos = {
        cargo: cargoP.value,
        cliente: clienteP.value,
        requisito: requisitoP.value
    }

    localStorage.setItem("datosProceso", JSON.stringify(datosProcesos));
}

// Se despliega en el formulario los datos del último Proceso guardado al realizar refresh o ingresar nuevamente a la pestaña.
const obtenerProcesoGuardado = () => {
    const datosProcesos = JSON.parse(localStorage.getItem("datosProceso"));

    const trueCondition = () => {
        cargoP.value = datosProcesos.cargo;
        clienteP.value = datosProcesos.cliente;
        requisitoP.value = datosProcesos.requisito;
    }

    localStorage.getItem("datosProceso") && trueCondition();
}

obtenerProcesoGuardado();

//Envio de formulario
formularioP.addEventListener("submit", (e) => {
    e.preventDefault();
    agregarProceso();
    //Guarda el proceso agregado en el LocalStorage
    guardarProceso();
    //Limpia los campos del formulario
    formularioP.reset()
});


const filtroActivo = () => {
    tabActivo.innerHTML = "";
    let resultado = procesos.filter((proceso) => proceso.activo == "Activo" && proceso.idPerfil == idPerfil);

    resultado.forEach((proceso) => {
        tabActivo.innerHTML += `
            <div
            class="card-procesos d-md-flex p-4 justify-content-between align-items-center my-2">
            <div class="card-procesos__desc me-4">
                <h5 class="card-procesos__title mb-1">${proceso.cargo}</h5>
                <p class="card-procesos__client my-1">${proceso.cliente}</p>
                <p class="card-procesos__requirement mb-2 mb-md-0">${proceso.requisito}
                </p>
            </div>
            <div class="d-flex flex-column flex-md-row">
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--aqua m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Candidatos</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--green m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Posibles</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--blue m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Entrevista</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--yellow m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Oferta</p>
                </div>
                <div class="card-procesos__states p-4 px-xl-5 text-center">
                    <p class="card-procesos__number card-procesos__number--red m-0">-
                    </p>
                    <p class="card-procesos__statesp m-0">Contratado</p>
                </div>
            </div>
        </div>`

    });

    contadorActivos.innerHTML = "";
    contadorActivos.innerHTML = resultado.length;
}

filtroActivo();

const filtroCerrado = () => {
    tabCerrado.innerHTML = "";
    let resultado = procesos.filter((proceso) => proceso.activo == "Cerrado" && proceso.idPerfil == idPerfil);
    resultado.forEach((proceso) => {
        tabCerrado.innerHTML += `
        <div
        class="card-procesos d-md-flex p-4 justify-content-between align-items-center my-2">
        <div class="card-procesos__desc me-4">
            <h5 class="card-procesos__title mb-1">${proceso.cargo}</h5>
            <p class="card-procesos__client my-1">${proceso.cliente}</p>
            <p class="card-procesos__requirement mb-2 mb-md-0">${proceso.requisito}
            </p>
        </div>
        <div class="d-flex flex-column flex-md-row">
            <div class="card-procesos__states p-4 px-xl-5 text-center">
                <p class="card-procesos__number card-procesos__number--aqua m-0">-
                </p>
                <p class="card-procesos__statesp m-0">Candidatos</p>
            </div>
            <div class="card-procesos__states p-4 px-xl-5 text-center">
                <p class="card-procesos__number card-procesos__number--green m-0">-
                </p>
                <p class="card-procesos__statesp m-0">Posibles</p>
            </div>
            <div class="card-procesos__states p-4 px-xl-5 text-center">
                <p class="card-procesos__number card-procesos__number--blue m-0">-
                </p>
                <p class="card-procesos__statesp m-0">Entrevista</p>
            </div>
            <div class="card-procesos__states p-4 px-xl-5 text-center">
                <p class="card-procesos__number card-procesos__number--yellow m-0">-
                </p>
                <p class="card-procesos__statesp m-0">Oferta</p>
            </div>
            <div class="card-procesos__states p-4 px-xl-5 text-center">
                <p class="card-procesos__number card-procesos__number--red m-0">-
                </p>
                <p class="card-procesos__statesp m-0">Contratado</p>
            </div>
        </div>
    </div>`;
    });
    contadorCerrados.innerHTML = "";
    contadorCerrados.innerHTML = resultado.length;
}

filtroCerrado();
/* 
const buscarFiltro = () => {
    //Envio de formulario
    let inputBuscar = buscarCargo.value.toUpperCase();
    procesos.forEach((proceso) => {
        let cargos = proceso.cargo;
        if (cargos.indexOf(inputBuscar) !== -1) {
            cardTemplate.innerHTML = "";
            cardTemplate.innerHTML += `
                <div
                class="card-procesos d-md-flex p-4 justify-content-between align-items-center my-2">
                <div class="card-procesos__desc me-4">
                    <h5 class="card-procesos__title mb-1">${proceso.cargo}</h5>
                    <p class="card-procesos__client my-1">${proceso.cliente}</p>
                    <p class="card-procesos__requirement mb-2 mb-md-0">${proceso.requisito}
                    </p>
                </div>
                <div class="d-flex flex-column flex-md-row">
                    <div class="card-procesos__states p-4 px-xl-5 text-center">
                        <p class="card-procesos__number card-procesos__number--aqua m-0">-
                        </p>
                        <p class="card-procesos__statesp m-0">Candidatos</p>
                    </div>
                    <div class="card-procesos__states p-4 px-xl-5 text-center">
                        <p class="card-procesos__number card-procesos__number--green m-0">-
                        </p>
                        <p class="card-procesos__statesp m-0">Posibles</p>
                    </div>
                    <div class="card-procesos__states p-4 px-xl-5 text-center">
                        <p class="card-procesos__number card-procesos__number--blue m-0">-
                        </p>
                        <p class="card-procesos__statesp m-0">Entrevista</p>
                    </div>
                    <div class="card-procesos__states p-4 px-xl-5 text-center">
                        <p class="card-procesos__number card-procesos__number--yellow m-0">-
                        </p>
                        <p class="card-procesos__statesp m-0">Oferta</p>
                    </div>
                    <div class="card-procesos__states p-4 px-xl-5 text-center">
                        <p class="card-procesos__number card-procesos__number--red m-0">-
                        </p>
                        <p class="card-procesos__statesp m-0">Contratado</p>
                    </div>
                </div>
            </div>`;
            contadorProcesos.innerHTML = "";
            contadorProcesos.innerHTML = procesos.length;
        } else {
            templateProcess();
                
        }
    });

}

btnBuscar.addEventListener("click", () => {
    templateProcess();
    buscarFiltro();
}); */

//Alerta 
const alertaExito = () => {
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Proceso agregado correctamente.',
        confirmButtonColor: '#34BE82',
        timer: 1500
    })
}