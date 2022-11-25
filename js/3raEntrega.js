//inicializo la variable carrito con una funcion para que detecte si existen valores en el storage
let carrito = cargarCarrito();

//tomo control sobre las secciones del HTML
let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

//creacion de la seccion carrito con DOM
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
productosCarrito.appendChild(cantProductos);

let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h5>Total:$</h5>";
prodTotal.appendChild(totalCompra);
totalCompra.setAttribute("class", "d-flex");

let montoTotalCompra = document.createElement("h5");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let botonComprar = document.createElement("button");
botonComprar.innerText = "Comprar";
sectionCarrito.appendChild(botonComprar);
botonComprar.setAttribute("class", "btn btn-outline-light");

//Le agrego un evento al boton para que muestre el precio final
botonComprar.onclick = () => {
  const precioFinal = montoTotalCompra.innerText;
  //uso sweet alert para que el usuario confirme su compra, cuando toca si se vacia el carrito
  Swal.fire({
    title: '¿Deseas finalizar tu compra?',
    text: `Total a pagar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra confirmada',
        '¡Gracias por su visita!',
        'success'
      )
      vaciarCarrito();
    }
  })
}


//renderizado de los productos en cards
for (const producto of productos) {
  let container = document.createElement("div");
  container.setAttribute("class", "card-producto");
  container.innerHTML = `<div class="col d-flex justify-content-center">
                            <div class="card w-80">
                              <img src="${producto.foto}" class="card-img-top" alt="${producto.nombre}">
                              <div class="card-body p-1">
                                <h6 class="card-title">${producto.nombre} - $${producto.precio}</h6>
                                <a id="btn${producto.id}" class="btn btn-light rounded">Agregar al carrito</a>
                              </div>
                          </div>`;
  sectionProductos.appendChild(container);
  //Evento para que los productos se agreguen al carrito al hacer click en el boton
  document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}



//Funciones
function agregarAlCarrito(id) {
  carrito.push(productos.find(p => p.id == id));
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotalCarrito();
}

function calcularTotalCarrito() {
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio;
  }
  montoTotalCompra.innerText = total;
  cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
  montoTotalCompra.innerText = "0";
  cantProductos.innerText = "0";
  localStorage.clear();
  carrito = [];
}


function cargarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito == null) {
    return [];
  } else {
    return carrito;
  }
}
