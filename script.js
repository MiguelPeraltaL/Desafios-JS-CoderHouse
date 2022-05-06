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

const cupo1=new Cupos("Opcion 1", 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:00", 20, "Disponible", null)
const cupo2=new Cupos("Opcion 2", 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "10:20", 20, "Disponible", null)
const cupo3=new Cupos("Opcion 3", 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "10:40", 20, "Disponible", null)
const cupo4=new Cupos("Opcion 4", 19283746, "Dr. Pato Lucas", "Medicina General", "03/05/2022", "11:00", 20, "Disponible", null)
const cupo5=new Cupos("Opcion 5", 12345678, "Dr. Juan Perez", "Medicina General", "03/05/2022", "11:20", 20, "Disponible", null)
const cupo6=new Cupos("Opcion 1", 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "11:40", 20, "Disponible", null)
const cupo7=new Cupos("Opcion 2", 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:00", 20, "Disponible", null)
const cupo8=new Cupos("Opcion 3", 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "12:20", 20, "Disponible", null)
const cupo9=new Cupos("Opcion 4", 91827364, "Dr. Bugs Bunny", "Pediatría", "03/05/2022", "12:40", 20, "Disponible", null)
const cupo10=new Cupos("Opcion 5", 87654321, "Dr. Pepe Grillo", "Pediatría", "03/05/2022", "13:00", 20, "Disponible", null)

let agenda=[cupo1, cupo2, cupo3, cupo4, cupo5, cupo6, cupo7, cupo8, cupo9, cupo10]

let opcion

function elegirOpcion(){
    do {
        opcion=parseInt(prompt("Elije una opción:"))
        if(isNaN(opcion)){
            alert("Ingrese un número válido")
        }
    } while (isNaN(opcion));
}

function dispoMedGen(){
    console.log("Los cupos de Medicina General son:")
    let arreglo=(agenda.filter(doctores => doctores.especialidad == "Medicina General" && doctores.estado == "Disponible"))
    arreglo.forEach(item => {
        console.log(`${item.opcion} - ${item.nombre} - ${item.especialidad} - ${item.fecha} - ${item.hora}`)
    })
}

function dispoPediatria(){
    console.log("Los cupos de Pediatría son:")
    agenda.forEach(item => {
        if(item.especialidad == "Pediatría" && item.estado == "Disponible"){
            console.log(`${item.opcion} - ${item.nombre} - ${item.especialidad} - ${item.fecha} - ${item.hora}`)
        }
    })
}

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
let x = 0
if(paciente.edad >= 14){
    dispoMedGen()
    elegirOpcion()
    switch (opcion) {
        case 1:
            if(cupo1.estado=="Disponible"){
                cupo1.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 2:
            if(cupo2.estado=="Disponible"){
                cupo2.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 3:
            if(cupo3.estado=="Disponible"){
                cupo3.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 4:
            if(cupo4.estado=="Disponible"){
                cupo4.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 5:
            if(cupo5.estado=="Disponible"){
                cupo5.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        default:
            alert("Opción no válida")
            x = 1
            break
    }
}else if(paciente.edad < 14){
    dispoPediatria()
    elegirOpcion()
    switch (opcion) {
        case 1:
            if(cupo6.estado=="Disponible"){
                cupo6.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 2:
            if(cupo7.estado=="Disponible"){
                cupo7.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 3:
            if(cupo8.estado=="Disponible"){
                cupo8.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 4:
            if(cupo9.estado=="Disponible"){
                cupo9.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        case 5:
            if(cupo10.estado=="Disponible"){
                cupo10.crearCita(paciente.dni)
                break
            }else{
                alert("Opción no válida")
                x = 1
                break
            }
        default:
            alert("Opción no válida")
            x = 1
            break
    }
}

if (x == 0){
    agenda.forEach(item => {
        if(item.dniPaciente == paciente.dni){
            console.log(`Hola ${paciente.nombre}`)
            console.log(`Detalle de tu agendamiento: ${item.nombre} - Especialidad ${item.especialidad} - Fecha ${item.fecha} - Hora ${item.hora} - Estado ${item.estado} - DNI Pac ${item.dniPaciente}`)
        }
    })
}