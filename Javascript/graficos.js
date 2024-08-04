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
                type: 'pie', // Tipo de gráfico: 'bar', 'line', 'pie', etc.
                data: {
                    labels: labels, // Etiquetas del gráfico
                    datasets: [{
                        label: 'Número de Usuarios',
                        data: usuarios, // Datos del gráfico
                        backgroundColor: 'rgba(214, 51, 132, 0.2)', // Color de fondo de las barras
                        borderColor: '#D63384', // Color del borde de las barras
                        borderWidth: 1 // Grosor del borde
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Empezar el eje Y desde cero
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

