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
