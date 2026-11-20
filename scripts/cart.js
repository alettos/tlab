
document.addEventListener('DOMContentLoaded', () => cargarProductosCarrito());


// 1 Cargar y renderizar los productos del carrito

function cargarProductosCarrito(){
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tabla = document.querySelector('#tabla_carrito');

    if (carrito.length === 0){
        tabla.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                    Tu carrito está vacío. Agregá productos desde la 
                    <a href="tienda.html">tienda</a> o desde el 
                    <a href="../index.html">home</a>.
                </td>
            </tr>`;
    } else {
        carrito.forEach(producto => {
            tabla.innerHTML += creaFilaProducto(producto);
        });
    }

    actualizarTotal(subtotal);

}



// 2 Genera el HTML de una fila de la tabla
function creaFilaProducto(producto){
    const subtotalProducto = producto.precio * producto.cantidad
    // Estas lineas es para corregir el path a la imagen, dependiendo de donde estoy parado, en que pagina...
    const rutaBase = window.location.pathname.includes("/pages/") ? "../img/" : "./img/";
    const rutaImagen = `${rutaBase}${producto.imagen}`;
    return `
        <tr>
            <td>
                <button class="remove-btn" data-id="${producto.idx}">
                    <i class="far fa-rectangle-xmark">x</i>
                </button>
            </td>
            <td>
                <img src="${rutaImagen}" alt="${producto.titulo}" style="height:80px; width:auto; object-fit:contain;">
            </td>
            <td>${producto.titulo}</td>
            <td>$${producto.precio.toFixed(3)}</td>
            <td>
                <input type="number" value="${producto.cantidad}" min="1" class="cantidad-producto" data-id="${producto.idx}">
            </td>
            <td>$${producto.precio * producto.cantidad}</td>
        </tr>
    `;
}

// 3 Actualizar el subtotal del producto

function actualizarTotal(subtotal){
    
}