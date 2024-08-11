cargarCarrito()

function cargarCarrito(){
    let listaCarrito = new Array()
		
    if(localStorage.getItem('carrito')){
        listaCarrito.push(JSON.parse(localStorage.getItem('carrito')))
    }

    console.log(listaCarrito)

    listaCarrito.forEach( p => 
        p.forEach(
         objeto =>

            {
                console.log(objeto)
            const elemento = document.createElement('tr')
            elemento.innerHTML =
            `<td><img src=".${objeto.imagen}" alt="Producto" class="img-fluid" width="50"></td>
            <td>${objeto.nombre}</td>
            <td>${objeto.precio}</td>
            <td><input type="number" class="form-control form-control-fucsia" value="${objeto.cantidad}" min="0"></td>
            <td>${objeto.subtotal}</td>
            <td><button type="button" class="btn btn-fucsia">X</button></td>`
        
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
