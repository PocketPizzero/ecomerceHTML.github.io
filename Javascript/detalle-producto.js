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

        $("#id-producto").text(producto.id)
        $("#nombre").text(producto.nombre)
        $("#precio").text("₡ " + producto.precio)
        $("#tamaño").text
        (
            "Alto: " + producto.alto +
            "\nAncho: " + producto.ancho
        )
        $("#almacenamiento").text(producto.almacenamiento)
        $("#ram").text(producto.RAM)
        $("#bateria").text(producto.bateria)
        $("#añadir").attr('onclick', "añadirAlCarrito("+producto.id+")")
    })
    
    function cambiarImagen(index){
        console.log(index)
        $("#miniatura").attr("src", "."+index)
    }
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