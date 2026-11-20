// const productos = [
//     {
//         idx: 1,
//         nombre: "A*Men",
//         marca: "thierrymugler",
//         titulo: "A*Men",
//         categoria: "Ambery Woody Gourmand",
//         descripcion: "the woody and masculine notes of patchouli imbued with bourbon vanilla vibrate with intensity.",
//         precio: 89.000,
//         badge: "Nuevo",
//         tipobadge: "nuevo",
//         imagen: "img/perfume1.webp"
//     },
//     {
//         idx: 2,
//         nombre: "Coffee Addict",
//         marca: "theodoroskalotinis",
//         titulo: "Coffee Addict",
//         categoria: "Amber Gourmand",
//         descripcion: "Coffee Roasted essential oil of the Coffea Arabica plant.",
//         precio: 45.00,
//         badge: "15% OFF",
//         tipobadge: "oferta",
//         imagen: "img/perfume2.webp"
//     },
//     {
//         idx: 3,
//         nombre: "Eilish Intense",
//         marca: "billieeilish",
//         titulo: "Eilish Intense",
//         categoria: "Amber Gourmand",
//         descripcion: "richer vanilla, sugared petals, and deeper woods, creating an enriched experience.",
//         precio: 88.00,
//         badge: "15% OFF",
//         tipobadge: "nada",
//         imagen: "img/perfume3.webp"
//     }
// ];



//  - PASO 1 - //
// Conectar a la api para traer todos los productos o la cantidad x parametro
// le paso el array completo a la funcion para crear las cards CrearPLP


// MockupAPI: https://6afc6f35892984c4494b9624.mockapi.io/api/tpfinal/productos
const apiUrl = "https://6afc6f35892984c4494b9624.mockapi.io/api/tpfinal/";
const endpointProductos = "https://6afc6f35892984c4494b9624.mockapi.io/api/tpfinal/productos";

function obtenerProductos(cantidad = 3) {
    fetch(endpointProductos)
        .then((response) => response.json())
        .then((data) => {
            // const productos = JSON.stringify(data);
            // Para la pagina principal, controlo la cantidad de productos a mostrar
            if (cantidad > 0) {
                data = data.slice(0, cantidad);
            } else {
                data = data;
            }
            crearPLP(data);
        })
        .catch((error) => { console.error("Error al obtener los productos, verifique la conexión:", error); });
    }




//  - PASO 2 - //
// Recibe el array completo de fletch y genera el codigo html de todas las tarjetas para insertar en la pagina



function crearPLP(listaProductos) {
        const contenedor = document.getElementById("contenedor-productos");
        let html = "";
    
        contenedor.innerHTML = "";
    
        // variable para obtener la ubicacion donde estoy parado actualmente para completar la ruta completa para traer la imagen
        // Issue #1 - notas.md
        const rutaBase = window.location.pathname.includes("/pages/") ? "../img/" : "./img/";
     
    
        listaProductos.map((producto) => {
            html += `
          <article class="producto-card">
            <div class="card-imagen">
                ${producto.tipobadge === "oferta" ? `<span class="badge oferta">${producto.badge}</span>`
                    : `<span class="badge">${producto.badge}</span>`}
                <img src="${rutaBase}${producto.imagen}" alt="${producto.titulo}">
            </div>
            <div class="card-contenido">
                <span class="producto-categoria">${producto.categoria}</span>
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <h6 class="producto-marca">${producto.marca}</h6>
                <div class="card-footer">
                    <span class="producto-precio">$${producto.precio.toFixed(3)}</span>
                    <button class="btn-agregar" type="button" id="cart-prodidx-${producto.idx}">Agregar</button>
              </div>
            </div>
          </article>
        `;
            contenedor.innerHTML = html;
            catchEventos(listaProductos);
        });
    }
    
function catchEventos(listaProductos) {
    listaProductos.forEach(producto => {

        const boton = document.getElementById(`cart-prodidx-${producto.idx}`);
        if (boton) {
            boton.addEventListener('click', () => {
                addCart(producto)
            })
        }

    })
}


function addCart(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const idxProductoExisteCarrito = carrito.findIndex(item => item.idx === producto.idx);

    if (idxProductoExisteCarrito !== -1) {
        carrito[idxProductoExisteCarrito].cantidad++;
    } else {
        carrito.push({
            idx: producto.idx,
            nombre: producto.nombre,
            marca: producto.marca,
            titulo: producto.titulo,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            badge: producto.badge,
            tipobadge: producto.tipobadge,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

obtenerProductos(3);


// crearPLP(productos);


