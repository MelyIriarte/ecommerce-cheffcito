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

alert(listaProductosMenu);

let selecionCategoria = prompt("seleccione que categoria desea comprar")

const listaPorCategoria = listadoProductos.filter(producto => producto.categoria == selecionCategoria)

for (const producto of listaPorCategoria) {

    let card = document.createElement("article");
    card.classList.add("articleProductos");
    let grid = document.getElementById("grid");

    card.innerHTML = ` <br> <img src=${producto.imagen} alt="rogel">
                       <h5> ${producto.nombre} <br> ${producto.descripcion} </h5>
                       $ ${producto.precio}  <button class ="boton"> lo quiero </button>`

    grid.appendChild(card);

}

/* 
function stockInsuficiente(producto) {
    alert("no tenemos suficiente stock de " + producto);
}

function compra(producto) {
    cantidadComprada = parseInt(prompt("Cuantos quiere:"));

    if (producto.stock >= cantidadComprada) {
        producto.stockActual(cantidadComprada);
        total += producto.precio * cantidadComprada;
    } else {
        stockInsuficiente(producto.nombre);
    }
}
let cantidadProductos = parseInt(prompt("Ingrese la cantidad de productos a COMPRAR"));

for (let i = 0; i < cantidadProductos; i++) {

    let productoAcomprar = prompt("¿Que producto quiere comprar?");
    productoAcomprar = productoAcomprar.toLowerCase();

    const listadoFiltrado = listadoProductos.find(el => el.nombre === productoAcomprar);

    if (listadoFiltrado) {
        compra(listadoFiltrado);
    } else { 
        alert("No tenemos ese producto"); 
    }

}
alert("Usted tiene que pagar $" + total); */