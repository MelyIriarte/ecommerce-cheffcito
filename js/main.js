document.addEventListener('DOMContentLoaded', () => {
    //VARIABLES

    let carrito = [];
    const divisa = "$";
    const miLocalStorage = window.localStorage;

    let listadoProductos = [];
    fetch("data.json")
        .then((resp) => resp.json())
        .then((data) => {
            listadoProductos = data;
            renderizarProductos();
        });

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