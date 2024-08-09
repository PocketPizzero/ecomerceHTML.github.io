cargarCarrito()
function cargarCarrito(){
    let listaCarrito = new Array()
		
    if(localStorage.getItem('cartItem')){
        listaCarrito,JSON.parse(localStorage)
    }

    listaCarrito.forEach(p => {
        const elemento = document.createElement('tr')
        elemento.innerHTML =
        `<td>
            <img src=".${p.imagen}" alt="Producto 1" class="img-fluid" width="50"></td>
            <td>${p.nombre}</td>
            <td>${p.nombre}</td>
            <td><input type="number" class="form-control form-control-fucsia" value="${p.cantidad}" min="0"></td>
            <td>${p.subtotal}</td>
            <td><button type="button" class="btn btn-fucsia">X</button>
        </td>`
    
        const tbody = document.getElementById("carrito")
        tbody.appendChild(elemento)
    });
}
