$(document).ready(function() {


    $(document).ready(function(){
        const urlParams = new URLSearchParams(window.location.search);
        const productoId = urlParams.get("id");

        const producto= productos.find((p)=>p.id==productoId)

        //Colocar Imagenes
        let contador = 0
        $("#miniatura").attr("src", "."+producto.imagenes[0])

        producto.imagenes.forEach(i => {
            // Crea un <li>
            var elemento = $('<li>').addClass("item-group-item").append
            (
                // Al <li> le añade un <button> para cambiar la imagen
                $('<button>').on('click', function(){
                    cambiarImagen(i)}
                ).attr
                ('type', 'button'
                ).addClass(
                    'galeria-imagen'
                )
                // Al <button> le añade la <img/> correspondiente
                .append
                (
                    $('<img/>').attr('src', "."+producto.imagenes[contador]).addClass
                    ('w-100')
                )
            )
            // Al <li> le añade un <button> para cambiar la imagen
            $("#imagenes").append(elemento)

           contador++
        })

        //Info producto
        $("#id-producto").text(producto.id)
        $("#nombre").text(producto.nombre)
        $("#precio").text("₡ " + producto.precio)

        if(producto.unidades > 0){
            $("#disponibilidad").text("Disponible")
        }else{
            $("#disponibilidad").text("Agotado")
        }

        //Tabla Descripción
        $("#tamaño").text
        (
            "Alto: " + producto.alto +
            "\nAncho: " + producto.ancho
        )
        $("#almacenamiento").text(producto.almacenamiento)
        $("#ram").text(producto.RAM)
        $("#bateria").text(producto.bateria)

        //Tabla Envío
        $('#entrega').text(producto.entrega_aproximada)
        $('#costo').text(producto.costo_envio)

        //Evento botón
        $("#añadir").attr('onclick', "añadirAlCarrito("+producto.id+")")
        
    })

    let contador = 0
        $("#miniatura").attr("src", "."+producto.imagenes[0])

        producto.reseñas.forEach(i => {
            // Crea un <li>
            var elemento = $('<li>').addClass("item-group-item").append
            (
                // Al <li> le añade un <button> para cambiar la imagen
                $('<button>').on('click', function(){
                    cambiarImagen(i)}
                ).attr
                ('type', 'button'
                ).addClass(
                    'galeria-imagen'
                )
                // Al <button> le añade la <img/> correspondiente
                .append
                (
                    $('<img/>').attr('src', "."+producto.imagenes[contador]).addClass
                    ('w-100')
                )
            )
            // Al <li> le añade un <button> para cambiar la imagen
            $("#imagenes").append(elemento)

           contador++
        })

        /*
        <li>
            <div class="container mt-3">
                <div class="review mb-4 p-3 border rounded shadow-sm">
                    <div class="d-flex flex-column flex-md-row align-items-start"> <!--  flex-column para pantallas pequenas -->
                        <div class="me-3 mb-3 mb-md-0"> <!--  mb-3 para espacio en pantallas pequenas -->
                            <img src="../Images/Placeholder.jpeg" alt="Foto del Usuario" class="rounded-circle" style="width: 50px; height: 50px;">
                    </div>
                <div>
            <h5 class="mb-1">Nombre del Usuario</h5>
            <div class="stars mb-1">
                ★★★★★
            </div>
                                        <p class="mb-0">"¡Me encanta esta tienda! La página es super fácil de usar y encontré justo lo que necesitaba sin complicaciones. Además, el equipo de soporte es genial, siempre están ahí para ayudarte si tienes alguna pregunta. ¡Definitivamente volveré a comprar aquí!"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
        */
})


function añadirAlCarrito(id) {

	const producto = productos.find((p) => p.id === id)

    let imagen = producto.imagenes[0]
    let nombre = producto.nombre
    let precio = producto.precio
    let cantidad = 1
    let subtotal = producto.precio

	//Elemento del carrito
	//{}
	const cartItem={
		imagen: imagen,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        subtotal: subtotal
	}

	//Obtener carrito actual
	let listaCarrito = new Array()

	if(localStorage.getItem('carrito')){
		listaCarrito = JSON.parse(localStorage.getItem('carrito'))
	}

    listaCarrito.push(cartItem)
    
    localStorage.setItem('carrito', JSON.stringify(listaCarrito))

}