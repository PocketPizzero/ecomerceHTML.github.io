mostrarCategorias()
mostrarProductos(productos)


function mostrarProductos(data) {

    const categorias = document.querySelectorAll(".categoria")

    data.forEach((producto) => {

        categorias.forEach( categoria => {

            const nombreCategoria = categoria.firstElementChild.textContent

            if((nombreCategoria)===producto.categoria){
                const colProducto = document.createElement("div")
                colProducto.classList.add("col-md-4")
                colProducto.classList.add("mb-4")

                const cardProducto =
                `<div class="card fs-1">
                        <img src="${producto.imagenes[0]}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
<<<<<<< HEAD
                            <p class="card-text">${producto.precio}</p>   
                           <button type="button" class="btn btn-outline-info btn-outline-custom">Más Información</button>
=======
                            <p class="card-text">${producto.precio}</p>
                            <button type="button" class="btn btn-outline-info">Más Información</button>
>>>>>>> 199e16e99475127a531915c5a266e89ff099ad9e
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