//REEMPLAZAR CARACTER Ñ POR N
function reemplazar(){
    for (let i = 0; i< palabra.length; i++) {
        let caracter = palabra.charAt(i)
        if(i==0){
            if(caracter == "ñ") {
                marca=1
                nuevaPalabra="n"
                
             }else{
                nuevaPalabra=caracter
             }
        }else{
            if(caracter == "ñ") {
                marca=1
                nuevaPalabra=nuevaPalabra+"n"
                
             }else{
                nuevaPalabra=nuevaPalabra+caracter
             }
        }
   }
}

let palabra
let nuevaPalabra
let marca=0
do {
    palabra=prompt("Ingrese una palabra o frase con ñ").toLowerCase()
    reemplazar()
    if(marca==0){
        alert("Su palabra o frase no contiene Ñ")
    }else{
        alert("La nueva palabra o frase es: " + nuevaPalabra)
    }
} while (marca==0)

