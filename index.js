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


function crearPLP(listaProductos) {
    const contenedor = document.getElementById("contenedor-productos");
    let html = "";

    contenedor.innerHTML = "";

    listaProductos.forEach((producto) => {
        html += `
      <article class="producto-card">
        <div class="card-imagen">
            ${producto.tipobadge === "nuevo" ? `<span class="badge">${producto.badge}</span>`
                : producto.tipobadge === "oferta" ? `<span class="badge oferta">${producto.badge}</span>`
                    : ""
            }
            <img src="${producto.imagen}" alt="${producto.titulo}">
        </div>
        <div class="card-contenido">
            <span class="producto-categoria">${producto.categoria}</span>
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-descripcion">${producto.descripcion}</p>
            <h6 class="producto-marca">${producto.marca}</h6>
            <div class="card-footer">
                <span class="precio">$${producto.precio.toFixed(3)}</span>
                <button class="btn-agregar" type="button" data-id="${producto.idx}">Agregar</button>
          </div>
        </div>
      </article>
    `;
        contenedor.innerHTML = html;
    });
}



// listado de productos en formato JSON
// MockupAPI: https://6afc6f35892984c4494b9624.mockapi.io/api/tpfinal/productos


function obtenerProductos(cantidad = 4) {
    fetch("https://6afc6f35892984c4494b9624.mockapi.io/api/tpfinal/productos")
        .then((response) => response.json())
        .then((data) => {
            // const productos = JSON.stringify(data);
            data = data.slice(0, cantidad);
            crearPLP(data);
        })
        .catch((error) => { console.error("Error al obtener los productos:", error); });
}


obtenerProductos(4);

// crearPLP(productos);


