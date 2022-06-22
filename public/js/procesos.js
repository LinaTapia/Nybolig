//Contenedor de las cards
const cardTemplate = document.getElementById("card-procesos");
// Campos modal
const formularioP = document.getElementById("formulario");
const cargoP = document.getElementById("cargoP");
const clienteP = document.getElementById("clienteP");
const requisitoP = document.getElementById("requisitoP");
const contadorProcesos = document.getElementById("todos-procesos");

//Clase Constructora Proceso
class Proceso {
    constructor(cargo, cliente, requisito, activo) {
        this.cargo = cargo.toUpperCase();
        this.cliente = capitalizarCliente(cliente);
        this.requisito = requisito.toUpperCase();
        this.activo = activo;
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
    procesos.push(new Proceso("Desarrollador Full Stack", "Cencosud", "React JS - Python - MySQL", "Activo"));
    procesos.push(new Proceso("Desarrollador Front-End", "Globant", "HTML5 - CSS3 - JS - Bootstrap 5", "Cerrado"));
    procesos.push(new Proceso("Desarrollador Back-End", "Walmart", "Ruby", "Activo"));
}

procesosPorDefecto();

const templateProcess = () => {
    cardTemplate.innerHTML = "";
    procesos.forEach((proceso) => {
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
    });
}

//Cargar procesos existentes en la web
templateProcess();

const agregarProceso = (e) => {
    e.preventDefault()
    procesos.push(new Proceso(cargoP.value, clienteP.value, requisitoP.value));
    templateProcess();
    contarProcesos();
}

const contarProcesos = () => {
    contadorProcesos.innerHTML = "";
    contadorProcesos.innerHTML = procesos.length;
}

contarProcesos();

//Envio de formulario
formularioP.addEventListener("submit", agregarProceso);


