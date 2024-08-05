productosCarrusel(productos)
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
                    <h5>${producto.categoria}</h5>
                    <p>${producto.nombre}</p>
                </div>
            `
            indicadoresCarrusel.appendChild(indicador)
            listaCarrusel.appendChild(item)
        }
    });
}
$(document).ready(function(data){
    const lista = document.getElementById("agregados-recientemente")
    
    
    /*
    <div class="col-3 m-3">
        <div class="card">
            <img src="Images/logo - icono.png" class="card-img-top" alt="Producto 1">
        </div>
    </div>
    */
   