# ElectroShop - E-commerce de Electrónicos

¡Bienvenido a **ElectroShop**! Este es un proyecto de e-commerce sencillo para la venta de artículos electrónicos, desarrollado como trabajo final para el curso de JavaScript del curso de front-end en CoderHouse.

## Descripción del Proyecto

ElectroShop es una tienda en línea donde los usuarios pueden:

- Navegar por un catálogo de productos electrónicos.
- Filtrar productos por categorías.
- Buscar productos por nombre.
- Agregar productos al carrito de compras.
- Modificar cantidades de productos en el carrito.
- Ver el total de la compra.
- Realizar la compra, actualizando el stock de los productos.

El proyecto aplica conocimientos de:

- **HTML y CSS:** Estructura y estilos de las páginas.
- **JavaScript:** Manipulación del DOM, eventos, JSON, Fetch API y Storage.
- **Librerías Externas:** Uso de SweetAlert2 para notificaciones.

## Características Principales

- **Página de Inicio (`index.html`):**
  - Visualización de productos con imagen, nombre, categoría, precio y stock.
  - Filtro por categorías (celulares, TV, audio, impresoras, accesorios, cámaras).
  - Buscador de productos.
  - Botón para agregar productos al carrito.
  - Header con nombre de la tienda y mensaje de bienvenida.
  - Footer con información de derechos reservados.

- **Página del Carrito (`carrito.html`):**
  - Lista de productos agregados al carrito con imagen, nombre, precio y cantidad.
  - Posibilidad de modificar la cantidad de cada producto.
  - Cálculo automático del subtotal y total.
  - Botón para eliminar productos del carrito.
  - Botón para realizar la compra (actualiza stock).
  - Botón para volver al catálogo.

## Tecnologías Utilizadas

- **HTML5** para la estructura de las páginas.
- **CSS3** para estilos y diseño de la interfaz.
- **JavaScript (ES6)** para la lógica del negocio y manipulación del DOM.
- **Fetch API** para obtener los productos desde un archivo JSON local.
- **LocalStorage** para el almacenamiento de datos en el navegador.
- **SweetAlert2** para notificaciones y alertas estilizadas.

## Estructura del Proyecto

index.html
carrito.html
style.css
script.js
productos.json
images/
   edge-fusion.jpg
   tv-samsung.jpg
   ... (otras imágenes)

- *index.html:* Página principal con el catálogo de productos.
- *carrito.html:* Página del carrito de compras.
- *style.css:* Hoja de estilos compartida por ambas páginas.
- *script.js:* Archivo JavaScript con la lógica del sitio.
- *productos.json:* Archivo JSON con los datos de los productos.
- *images/*: Carpeta con las imágenes de los productos.

## Instrucciones de Instalación y Ejecución

1. *Clona o descarga el repositorio del proyecto:*

git clone https://github.com/andreaBudassi/JS-PF-BudassiAndrea.git

2. *Navega al directorio del proyecto:*

cd electroshop

3. **Abre el archivo index.html en tu navegador web:**

- Puedes abrir el archivo directamente haciendo doble clic sobre él.
- O utilizar una extensión como Live Server en Visual Studio Code.

4. *Interacción con el Sitio:*

- *Navegación y Filtros:*
  - Explora los productos disponibles.
  - Utiliza los botones de categorías para filtrar los productos.
  - Usa el buscador para encontrar productos por nombre.

- *Carrito de Compras:*
  - Agrega productos al carrito haciendo clic en "Agregar al Carrito".
  - Haz clic en "Ver Carrito" para revisar los productos añadidos.
  - Modifica la cantidad de productos o elimínalos si lo deseas.

- *Realizar Compra:*
  - En la página del carrito, haz clic en "Comprar" para completar la compra.
  - El stock de los productos se actualizará y el carrito se vaciará.

## Funcionalidades Detalladas

### Almacenamiento y Persistencia

- *LocalStorage:*
- El estado del carrito y el stock de los productos se almacenan en el localStorage del navegador, lo que permite que los datos persistan incluso después de recargar la página.
- Si deseas reiniciar los datos al estado inicial, limpia el localStorage del navegador.

### JavaScript y DOM

- *Manipulación del DOM:*
- Los productos y el carrito se renderizan dinámicamente en el DOM.
- Se utilizan eventos para manejar interacciones como clics en botones y cambios en el input de búsqueda.

- *Eventos:*
- Eventos de clic en botones de categorías, agregar al carrito, modificar cantidades, eliminar productos, y realizar la compra.
- Evento DOMContentLoaded para inicializar la aplicación según la página actual.

- *Fetch API:*
- Los productos se obtienen desde un archivo productos.json utilizando fetch(), lo que simula una petición a un servidor.

- *SweetAlert2:*
- Se utiliza SweetAlert2 para mejorar la experiencia del usuario al mostrar notificaciones y alertas estilizadas en lugar de los tradicionales alert().

- *Notas Importantes:*
- Evento DOMContentLoaded para inicializar la aplicación según la página actual.

## Licencia

Este proyecto es de código abierto y se desarrolla con fines educativos.
