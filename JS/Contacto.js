// Esto lo que hace es esperar a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Aqui se obtinee el  el formulario de contacto
    const form = document.getElementById('contactForm');

    // Este hace quemaneje el evento de envío del formulario
    form.addEventListener('submit', function(event) {
        //Y el if hace que se prevenga  el envío del formulario si no es valido
        if (!form.checkValidity()) {
            event.preventDefault(); // esto evita el el envío del formulario
            event.stopPropagation(); // y esto detiene la propagación del evento
        }

        // y esto anade o quita las clases de validacion
        form.classList.add('was-validated');
    }, false);
});