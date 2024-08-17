cargarCarrito()

function cargarCarrito(){
    let carrito = new Array()

    var total = 0;
    var precio = 0;
	var cantidad = 0;
	var subTotal = 0;
		
    if(localStorage.getItem('carrito')){
        listaCarrito.push(JSON.parse(localStorage.getItem('carrito')))
    }


    listaCarrito.forEach( objeto => 
        objeto.forEach(
            
         articulo =>
            {
            const elemento = document.createElement('tr')
            elemento.innerHTML =
            `<td><img src=".${articulo.imagen}" alt="Producto" class="img-fluid" width="50"></td>
            <td>${articulo.nombre}</td>
            <td>${articulo.precio}</td>
            <td><input type="number" class="form-control form-control-fucsia" value="${articulo.cantidad}" data-id="${articulo.id}" min="0" change="actualizarCantidadCarrito(this.id)"></td>
            <td>${articulo.subtotal}</td>
            <td><button value="${articulo.id}" type="button" class="btn btn-fucsia" onclick="eliminarArtículo(this.value)">X</button></td>`
        
            const tbody = document.getElementById("carrito")
            tbody.appendChild(elemento)
            }
    
        )
    );
}

function vaciarCarrito(){
    localStorage.clear()

    const carrito = document.getElementById('carrito')
    carrito.innerHTML = ``
    
}

function eliminarProducto(nombreProducto){
    let listaCarrito = new Array()
		
    if(localStorage.getItem('carrito')){
        listaCarrito.push(JSON.parse(localStorage.getItem('carrito')))
    }

    let posicion = null
    listaCarrito.forEach(producto => {
        posicion = producto.indexOf(producto.find(p => p.nombre == nombreProducto))
    });

    /*listaCarrito.splice(listaCarrito.indexOf(producto), 1)

    localStorage.setItem('carrito', JSON.stringify(listaCarrito))*/
    
    cargarCarrito()
}
