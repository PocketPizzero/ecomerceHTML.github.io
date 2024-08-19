$(document).ready(function() {


    $(document).ready(function(){
        const urlParams = new URLSearchParams(window.location.search);
        const productoId = urlParams.get("id");

         //Validacion para Index
         if(!productoId){
            return
        }

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

        
        if(producto.Envio_Postal === true){
            
            $("#opciones-entrega").append
            (
                $('<li>').addClass("fs-3").text("Envío Postal")
            )
        }
        if(producto.Recoger_Tienda === true){
            $("#opciones-entrega").append
            (
                $('<li>').addClass("fs-3").text("Recoger en tienda")
            )
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
        $('#costo').text("₡ " + producto.costo_envio)

        //Evento botón
        $("#añadir").attr('onclick', "añadirArticulo("+producto.id+")")
        
        producto.reseñas.forEach(i => {
            const usuario = i[0]
            const estrellas = i[1]
            const texto = i[2]
    
            // Crea un <li>
            var reseña = $('<li>').append
            (
                // Al <li> le añade un <button> para cambiar la imagen
                $('<div>').addClass('container mt-3').append
                (
                    $('<div>').addClass('row w-100 mb-4 p-3 border rounded shadow-sm').append
                    (
                        $('<div>').addClass(' d-flex flex-column flex-md-row align-items-start').append
                        (
                            $('<div>').addClass('me-3 mb-3 mb-md-0').append
                            (
                                $('<img>').attr
                                ({
                                    'id': 'profile-picture',
                                    'src': '../Images/logo - icono general.png',
                                    'alt': 'Foto de perfil',
                                    'style': "width: 50px; height: 50px;"
                                }).addClass('rounded-circle')
                            )
                        ).append
                        (
                            $('<div>').append(
                                $('<h5>').addClass('mb-1').text(usuario)
                            ).append
                            (
                                $('<div>').addClass('stars fs-3 mb-1').text(estrellas)
                            ).append
                            (
                                $('<p>').addClass('mb-0').text(texto)
                            )   
                        )
                    )
                
                    
                )
    
            )
            $('#reseñas').append(reseña)
        })

    })

    
})
function cambiarImagen(index){
        $("#miniatura").attr("src", "."+index)
}

