const sectionCarrito = document.getElementById("section-carrito");

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const precioTotal = document.getElementById('precioTotal')

const sectionProductos = document.getElementById('section-productos')

const botonComprar = document.getElementById('comprar-carrito2')

const cantidad = document.getElementById('cantidad')

const cantidadTotal = document.getElementById('cantidadTotal')


// Creación de la sección carrito con DOM
let carritoCompras = document.createElement("div");
carritoCompras.innerHTML = '<img src="../img/carritoCompras.png" />';
sectionCarrito.appendChild(carritoCompras);

let prodTotal = document.createElement("div")
prodTotal.innerHTML = "";
sectionCarrito.appendChild(prodTotal);

let productosCarrito = document.createElement("div");
productosCarrito.innerHTML = "<h6>Productos: </h6>";
prodTotal.appendChild(productosCarrito);
productosCarrito.setAttribute("class", "d-flex m-1 mb-0");

let cantProductos = document.createElement("h6");
cantProductos.innerText = "0";
cantProductos.setAttribute("id", "contadorCarrito");
productosCarrito.appendChild(cantProductos);

let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h5>Total:$</h5>";
prodTotal.appendChild(totalCompra);
totalCompra.setAttribute("class", "d-flex");

let montoTotalCompra = document.createElement("h5");
montoTotalCompra.setAttribute("id", "precioTotalBoton");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotalBoton = document.getElementById('precioTotalBoton')


// Array carrito
let carrito = []


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonVaciar.addEventListener('click', () => {

    if (carrito.length >= 1) {
        Swal.fire({
            title: '¿Vas a eliminar todos los productos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF0000',  /*  ROJO    */
            cancelButtonColor: '#008000',   /*  VERDE   */
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminados!',
                    'Carrito vacío.',
                    'success'
                )
                carrito.length = 0
                actualizarCarrito()
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
        })
    }
})


const cargaproductos = async () => {
    const resp = await
        fetch("/js/productos.json")
    dataproductos = await resp.json()

    dataproductos.forEach((producto) => {
        const div = document.createElement("div");
        div.setAttribute("class", "card-producto");
        div.innerHTML = `<div class="col d-flex justify-content-center">
                                <div class="card w-80">
                                  <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                                  <div class="card-body p-1">
                                    <h6 class="card-title">${producto.nombre} - $${producto.precio}</h6>
                                    <a id="btn${producto.id}" class="btn btn-light rounded">Agregar al carrito</a>
                                  </div>
                              </div>`;
        sectionProductos.appendChild(div);

        const boton = document.getElementById(`btn${producto.id}`)

        boton.addEventListener('click', () => {

            agregarAlCarrito(producto.id)

        })
    })
}


cargaproductos()


const agregarAlCarrito = (prodId) => {

    Toastify({

        text: "Producto añadido",
        duration: 4000,
        gravity: "bottom",
        postion: "right",
        backgroundColor: "#70e000"

    }).showToast();


    const existe = carrito.some(prod => prod.id === prodId) // comprobar si el elemento ya existe en el carro

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {
        const item = dataproductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}


const eliminarDelCarrito = (prodId) => {

    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)

    Swal.fire({
        icon: 'error',
        title: 'Producto eliminado',
    })

    actualizarCarrito()
}


const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')

        div.innerHTML = `
        <p>${prod.nombre}</p>
        <img class="cardimg2"  src=${prod.img} alt= "">
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

    })
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    precioTotalBoton.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    guardarCarritoStorage(carrito);
}


botonComprar.addEventListener('click', () => {
    if (carrito.length >= 1) {
        Swal.fire({
            title: 'Gracias por tu compra!',
            imageUrl: '/img/logo.png',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            icon: 'success',
        })
        carrito.length = 0
        actualizarCarrito()
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
        })
    }
})


// Storage carrito
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})