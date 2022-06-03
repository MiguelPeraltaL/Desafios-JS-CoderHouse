//Agenda Web

class Pacientes{
    constructor(dni, nombre, edad, sexo, email){
        this.dni=dni
        this.nombre=nombre
        this.edad=edad
        this.sexo=sexo
        this.email=email
    }
}

//Para este caso se utilizará LocalStorage como reemplazo de una base de datos
let arrayPacienteStorage = JSON.parse(localStorage.getItem('pacienteStorage')) ?? []
//let arrayAgendaStorage = localStorage.getItem('agendaStorage') ?? [...agenda]
let arrayAgendaStorage = JSON.parse(localStorage.getItem('agendaStorage'))

if(arrayAgendaStorage == null){
    fetch('cupos.json')
    .then(response => response.json())
    .then(object => {
        object.forEach(obj => {
            arrayAgendaStorage.push(obj) 
        });
    })
}

let dni
let nombre
let edad
let sexo
let email
let btnBuscarPaciente = document.getElementById('btnBuscarPaciente')
btnBuscarPaciente.addEventListener('click', (event) => {
    event.preventDefault()
    dni=parseInt(document.getElementById("textDni").value)
    if(isNaN(dni)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'DNI inválido!',
        })
    }else{
        (arrayPacienteStorage.find(persona => persona.dni == dni)) ? verDatosPaciente(dni) : formNuevoPaciente(dni)
    }
})

function formNuevoPaciente(dni){
    let datosPaciente = document.getElementById('datosPaciente')
    datosPaciente.innerHTML = `
        <label>Ingresa tu nombre:</label>
        <input type="text" id="textNombre"><br>
        <label>Ingresa tu edad:</label>
        <input type="text" id="textEdad"><br>
        <label>Ingresa tu sexo:</label>
        <input type="text" id="textSexo"><br>
        <label>Ingresa tu e-mail:</label>
        <input type="text" id="textEmail"><br>
        <button id="btnCrearPaciente">Crear Paciente</button>
    `
    let btnCrearPaciente = document.getElementById('btnCrearPaciente')
    btnCrearPaciente.addEventListener('click', (event) => {
        event.preventDefault()
        crearPaciente(dni)
    })
}

let paciente
function crearPaciente(dni){
    nombre=document.getElementById("textNombre").value
    edad=parseInt(document.getElementById("textEdad").value)
    sexo=document.getElementById("textSexo").value
    email=document.getElementById("textEmail").value
    //agregar validador de datos
    paciente=new Pacientes(dni, nombre, edad, sexo, email)
    arrayPacienteStorage.push(paciente)
    localStorage.setItem('pacienteStorage', JSON.stringify(arrayPacienteStorage))
    dispo(edad)
}

let especialidad
function dispo(edadPac){
    if(edadPac>=14){
        especialidad = "Medicina General"
    }else{
        especialidad = "Pediatría"
    }
    let datosPaciente = document.getElementById('datosPaciente')
    datosPaciente.innerHTML = ``
    let divAgenda = document.querySelector('#divAgenda')
    divAgenda.innerHTML += `<p>Los cupos disponibles son:</p>`
    arrayAgendaStorage.forEach((item, indice) => {
        if(item.especialidad == especialidad && item.estado == "Disponible"){
            divAgenda.innerHTML += `
            <div id="cupo${indice}" class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-body">
                    <p>Nombre: ${item.nombre}</p>
                    <p>Especialidad: ${item.especialidad}</p>
                    <p>Fecha: ${item.fecha}</p>
                    <p>Hora: ${item.hora}</p>
                    <button id="boton${indice}">Reservar</button>
                </div>
            </div>
            `
        }
    })

    let boton = document.getElementById('boton')
    boton.innerHTML = `<button id="btnNvaReserva">Nueva Reserva</button>`

    let btnNvaReserva = document.getElementById('btnNvaReserva')
    btnNvaReserva.addEventListener('click', (event) => {
        location.reload()
    })
    arrayAgendaStorage.forEach((item, indice) => {
        if(item.especialidad == especialidad && item.estado == "Disponible"){
            document.querySelector(`#boton${indice}`).addEventListener('click', () => {
                arrayAgendaStorage[indice].estado="Ocupado"
                arrayAgendaStorage[indice].dniPaciente=dni
                localStorage.setItem('agendaStorage', JSON.stringify(arrayAgendaStorage))
                mostrarDetalle()
            })
        }
    })
}

function verDatosPaciente(dni){
    let divAgenda = document.getElementById('divAgenda')
    arrayPacienteStorage.forEach(item => {
        if(item.dni == dni){
            divAgenda.innerHTML = `<p>Hola ${item.nombre}, bienvenido</p>`
            edad=item.edad
            nombre=item.nombre
        }
    })
    dispo(edad)
} 

function mostrarDetalle(){
    let datosPaciente = document.getElementById('datosPaciente')
    datosPaciente.innerHTML = ``
    let divDetalleCita = document.getElementById('divAgenda')
    divDetalleCita.innerHTML = `<p>${nombre}, los detalles de tu(s) cita(s) son:</p>`
    arrayAgendaStorage.forEach(item => {
        if(item.dniPaciente == dni){
            divDetalleCita.innerHTML += `
            <div id="cita${item.opcion}" class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-body">
                    <p>Profesional: ${item.nombre}</p>
                    <p>Especialidad: ${item.especialidad}</p>
                    <p>Fecha: ${item.fecha}</p>
                    <p>Hora: ${item.hora}</p>
                    <p>Estado: ${item.estado}</p>
                    <p>DNI Paciente: ${item.dniPaciente}</p>
                </div>
            </div>
            `
        }
    })
    let boton = document.getElementById('boton')
    boton.innerHTML = `<button id="btnNvaReserva">Nueva Reserva</button>`

    let btnNvaReserva = document.getElementById('btnNvaReserva')
    btnNvaReserva.addEventListener('click', (event) => {
        location.reload()
    })
}