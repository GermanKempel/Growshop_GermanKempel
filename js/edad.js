/*
let edad = prompt("Bienvenido! Ingrese su edad por favor")
if (edad >= 18){
    alert("Disfrute de su visita!")
} else {
    alert("Recuerde que para poder comprar debe ser mayor de edad")
}
console.log("Edad: " + edad)
*/

function verificaEdad(edad) {
    if (edad >= 18) {
      return true;
    }
      return false;
  }

let edad = prompt("Bienvenido! Ingrese su edad por favor")

if (verificaEdad(edad)){
    alert("Disfrute de su visita!")
} else {
    alert("Recuerde que para poder comprar debe ser mayor de edad")
}
console.log("Edad: " + edad)
