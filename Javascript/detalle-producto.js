$(document).ready(function() {

    $(document).ready(function(){
        const urlParams = new URLSearchParams(window.location.search);
        const productoId = urlParams.get("id");
        console.log(productoId)

        const producto= productos.find((p)=>p.id==productoId)

        producto.imagenes.forEach(imagen => {
            const imagen = document.createElement("img")
            imagen.classList.add()
        });

        $("#nombre").text(producto.nombre)
        $("#precio").text(producto.precio)
        $("#tamaño").text(
            "Alto: " + producto.alto + "\nAncho: " + producto.ancho)
        $("#almacenamiento").text(producto.almacenamiento)
        $("#ram").text(producto.RAM)
        $("#bateria").text(producto.bateria)
    })
    
    
})