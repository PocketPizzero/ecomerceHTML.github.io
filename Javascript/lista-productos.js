

function detalleProducto(id) {
    window.location.href = `Detalle Producto.html?id=${id}`;
}

/*function mostrarProductos(data) {

    const categorias = document.querySelectorAll(".categoria")

    data.forEach((producto) => {

        categorias.forEach( categoria => {

            const nombreCategoria = categoria.firstElementChild.textContent

            if((nombreCategoria)===producto.categoria){
                const colProducto = document.createElement("div")
                colProducto.classList.add("col-md-4")
                colProducto.classList.add("mb-4")

                const cardProducto =
                `<div class="card mb-5 fs-1">
                        <img src=".${producto.imagenes[0]}" class="card-img-top" alt="">
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">&#8353; ${producto.precio}</p>   
                          <button type="button" class="btn btn-fucsia-full btn-lg" onclick="detalleProducto(${producto.id})">
                            Más Información
                          </button>             
                        </div>
                    </div>`

                
                colProducto.innerHTML = cardProducto
                categoria.children[1].appendChild(colProducto)
            }
        })


    });
}*/

function mostrarCategorias(categoria){
    // Limpiar
    document.getElementById("lista-productos").innerHTML = ""

    // Filtrar por categoria

    // Filtrar por categoria
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria)
    console.log(categoria)

    // Crear espacio de la categoria
    const divCategoria = document.createElement("div")
    divCategoria.classList.add("categoria")
    divCategoria.classList.add("mb-5")

    const rowCategoria =
    `
        <h2 class="text-center">${categoria}</h2>
        <div class="row justify-content-center mx-5">
        
        </div>
    `
    divCategoria.innerHTML = rowCategoria
    document.getElementById("lista-productos").appendChild(divCategoria)
    
    // Agregar productos fltrados
    productosFiltrados.forEach(producto => {

        const colProducto = document.createElement("div")
        colProducto.classList.add("col-md-4")
        colProducto.classList.add("mb-4")
            const cardProducto =
            `<div class="card mb-5 fs-1">
                <img src=".${producto.imagenes[0]}" class="card-img-top" alt="">
                <div class="card-body text-center">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">&#8353; ${producto.precio}</p>
                    <button type="button" class="btn btn-fucsia-full btn-lg" onclick="detalleProducto(${producto.id})">
                        Más Información
                    </button>             
                </div>
            </div>`
                
        colProducto.innerHTML = cardProducto
        divCategoria.children[1].appendChild(colProducto)
    })

    if(categoria == "Todos"){
        const categorias = []
        let productosFiltrados = data
        // productos.filter(producto => producto.categoria === categoria)
        
        productosFiltrados.forEach((producto) => {
            if(categorias.includes(producto.categoria)==false){
                // Crea la categoria
                categorias.push(producto.categoria)
                const divCategoria = document.createElement("div")
                divCategoria.classList.add("categoria")
                divCategoria.classList.add("mb-5")

                const rowCategoria =
                `
                    <h2 class="text-center">${producto.categoria}</h2>
                    <div class="row justify-content-center mx-5">
                    
                    </div>
                `
                divCategoria.innerHTML = rowCategoria
                document.getElementById("lista-productos").appendChild(divCategoria)


                }
           
    })
    }
}

/*function mostrarCategorias(){
    const categorias = []
    productos.forEach((producto) => {
            if(categorias.includes(producto.categoria)==false){
                categorias.push(producto.categoria)
                const divCategoria = document.createElement("div")
                divCategoria.classList.add("categoria")
                divCategoria.classList.add("mb-5")

                const rowCategoria =
                `
                    <h2 class="text-center">${producto.categoria}</h2>
                    <div class="row justify-content-center mx-5">
                    
                    </div>
                `
                divCategoria.innerHTML = rowCategoria
                document.getElementById("lista-productos").appendChild(divCategoria)
                }
           
    })
}*/