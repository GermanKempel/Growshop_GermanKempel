let usuario = prompt("Ingrese su nombre de usuario");
console.log ("Usuario: " + usuario)

let contraseña = prompt("Ingrese su contraseña");
while(contraseña != "12345678")
do{
    contraseña = prompt("Ingrese una contraseña valida")
}while(contraseña != "12345678")
console.log("Contraseña exitosa")

function mensajeBienvenida() {
    let mensaje = 'Bienvenido, ' + usuario;
    alert(mensaje);
  }
  
mensajeBienvenida(); 