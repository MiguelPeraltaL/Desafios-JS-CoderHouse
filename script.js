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
    }
}

const cupo1=new Cupos(1, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:00", 20, "Disponible", null)
const cupo2=new Cupos(2, 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "10:20", 20, "Disponible", null)
const cupo3=new Cupos(3, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:40", 20, "Disponible", null)
const cupo4=new Cupos(4, 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "11:00", 20, "Disponible", null)
const cupo5=new Cupos(5, 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "11:20", 20, "Disponible", null)
const cupo6=new Cupos(1, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "11:40", 20, "Disponible", null)
const cupo7=new Cupos(2, 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:00", 20, "Disponible", null)
const cupo8=new Cupos(3, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "12:20", 20, "Disponible", null)
const cupo9=new Cupos(4, 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:40", 20, "Disponible", null)
const cupo10=new Cupos(5, 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "13:00", 20, "Disponible", null)

let agenda=[cupo1, cupo2, cupo3, cupo4, cupo5, cupo6, cupo7, cupo8, cupo9, cupo10]

let dni
let nombre
let edad
let continua = true
while(continua){
    continua = false
    dni = parseInt(prompt("Ingresa tu DNI"))
    nombre = prompt("Ingresa tu nombre")
    edad = parseInt(prompt("Ingresa tu edad"))
    if(isNaN(dni)){
        alert("Ingresa un DNI válido")
        continua = true
    }
    if(nombre == ""){
        alert("Ingresa tu nombre")
        continua = true
    }
    if(isNaN(edad)){
        alert("Ingresa tu edad")
        continua = true
    }
}
const paciente=new Pacientes(dni, nombre, edad)

let especialidad
let arreglo
function dispo(edadPac){
    if(edadPac>=14){
        especialidad = "Medicina General"
    }else{
        especialidad = "Pediatría"
    }
    let divAgenda = document.getElementById('divAgenda')
    divAgenda.innerHTML += `<p>Los cupos disponibles son:</p>`
    arreglo=(agenda.filter(doctores => doctores.especialidad == especialidad && doctores.estado == "Disponible"))
    arreglo.forEach(item => {
        divAgenda.innerHTML += `
            <div id="cupo${item.opcion}" class="agendaClass">
                <p>Opción: ${item.opcion}</p>
                <p>Nombre: ${item.nombre}</p>
                <p>Especialidad: ${item.especialidad}</p>
                <p>Fecha: ${item.fecha}</p>
                <p>Hora: ${item.hora}</p>
            </div>
        `
    })
    let divBoton = document.getElementById('divBoton')
    divBoton.innerHTML = `<button id="btnOpcion">Elegir Opciones</button>`
    divBoton.onclick = () => {elegirOpcion()}
}

dispo(paciente.edad)

let opcion
function elegirOpcion(){
    do {
        opcion=parseInt(prompt("Elije una opción:"))
        if(isNaN(opcion)){
            alert("Ingrese un número válido")
        }
    } while (isNaN(opcion));
    crear()
}

let x = 1
function crear(){
    agenda.forEach(item => {
        if(item.opcion == opcion && item.estado == "Disponible" && item.especialidad == especialidad){
            item.crearCita(paciente.dni)
            x = 0
        }
    })
    if (x == 0){
        mostrarDetalle()
    }
}

function mostrarDetalle(){
    let divDetalleCita = document.getElementById('divDetalleCita')
    divDetalleCita.innerHTML += `<p>Hola ${paciente.nombre}, los detalles de tu cita son:</p>`
    agenda.forEach(item => {
        if(item.dniPaciente == paciente.dni){
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
}