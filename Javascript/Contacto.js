// Esto lo que hace es esperar a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Aqui se obtiene el formulario de contacto
    const form = document.getElementById('contactForm');

    // Este hace que maneje el evento de envío del formulario
    form.addEventListener('submit', function(event) {
        //Y el if hace que se prevenga  el envío del formulario si no es valido
        if (!form.checkValidity()) {
            event.preventDefault(); // esto evita el el envío del formulario
            event.stopPropagation(); // y esto detiene la propagación del evento
        }

        // y esto añade o quita las clases de validacion
        form.classList.add('was-validated');
    }, false);
});



document.addEventListener('DOMContentLoaded', () => {
    var location = [10.007074890715607, -84.21644628381505];

//10.007074890715607, -84.21644628381505 // ggogle maps 


    // Crear el mapa y establecer su centro y nivel de zoom
    var map = L.map('map').setView(location, 15);

    // Agregar una capa de mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregar un marcador en la ubicación de la Universidad
    L.marker(location).addTo(map)
        .bindPopup('<b>Universidad Técnica de Costa Rica</b><br>Sede Central de Alajuela en Villa Bonita.')
        .openPopup();
});


