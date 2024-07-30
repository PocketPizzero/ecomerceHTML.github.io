mostrarProductos(productos)
mostrarCategorias()

function mostrarProductos(data) {
    document.getElementById("lista-productos").innerHTML = ''

    data.forEach((producto) => {
        const colProducto = document.createElement("div")
        colProducto.classList.add("col")

        const cardProducto =
        `
            <div class="card">
                    <img src="${producto.imagenes[0]}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.precio}</p>
                </div>
            </div>
        `

        colProducto.innerHTML = cardProducto
        document.getElementById("lista-productos").appendChild(colProducto)

    });
}

function mostrarCategorias(){
    var categorias = []
    productos.forEach((producto) => {
        producto.forEach((categoria)=> {
            if(categorias.includes(categoria)===false){
            const divCategoria = document.createElement("div")

            categorias.push(categoria)
            const rowCategoria =
            `
            <div class="mb-5">
                <h2 class="text-center">${producto.categoria}</h2>
                <div class="row justify-content-center"></div>
            </div>
            `
            divCategoria.innerHTML = rowCategoria
            document.getElementById("lista-productos").appendChild = divCategoria
            }
        })
        
    })
}