/* ALERTA FORMULARIO */
const notificacionForm = document.getElementById('notificacionForm')

const appendNotificacionForm = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    notificacionForm.append(wrapper)
}


// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Obtener el formulario
    const form = document.getElementById('contactForm');

    // Agregar un evento de envío al formulario
    form.addEventListener('submit', function (event) {
        // Prevenir el comportamiento por defecto de envío del formulario
        event.preventDefault();

        // Verifica si el formulario es válido
        if (form.checkValidity() === false) {
            // errores de validación
            event.stopPropagation();
        } else {

            // datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            //  datos en la consola
            console.log('Formulario enviado con éxito:', data);

            // y esto elimina la clase de validacion
            //O sea que si el usuario intenta enviar el form otra vez, la validacion funcione 
            form.reset();//esto restablece el form

            form.classList.remove('was-validated');
            appendNotificacionForm('Datos y solicitud enviados con éxito', 'success')

        }

        // Agregar la clase de validación al formulario
        form.classList.add('was-validated');
    });

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

