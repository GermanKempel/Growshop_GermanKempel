// Genero mi clase con los atributos de los productos.
class Producto {
    constructor(nombre, precio, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}


//  Declaro mi array
let lista_compra = [];

//  Genero mi array de productos vacío
const productos = [];
productos.push(new Producto("- Semillas Afghan Pearl ($15)", 15, 1));
productos.push(new Producto("- Joystick PS4 ($25)", 25, 2));
productos.push(new Producto("- Bong ($10)", 10, 3));
productos.push(new Producto("- Pipa ($5)", 5, 4));
productos.push(new Producto("- Lampara Led FS 50W ($50)", 50, 5));
productos.push(new Producto("- Remera KFC ($12)", 12, 6));

//  Función flecha para mostrar la lista
const mostrarLista = () => {
    let texto = "";
    productos.forEach((item) => {
        texto += `${item.id} ${item.nombre}\n`;
    });

    //  Capturo las entradas mediante "prompt"
    let seleccion = parseInt(prompt(`Selecciona el producto deseado.\n${texto}`));
    return seleccion;
};

//  Función flecha para hacer la búsqueda del producto y agregarlo a mi lista de compra.
const productoElegido = (id) => {
    console.log(id);
    let productoFind = productos.find((item) => item.id === id);
    lista_compra.push(productoFind);
    let continuar = confirm("¿Desea agregar otro producto? \n(Aceptar = Si) (Cancelar = No)");
    if (continuar === true) {
        iniciaVenta();1
    }
};

//  Funcion flecha con la que inicio la venta.
const iniciaVenta = () => {
    productoId = mostrarLista();
    productoElegido(productoId);
};

//  Mando a llamar mi función para iniciar la venta.
iniciaVenta();

//  Hago la suma con el metodo "reduce", de los precios de los productos en mi lista de compras.
let total = lista_compra.reduce((acc, item) => acc + item.precio, 0);
//  Utilizo length para contar los productos en mi array (Se puede hacer de otro modo pero fue para ocupar length)
let numeroproductos = lista_compra.length;

//  Efectuo las salidas mediante "alert"
alert("Resúmen de compra:\n\n" + "Total de productos: " + numeroproductos + "\n Total a pagar: " + total);
alert("Gracias por su compra!");