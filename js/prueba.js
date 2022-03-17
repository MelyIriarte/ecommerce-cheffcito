class Productos {
    constructor(nombre, precio, stock, descripcion, categoria, imagen) {

        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.imagen = imagen;
    }
    stockActual(cantidadComprada) {

        this.stock -= cantidadComprada;
        console.log(this.nombre + "\nSTOCK: " + this.stock);
    }
}

let listaProductosMenu = "Nuestras tortas son:";
let contador = 0;
let cantidadComprada;
let total = 0;

const brownie = new Productos("brownie", 2000, 10, "Base de nuestro brownie de chocolate con una capa de dulce de leche y copos de merengue Italiano.", "tortas", "../img/brownie-min.png");

const cheescake = new Productos("cheescake", 3000, 5, " Base de galletitas trituradas con una crema de queso, terminada con una deliciosa jalea de frutos rojos.", "tortas", "../img/chescake-min.png");

const rogel = new Productos("rogel", 2200, 3, " Masas fina de galeta muy crocante intercaladas con dulce de leche terminada con pico altos de meregue Italiano.", "tortas", "../img/rogel-min.png");

const lemonpie = new Productos("lemonpie", 2500, 6, "Base de una masa fina  rellena de una crema de limon , cubierta con unos picos de merengue italiano", "tortas", "../img/lemonpie-min.png");

const scones = new Productos("scon", 600, 12, "Panecillos de queso", "panaderia", "../img/scon-min.png");

const alfajorMaicena = new Productos("alfajores de maicena", 600, 12, " Masa quebrada, super suave rellena con dulce de leche, con coco al rededor.", "panaderia", "../img/alfajorcito-min.png");

const budinZanahoria = new Productos("budin de zanahoria", 1000, 4, "Budin de zanahoria con glaseado y decoracion de zanahoria en pasta ballina.", "panaderia", "../img/budin-min.png");

const pandulceChips = new Productos("pandulce de chips", 1200, 6, "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidad de chips,cubiertos con un glaseado de limon ", "productos festivos", "");

const pandulceFrutosSecos = new Productos("pandulce de frutos secos", 1500, 6, "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidad de frutos secos ,cubiertos con frutos secos caramelizados ", "productos festivos", "../img/pandulce.png");

const pandulceClasico = new Productos("pandulce clasico ", 1200, 6, "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidas de frutas seca y abrillantadas ,cubiertos con frutos caramelizados ", "productos festivos", "");

const roscaPascua = new Productos("rosca de pascuas", 1100, 4, "Rosca clasica decorada con crema pastelera, cerezas e higos", "productos festivos", "");

const roscaTrenzada = new Productos("rosca trenzada", 1100, 3, "La masa clasica de la rosca trenzada con crema pastelera y trozos de chocolate ", "productos festivos", "");

const budinNuez = new Productos("budin de nuez", 1050, 5, "Budin de nuez, decorado con un glaseado de limon ", "panaderia", "");

const budinChips = new Productos("budin de chips", 900, 5, "Budin de chips, decorado con un glaseado de limon ", "panaderia", "");

const cinnamonRoll = new Productos("cinnamon roll", 200, 5, "Clasicos rolls de canella y azucar negra , cubiertos con un glasse con nueces ", "panaderia", "../img/cinnamonroll-min.png");

const listadoProductos = [brownie, cheescake, rogel, lemonpie, scones, alfajorMaicena, budinZanahoria, pandulceChips, pandulceFrutosSecos, pandulceClasico, roscaPascua, roscaTrenzada, budinNuez, budinChips];

for (const producto of listadoProductos) {

    contador++;

    listaProductosMenu += "\n" + contador + "- " + producto.nombre;
}

//alert(listaProductosMenu);
const carrito = document.getElementById("carrito");
const contenedorCards = document.getElementById("grid");
const contenido = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");


cargarEventListeners();

function cargarEventListeners() {
    contenedorCards.addEventListener("click", comprarPlatillo);
    carrito.addEventListener("click", eliminarPlatillo);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

/* funcion para añadir productos al carrito */

function comprarProductos(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const contenedorCards = e.target.parentElement.parentElement;
        leerDatosProductos(contenedorCards);
    }
}


function leerDatosProductos(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoProducto);
}

function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${platillo.imagen}" width=100> 
       </td> 
       <td>${platillo.titulo}</td>
       <td>${platillo.precio}</td>
       <td>
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
       </td>
    `;
    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPlatillo(e) {
    e.preventDefault();

    let platillo,
        platilloId;

    if (e.target.classList.contains('borrar-platillo')) {
        e.target.parentElement.parentElement.remove();
        platillo = e.target.parentElement.parentElement;
        platilloId = platillo.querySelector('a').getAttribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}

function vaciarCarrito() {
    while (listaPlatillos.firstChild) {
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatillosLocalStorage() {
    let platillosLS;

    if (localStorage.getItem('platillos') === null) {
        platillosLS = [];
    } else {
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}

function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
        listaPlatillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(platillo) {
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platilloLS, index) {
        if (platilloLS.id === platillo) {
            platillosLS.splice(index, 1);
        }
    });

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}