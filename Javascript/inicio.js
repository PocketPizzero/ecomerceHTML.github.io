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
                <img src="${producto.imagenes[0]}" class="d-block mx-auto pb-5 w-50" alt="...">
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
        elemento.classList.add('col')
        elemento.classList.add('m-3')
        elemento.innerHTML =
        `<div class="card">
            <img src="${producto.imagenes[0]}" class="card-img-top" alt="Producto">
        </div>`

        agregados_recientemente.appendChild(elemento)
    })
    
    const elemento = document.createElement('div')
    elemento.classList.add('col')
    elemento.classList.add('m-3')
    elemento.classList.add('text-center')
    elemento.innerHTML = 
        `<div class="card">
            <h5 class="card-title">
                <a class="nav-link" href="HTML/Productos.html">Ver más</a>
            </h5>
        </div>`

    agregados_recientemente.appendChild(elemento)
}


/*Gráfico*/

document.addEventListener('DOMContentLoaded', function() {
    // Cargar los datos del archivo JSON
    fetch('Json/grafico.json')
        .then(response => response.json())
        .then(data => {
            // Extraer los nombres y usuarios para el gráfico
            const labels = data.productos.map(p => p.nombre);
            const usuarios = data.productos.map(p => p.usuarios);

            // Configuración del gráfico
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels, // Etiquetas del gráfico
                    datasets: [{
                        label: 'Número de Usuarios',
                        data: usuarios, 
                        backgroundColor: [
                            'rgba(214, 51, 132, 0.5)', // Color para Aywey
                            'rgba(51, 122, 255, 0.5)', // Color para Peraphone
                            'rgba(255, 193, 7, 0.5)', // Color para Universe
                            'rgba(40, 167, 69, 0.5)'  // Color para Shaomay
                        ],
                        borderColor: [
                            '#D63384', // Borde para Aywey
                            '#337AB7', // Borde para Peraphone
                            '#FFC107', // Borde para Universe
                            '#28A745'  // Borde para Shaomay
                        ],
                        borderWidth: 2 // Grosor del borde
                    }]
                },
                options: {
                    responsive: true, // Hacer el gráfico responsivo
                    plugins: {
                        legend: {
                            position: 'top', // Posición de la leyenda
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw} usuarios`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});