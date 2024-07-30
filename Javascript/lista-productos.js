function mostrarProductos(data){

    data.array.forEach(producto => {
        const colProducto = document.createElement("div")
        colProducto.classList.add("col")

        const cardProducto =
        `<div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${imagenes[1]}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                </div>
            </div>
        </div>`

        colProducto.append(cardProducto)
        
    });
}