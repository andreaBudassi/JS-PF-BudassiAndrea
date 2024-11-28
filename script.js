
// Variables globales
let articulos = [];
let carrito = [];

// Función para inicializar los artículos
function inicializarArticulos() {
    let articulosGuardados = localStorage.getItem('articulos');
    if (articulosGuardados) {
        articulos = JSON.parse(articulosGuardados);
    } else {
        articulos = [
            { id: 1, nombre: "Moto Edge 50 Fusion", categoria: "celulares", stock: 5, precio: 800000, imagen: "images/edge-fusion.png" },
            { id: 2, nombre: "Televisor Samsung 50\"", categoria: "tv", stock: 3, precio: 120000, imagen: "images/tv-samsung.png" },
            { id: 3, nombre: "Webcam C270 Logitech", categoria: "cámaras", stock: 10, precio: 37000, imagen: "images/logi-webcam.png" },
            { id: 4, nombre: "Canon Rebel T100 18-55", categoria: "cámaras", stock: 7, precio: 1061445, imagen: "images/camara-canon.png" },
            { id: 5, nombre: "Galaxy A55 256GB", categoria: "celulares", stock: 8, precio: 623000, imagen: "images/galaxy-a55.png" },
            { id: 6, nombre: "Apple iPhone 13", categoria: "celulares", stock: 3, precio: 1353600, imagen: "images/iphone-13.png" },
            { id: 7, nombre: "Google TV Philips 4K 65\"", categoria: "tv", stock: 10, precio: 1099000, imagen: "images/tv-philips.png" },
            { id: 8, nombre: "Xiaomi Sound Outdoor", categoria: "audio", stock: 3, precio: 125000, imagen: "xiaomi-audio.png" },
            { id: 9, nombre: "Xiaomi Redmi Buds 6", categoria: "audio", stock: 6, precio: 22000, imagen: "redmi-audio.png" },
            { id: 10, nombre: "Crown Mustang 2000w", categoria: "audio", stock: 7, precio: 35000, imagen: "crow-audio.png" },
            { id: 11, nombre: "HP LaserJet Pro 4103FDW", categoria: "impresoras", stock: 5, precio: 585000, imagen: "images/multifuncion.png" },
            { id: 12, nombre: "Estuche Para Auriculares", categoria: "accesorios", stock: 3, precio: 4000, imagen: "images/estuche.png" },
            { id: 13, nombre: "HP Smart Tank 580", categoria: "impresoras", stock: 6, precio: 250000, imagen: "images/hp-impresora.png" },
            { id: 14, nombre: "Displayport 16k V2.1", categoria: "accesorios", stock: 20, precio: 254000, imagen: "images/display-port.png" },
        ];
        guardarArticulos(); // Guardamos los artículos iniciales en localStorage
    }
}

// Función para guardar los artículos en el localStorage
function guardarArticulos() {
    localStorage.setItem('articulos', JSON.stringify(articulos));
}

// Función para cargar el carrito desde el localStorage
function cargarCarrito() {
    let carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Función para guardar el carrito en el localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar los productos en el index
function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.categoria}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="agregarAlCarrito(${producto.id})" ${producto.stock === 0 ? 'disabled' : ''}>
                ${producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        `;

        contenedor.appendChild(div);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    let producto = articulos.find(item => item.id === id);
    if (producto && producto.stock > 0) {
        let itemEnCarrito = carrito.find(item => item.id === id);
        if (itemEnCarrito) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            if (itemEnCarrito.cantidad < producto.stock) {
                itemEnCarrito.cantidad++;
            } else {
                alert('No hay más stock disponible');
            }
        } else {
            // Si no está en el carrito, lo agrega con cantidad 1
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        alert('Producto agregado al carrito');
    } else {
        alert('Producto sin stock');
    }
}

// Función para mostrar los items del carrito en carrito.html
function mostrarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody');
    tbody.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        let tr = document.createElement('tr');

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
        `;

        tbody.appendChild(tr);
    });

    document.getElementById('total-amount').innerText = total;
}

// Función para cambiar la cantidad de un item en el carrito
function cambiarCantidad(id, delta) {
    let item = carrito.find(item => item.id === id);
    let articulo = articulos.find(item => item.id === id);
    if (item) {
        if (delta === -1 && item.cantidad > 1) {
            item.cantidad--;
        } else if (delta === 1 && item.cantidad < articulo.stock) {
            item.cantidad++;
        }
        guardarCarrito();
        mostrarCarrito();
    }
}

// Función para eliminar un item del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// Función para completar la compra
function comprar() {
    carrito.forEach(item => {
        let articulo = articulos.find(prod => prod.id === item.id);
        if (articulo) {
            articulo.stock -= item.cantidad;
        }
    });
    guardarArticulos(); // Guardamos los artículos actualizados
    carrito = [];
    guardarCarrito();
    alert('¡Compra realizada con éxito!');
    window.location.href = 'index.html';
}

// Función para inicializar la página index.html
function iniciarIndex() {
    inicializarArticulos(); // Carga los artículos
    cargarCarrito();
    mostrarProductos(articulos);

    // Event Listeners
    document.getElementById('carrito-btn').addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    // Filtro por categoría
    const botonesCategoria = document.querySelectorAll('#categorias button');
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.getAttribute('data-categoria');
            if (categoria === 'todos') {
                mostrarProductos(articulos);
            } else {
                const productosFiltrados = articulos.filter(item => item.categoria === categoria);
                mostrarProductos(productosFiltrados);
            }
        });
    });

    // Buscador
    document.getElementById('search-btn').addEventListener('click', () => {
        const texto = document.getElementById('search-input').value.toLowerCase();
        const productosFiltrados = articulos.filter(item => item.nombre.toLowerCase().includes(texto));
        mostrarProductos(productosFiltrados);
    });
}

// Función para inicializar la página carrito.html
function iniciarCarrito() {
    inicializarArticulos(); // Carga los artículos
    cargarCarrito();
    mostrarCarrito();

    // Event Listeners
    document.getElementById('comprar-btn').addEventListener('click', comprar);
    document.getElementById('volver-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Inicialización dependiendo de la página
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        iniciarIndex();
    } else if (window.location.pathname.includes('carrito.html')) {
        iniciarCarrito();
    }
});