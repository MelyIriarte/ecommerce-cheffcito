document.addEventListener('DOMContentLoaded', () => {
    //VARIABLES

    let carrito = [];
    const divisa = "$";
    const miLocalStorage = window.localStorage;

    //PRODUCTOS
    const listadoProductos = [{
            id: 1,
            imagen: "img/brownie-min.png",
            nombre: "Brownie",
            descripcion: "Base de nuestro brownie de chocolate con una capa de dulce de leche y copos de merengue Italiano.",
            precio: 200,
            categoria: "tortas"
        }, {
            id: 2,
            imagen: "img/chescake-min.png",
            nombre: "Cheescake",
            descripcion: " Base de galletitas trituradas con una crema de queso, terminada con una deliciosa jalea de frutos rojos.",
            precio: 3000,
            categoria: "tortas"
        }, {
            id: 3,
            imagen: "img/rogel-min.png",
            nombre: "Rogel",
            descripcion: " Masas fina de galeta muy crocante intercaladas con dulce de leche terminada con pico altos de meregue Italiano.",
            precio: 2200,
            categoria: "tortas"

        }, {
            id: 4,
            imagen: "img/lemonpie-min.png",
            nombre: "Lemonpie",
            descripcion: "Base de una masa fina  rellena de una crema de limon , cubierta con unos picos de merengue italiano",
            precio: 2500,
            categoria: "tortas"
        }, {
            id: 5,
            imagen: "img/scon-min.png",
            nombre: "Scon",
            descripcion: "Panecillos de queso",
            precio: 600,
            categoria: "panaderia"
        },
        {
            id: 6,
            imagen: "img/alfajorcito-min.png",
            nombre: "Alfajores de maicena",
            descripcion: " Masa quebrada, super suave rellena con dulce de leche, con coco al rededor.",
            precio: 600,
            categoria: "panaderia"
        },
        {
            id: 7,
            imagen: "img/budin-min.png",
            nombre: "Budin de zanahoria",
            descripcion: "Budin de zanahoria con glaseado y decoracion de zanahoria en pasta ballina.",
            precio: 1000,
            categoria: "panaderia"
        }, {
            id: 8,
            imagen: "img/pandulceChips .png",
            nombre: "Pandulce de chips",
            descripcion: "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidad de chips,cubiertos con un glaseado de limon ",
            precio: 1200,
            categoria: "productos festivos"
        }, {
            id: 9,
            imagen: "img/pandulce.png",
            nombre: "Pandulce de frutos secos",
            descripcion: "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidad de frutos secos ,cubiertos con frutos secos caramelizados ",
            precio: 1500,
            categoria: "productos festivos"
        }, {
            id: 10,
            imagen: "img/pandulce.png",
            nombre: "Pandulce clasico ",
            descripcion: "Nuestros pandulces estan elaborados un una masa exquisita y mega esponjosa, con gran cantidas de frutas seca y abrillantadas ,cubiertos con frutos caramelizados ",
            precio: 1200,
            categoria: "productos festivos"
        }, {
            id: 11,
            imagen: "img/roscaClasica.png",
            nombre: "Rosca de pascuas",
            descripcion: "Rosca clasica decorada con crema pastelera, cerezas e higos",
            precio: 1100,
            categoria: "productos festivos"
        }, {
            id: 12,
            imagen: "img/trenzada.png",
            nombre: "Rosca trenzada",
            descripcion: "La masa clasica de la rosca trenzada con crema pastelera y trozos de chocolate ",
            precio: 1100,
            categoria: "productos festivos"
        }, {
            id: 13,
            imagen: "img/budines.png",
            nombre: "Budin de nuez",
            descripcion: "Budin de nuez, decorado con un glaseado de limon ",
            precio: 1050,
            categoria: "panaderia"
        }, {
            id: 14,
            imagen: "img/budines.png",
            nombre: "Budin de chips",
            descripcion: "Budin de chips, decorado con un glaseado de limon ",
            precio: 900,
            categoria: "panaderia"
        }, {
            id: 15,
            imagen: "img/cinnamonroll-min.png",
            nombre: "Cinnamon roll",
            descripcion: "Clasicos rolls de canella y azucar negra , cubiertos con un glasse con nueces ",
            precio: 200,
            categoria: "panaderia"
        }, {
            id: 16,
            imagen: "img/tiramisu.png",
            nombre: "Tiramisu",
            descripcion: "Clasica crema mascarpone con vainillas humedesidas en licor de cafe con cacao",
            precio: 1200,
            categoria: "tortas"
        }
    ]


    //BUSCADOR
    const input1 = document.querySelector("#busqueda");
    input1.value = "";
    input1.addEventListener('keyup', buscar);

    function buscar() {
        const texto = input1.value.toLowerCase();

        contenedorBusqueda = document.querySelector("#grid");
        contenedorBusqueda.innerHTML = '';

        for (let producto of listadoProductos) {
            let nombre = producto.nombre.toLowerCase();
            if (nombre.indexOf(texto) != -1) {
                contenedorProducto = document.createElement("article");
                contenedorProducto.classList.add("articleProductos")
                contenedorProducto.innerHTML = `
                                                    <img src ="${producto.imagen}"/>
                                                    <h5>${producto.nombre}</h5>
                                                    <p> ${producto.descripcion}</p>
                                                    <p> $ ${producto.precio}</p>
                                                   `
                const cardBoton = document.createElement("button");
                cardBoton.classList.add("boton");
                cardBoton.textContent = "Agregar";
                cardBoton.setAttribute("marcador", producto.id);
                cardBoton.addEventListener("click", ayadirProductoAlCarrito);
                contenedorProducto.appendChild(cardBoton);
                contenedorBusqueda.appendChild(contenedorProducto);
            }
        }
    }

    //FUNCION QUE CREA LAS CARDS
    const domGrid = document.getElementById("grid");

    function renderizarProductos() {

        listadoProductos.forEach((info) => {

            const card = document.createElement("article");
            card.classList.add("articleProductos");

            const cardImg = document.createElement("img");
            cardImg.setAttribute("src", `${info.imagen}`);

            const cardNombre = document.createElement("h5");
            cardNombre.textContent = `${info.nombre}`;

            const cardDescripcion = document.createElement("p");
            cardDescripcion.textContent = info.descripcion;

            const cardPrecio = document.createElement("p");
            cardPrecio.textContent = `$ ${info.precio}`;

            const cardBoton = document.createElement("button");
            cardBoton.classList.add("boton");
            cardBoton.textContent = "Agregar";
            cardBoton.setAttribute("marcador", info.id);
            cardBoton.addEventListener("click", ayadirProductoAlCarrito);
            // armado de card
            card.appendChild(cardImg);
            card.appendChild(cardNombre);
            card.appendChild(cardDescripcion);
            card.appendChild(cardPrecio);
            card.appendChild(cardBoton);
            domGrid.appendChild(card);

        });
    }

    // añadir al carrito un producto, actualiza y guarda en el localstorage
    function ayadirProductoAlCarrito(e) {

        carrito.push(e.target.getAttribute("marcador"));
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: 'Su producto se añadio al carrito'
        })
    }

    // muestra los productos guardados en el carrito
    const domCarrito = document.querySelector("#carrito");
    const domTotal = document.querySelector("#total");

    function renderizarCarrito() {

        domCarrito.textContent = "";
        console.log(carrito);
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = listadoProductos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroDeVecesAcomprar = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total; /* use operador ternario*/
            }, 0);

            const miNodo = document.createElement("li");
            miNodo.classList.add("list-group-item", "text-right", "mx-2");
            miNodo.innerHTML = `<img src=${miItem[0].imagen}> ${numeroDeVecesAcomprar} x ${miItem[0].nombre} = ${miItem[0].precio}${divisa}`;

            // boton de borrar 
            const miBoton = document.createElement('button');
            miBoton.classList.add("boton");
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);

            miNodo.appendChild(miBoton);
            domCarrito.appendChild(miNodo);
        })
        domTotal.textContent = calcularTotal();
    }

    //borra un elemento del carrito
    function borrarItemCarrito(e) {

        const id = e.target.dataset.item;

        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });

        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    //calcula el precio precio total
    function calcularTotal() {
        return carrito.reduce((total, item) => {

            const miItem = listadoProductos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    //vaciar el carrito y vuelve a dibujarlo
    function vaciarCarrito() {

        carrito = [];
        renderizarCarrito();
        localStorage.clear();

        Swal.fire({
            title: '¿Esta seguro de querer vaciar este carrito?',
            showDenyButton: true,
            confirmButtonText: `Continuar comprando`,
            denyButtonText: 'Vaciar',
        }).then((result) => {
            if (result.isDenied) {
                Swal.fire('Carrito vacio', '', 'success')
            }
        })
    }

    function comprarCarrito() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Compra realizada con exito.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    const domBotonVaciar = document.querySelector("#boton-vaciar");
    const domBotonComprar = document.querySelector("#boton-comprar");

    domBotonVaciar.addEventListener('click', vaciarCarrito);
    domBotonComprar.addEventListener("click", comprarCarrito);

    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});