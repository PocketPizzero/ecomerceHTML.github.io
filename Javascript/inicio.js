productosCarrusel(productos)
productosRecientes(productos)
function productosCarrusel(data){
    //Auxiliares
    const categorias = [];
    let contador = 0;
    
    //Listas
    const indicadoresCarrusel = document.getElementById("indicadoresCarrusel")
    const listaCarrusel = document.getElementById("listaCarrusel")

    data.forEach(producto => {
        if(!categorias.includes(producto.categoria)){
            categorias.push(producto.categoria)
            
            const indicador = document.createElement('button')
            indicador.type = 'button'
            indicador.setAttribute("data-bs-target", "#carouselExampleCaptions")
            indicador.setAttribute("data-bs-slide-to", "" + contador)
            indicador.setAttribute("aria-label", "Slide " + contador )
            contador = contador + 1

            const item = document.createElement('div')
            item.classList.add('carousel-item')
            item.classList.add('pb-5')

            if(contador<=1){
                indicador.classList.add('active')
                item.classList.add('active')
            }

            item.innerHTML =
            `
                <img src="${producto.imagenes[0]}" class="d-block mx-auto pb-5" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5 class="fs-2">${producto.nombre}</h5>
                </div>
            `
            indicadoresCarrusel.appendChild(indicador)
            listaCarrusel.appendChild(item)
        }
    });
}

function productosRecientes(data){
    const agregados_recientemente = document.getElementById('agregados-recientemente')

    const ordenados = data.sort((p1,p2) => {
        const fecha1 = new Date(p1.fecha_agregado)
        const fecha2 = new Date(p2.fecha_agregado)
        return fecha2 - fecha1
    }) 
    
    ordenados.slice(0, 3).forEach( producto => {
        const elemento = document.createElement('div')
        elemento.classList.add('col-3')
        elemento.classList.add('m-3')
        elemento.innerHTML =
        `<div class="card">
            <img src="${producto.imagenes[0]}" class="card-img-top" alt="Producto">
        </div>`

        agregados_recientemente.appendChild(elemento)
    })

    const elemento = document.createElement('div')
    elemento.classList.add('col-1')
    elemento.classList.add('m-3')
    elemento.innerHTML = 
        `<div class="card">
            <h5 class="card-title">
                <a class="nav-link" href="HTML/Productos.html">Ver más</a>
            </h5>
        </div>`

    agregados_recientemente.appendChild(elemento)
}