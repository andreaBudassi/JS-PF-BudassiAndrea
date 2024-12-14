// Variables globales
let articulos = []
let carrito = []

// Función para inicializar los artículos
function inicializarArticulos() {
    let articulosGuardados = localStorage.getItem('articulos')
    if (articulosGuardados) {
        articulos = JSON.parse(articulosGuardados)
        mostrarProductos(articulos)
        inicializarEventos()
    } else {
        // Cargar los artículos desde el archivo JSON
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                articulos = data
                guardarArticulos()
                mostrarProductos(articulos)
                inicializarEventos()
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error)
            })
    }
}

// Función para guardar los artículos en el localStorage
function guardarArticulos() {
    localStorage.setItem('articulos', JSON.stringify(articulos))
}

// Función para cargar el carrito desde el localStorage
function cargarCarrito() {
    let carritoGuardado = localStorage.getItem('carrito')
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado)
    }
}

// Función para guardar el carrito en el localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Función para mostrar los productos en el index
function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos')
    contenedor.innerHTML = ''

    productos.forEach(producto => {
        let div = document.createElement('div')
        div.classList.add('producto')

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.categoria}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})" ${producto.stock === 0 ? 'disabled' : ''}>
                ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        `

        contenedor.appendChild(div)
    })
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    let producto = articulos.find(item => item.id === id)
    if (producto && producto.stock > 0) {
        let itemEnCarrito = carrito.find(item => item.id === id)
        if (itemEnCarrito) {
            if (itemEnCarrito.cantidad < producto.stock) {
                itemEnCarrito.cantidad++
                guardarCarrito()
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No hay más stock disponible',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } else {
            carrito.push({ ...producto, cantidad: 1 })
            guardarCarrito()
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Producto sin stock',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

// Función para mostrar los items del carrito en carrito.html
function mostrarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody')
    tbody.innerHTML = ''

    let total = 0

    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad
        total += subtotal

        let tr = document.createElement('tr')

        tr.innerHTML = `
            <td><img src="${item.imagen}" alt="${item.nombre}" width="50"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                ${item.cantidad}
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
            </td>
            <td>$${subtotal}</td>
            <td><button onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td>
        `

        tbody.appendChild(tr)
    })

    document.getElementById('total-amount').innerText = total
}

// Función para cambiar la cantidad de un item en el carrito
function cambiarCantidad(id, delta) {
    let item = carrito.find(item => item.id === id)
    let articulo = articulos.find(item => item.id === id)
    if (item) {
        if (delta === -1 && item.cantidad > 1) {
            item.cantidad--
            guardarCarrito()
            mostrarCarrito()
        } else if (delta === 1 && item.cantidad < articulo.stock) {
            item.cantidad++
            guardarCarrito()
            mostrarCarrito()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad no válida',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id)
    guardarCarrito()
    mostrarCarrito()
}

// Función para completar la compra
function comprar() {
    carrito.forEach(item => {
        let articulo = articulos.find(prod => prod.id === item.id)
        if (articulo) {
            articulo.stock -= item.cantidad
        }
    })
    guardarArticulos()
    carrito = []
    guardarCarrito()
    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada con éxito!',
        showConfirmButton: false,
        timer: 2000
    }).then(() => {
        window.location.href = 'index.html'
    })
}

// Función para inicializar los eventos en index.html
function inicializarEventos() {
    // Event Listeners
    document.getElementById('carrito-btn').addEventListener('click', () => {
        window.location.href = 'carrito.html'
    })

    // Filtro por categoría
    const botonesCategoria = document.querySelectorAll('#categorias button')
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.getAttribute('data-categoria')
            if (categoria === 'todos') {
                mostrarProductos(articulos)
            } else {
                const productosFiltrados = articulos.filter(item => item.categoria === categoria)
                mostrarProductos(productosFiltrados)
            }
        })
    })

    // Buscador
    document.getElementById('search-btn').addEventListener('click', () => {
        const texto = document.getElementById('search-input').value.toLowerCase()
        const productosFiltrados = articulos.filter(item => item.nombre.toLowerCase().includes(texto))
        mostrarProductos(productosFiltrados)
    })
}

// Función para inicializar la página index.html
function iniciarIndex() {
    cargarCarrito()
    inicializarArticulos()
}

// Función para inicializar la página carrito.html
function iniciarCarrito() {
    cargarCarrito()
    inicializarArticulos()
    mostrarCarrito()

    // Event Listeners
    document.getElementById('comprar-btn').addEventListener('click', comprar)
    document.getElementById('volver-btn').addEventListener('click', () => {
        window.location.href = 'index.html'
    })
}

// Inicialización dependiendo de la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        iniciarIndex()
    } else if (window.location.pathname.includes('carrito.html')) {
        iniciarCarrito()
    }
})