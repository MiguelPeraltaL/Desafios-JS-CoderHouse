//Agenda Web

class Cupos{
    constructor(opcion, dniMedico, nombre, especialidad, fecha, hora, duracion, estado, dniPaciente){
        this.opcion=opcion
        this.dniMedico=dniMedico
        this.nombre=nombre
        this.especialidad=especialidad
        this.fecha=fecha
        this.hora=hora
        this.duracion=duracion
        this.estado=estado
        this.dniPaciente=dniPaciente
    }
    crearCita(dniPac){
        this.estado="Ocupado"
        this.dniPaciente=dniPac
    }
}

class Pacientes{
    constructor(dni, nombre, edad, sexo, email){
        this.dni=dni
        this.nombre=nombre
        this.edad=edad
        this.sexo=sexo
        this.email=email
    }
}

const cupo1=new Cupos(1, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:00", 20, "Disponible", null)
const cupo2=new Cupos(2, 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "10:20", 20, "Disponible", null)
const cupo3=new Cupos(3, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:40", 20, "Disponible", null)
const cupo4=new Cupos(4, 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "11:00", 20, "Disponible", null)
const cupo5=new Cupos(5, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "11:20", 20, "Disponible", null)
const cupo6=new Cupos(6, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "11:40", 20, "Disponible", null)
const cupo7=new Cupos(7, 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:00", 20, "Disponible", null)
const cupo8=new Cupos(8, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "12:20", 20, "Disponible", null)
const cupo9=new Cupos(9, 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:40", 20, "Disponible", null)
const cupo10=new Cupos(10, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "13:00", 20, "Disponible", null)

let agenda=[cupo1, cupo2, cupo3, cupo4, cupo5, cupo6, cupo7, cupo8, cupo9, cupo10]

//Para este caso se utilizará LocalStorage como reemplazo de una base de datos
let arrayPacienteStorage = JSON.parse(localStorage.getItem('pacienteStorage')) ?? []
let arrayAgendaStorage = JSON.parse(localStorage.getItem('agendaStorage')) ?? [...agenda]

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
        let datosPaciente = document.getElementById('datosPaciente')
        alert("DNI inválido")
        location.reload()
    }else{
        (arrayPacienteStorage.find(persona => persona.dni == dni)) ? verDatosPaciente(dni) : formNuevoPaciente(dni)
    }
})

function formNuevoPaciente(dni){
    let datosPaciente = document.getElementById('datosPaciente')
    datosPaciente.innerHTML = `
        <label>Ingresa tu nombre:</label>
        <input type="text" id="textNombre">
        <label>Ingresa tu edad:</label>
        <input type="text" id="textEdad">
        <label>Ingresa tu sexo:</label>
        <input type="text" id="textSexo">
        <label>Ingresa tu e-mail:</label>
        <input type="text" id="textEmail">
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
let arreglo
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
                <div id="cupo${indice}" class="agendaClass">
                    <p>Nombre: ${item.nombre}</p>
                    <p>Especialidad: ${item.especialidad}</p>
                    <p>Fecha: ${item.fecha}</p>
                    <p>Hora: ${item.hora}</p>
                    <button id="boton${indice}">Reservar</button>
                </div>
            `
        }
    })
    divAgenda.innerHTML += `<button id="btnNvaReserva">Nueva Reserva</button>`

    let btnNvaReserva = document.getElementById('btnNvaReserva')
    btnNvaReserva.addEventListener('click', (event) => {
        location.reload()
    })
    arrayAgendaStorage.forEach((item, indice) => {
        if(item.especialidad == especialidad && item.estado == "Disponible"){
            document.querySelector(`#boton${indice}`).addEventListener('click', () => {
                //arrayAgendaStorage[indice].crearCita(dni)
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
                <div id="cita${item.opcion}" class="citaClass">
                    <p>Profesional: ${item.nombre}</p>
                    <p>Especialidad: ${item.especialidad}</p>
                    <p>Fecha: ${item.fecha}</p>
                    <p>Hora: ${item.hora}</p>
                    <p>Estado: ${item.estado}</p>
                    <p>DNI Paciente: ${item.dniPaciente}</p>
                </div>
            `
        }
    })
    divDetalleCita.innerHTML += `<button id="btnNvaReserva">Nueva Reserva</button>`

    let btnNvaReserva = document.getElementById('btnNvaReserva')
    btnNvaReserva.addEventListener('click', (event) => {
        location.reload()
    })
}