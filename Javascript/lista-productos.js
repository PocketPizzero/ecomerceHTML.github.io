mostrarCategorias()
mostrarProductos(productos)


function mostrarProductos(data) {

    const categorias = document.querySelectorAll(".categoria")

    data.forEach((producto) => {

        categorias.forEach( categoria => {

            const nombreCategoria = categoria.firstElementChild.textContent

            if((nombreCategoria)===producto.categoria){
                const colProducto = document.createElement("div")
                colProducto.classList.add("col")

                const cardProducto =
                `<div class="col-md-10 mb-4">
                    <div class="card fs-1">
                        <img src="${producto.imagenes[0]}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.precio}</p>
                        </div>
                    </div>
                </div>`

                colProducto.innerHTML = cardProducto
                categoria.children[1].appendChild(colProducto)
            }
        })


    });
}

function mostrarCategorias(){
    const categorias = []
    productos.forEach((producto) => {
            if(categorias.includes(producto.categoria)==false){
                categorias.push(producto.categoria)
                const divCategoria = document.createElement("div")

                const rowCategoria =
                `
                <div class="categoria mb-5">
                    <h2 class="text-center">${producto.categoria}</h2>
                    <div class="row justify-content-center">
                    
                    </div>
                </div>
                `
                divCategoria.innerHTML = rowCategoria
                document.getElementById("lista-productos").appendChild(divCategoria)
                }
           
    })
}