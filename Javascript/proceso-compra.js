cargarCarrito()

function cargarCarrito(){
    let listaCarrito = new Array()

    var total = 0;
    var precio = 0;
	var cantidad = 0;
	var subTotal = 0;
		
    if(localStorage.getItem('carrito')){
        listaCarrito.push(JSON.parse(localStorage.getItem('carrito')))
    }


    listaCarrito.forEach( p => 
        p.forEach(
            
         objeto =>

            {
            const elemento = document.createElement('tr')
            elemento.innerHTML =
            `<td><img src=".${objeto.imagen}" alt="Producto" class="img-fluid" width="50"></td>
            <td>${objeto.nombre}</td>
            <td>${objeto.precio}</td>
            <td><input type="number" class="form-control form-control-fucsia" value="${objeto.cantidad}" data-id="${objeto.id}" min="0" change="updateCartItemQty(this.id)"></td>
            <td>${objeto.subtotal}</td>
            <td><button value="${objeto.id}" type="button" class="btn btn-fucsia" onclick="removeCartItem(this.value)">X</button></td>`
        
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
