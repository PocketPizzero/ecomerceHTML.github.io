mostrarCarrito();


function añadirArticulo(id) {
    //Obtener Elemento
    const producto = productos.find((p) => p.id === id)

    let imagen = producto.imagenes[0]
    let nombre = producto.nombre
    let precio = producto.precio
    let cantidad = 1
    let subtotal = producto.precio
    //Elemento del carrito
		let cartItem={
            id,
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            subtotal: subtotal
        }
    
	//Obtener carrito actual
	let cartArray=new Array()
	if(localStorage.getItem('compra')){
		cartArray=JSON.parse(localStorage.getItem('compra'))
	}
	if(cartArray.length>0){
		let item=cartArray.findIndex((p)=>p.id===id)

		if(item != -1){
			cartArray[item].cantidad+=1
			//Subtotal
            cartArray[item].subtotal = cartArray[item].precio * cartArray[item].cantidad
		}else{
			cartArray.push(cartItem)
		}
	}else{
		cartArray.push(cartItem)
	}
	
	localStorage.setItem('compra',JSON.stringify(cartArray))

    console.log(JSON.parse(localStorage.getItem('compra')))

}

function eliminarArticulo(id) {
	var cartArray = JSON.parse(localStorage.getItem('compra'))
	if (cartArray) {
		let index = cartArray.findIndex((producto) => producto.id == parseInt(id));

		cartArray.splice(index,1)
	}
	//Guardar
	if(cartArray.length===0){
		localStorage.removeItem('compra');
		mostrarCarrito()
	}else{
		localStorage.setItem('compra',  JSON.stringify(cartArray))
		mostrarCarrito()
	}
	
} 

function actualizarCantidadArticulo(articulo) {
	var id = articulo.dataset.id
	var cantidad = articulo.value
	var cartArray = JSON.parse(localStorage.getItem('compra'))
	if(cantidad<='0' && cantidad.trim()!=''){
		eliminarArticulo(id)
		return;
	}
	if (cartArray) {
		let index = cartArray.findIndex((p) => p.id === parseInt(id));
		cartArray[index].cantidad=parseInt(cantidad)
		
	}
	//Guardar
	localStorage.setItem('compra',  JSON.stringify(cartArray))
	mostrarCarrito()
}

 function vaciarCarrito() {
	if (localStorage.getItem('compra')) {
		localStorage.removeItem('compra');
		mostrarCarrito()
	}
}

function mostrarCarrito() {
	const tbody = document.getElementById("carrito")
	if(tbody){
		tbody.innerHTML = ``

		let listaCarrito = new Array()

		var numeroArticulos = 0
		var total = 0;
		var precio = 0;
		var cantidad = 0;
		var subTotal = 0;
			
		var cart = JSON.parse(localStorage.getItem('compra'))
		if (cart) {

			numeroArticulos = cart.length;

			cart.forEach(function(producto) {
			
				precio = parseFloat(producto.precio) | 0;
				cantidad = parseInt(producto.cantidad) | 0;
				subtotal = precio * cantidad

				const elemento = document.createElement('tr')
				elemento.innerHTML =
				`<td><img src=".${producto.imagen}" alt="Producto" class="img-fluid" width="50"></td>
				<td>${producto.nombre}</td>
				<td>₡ ${producto.precio}</td>
				<td><input type="number" class="form-control" value="${producto.cantidad}" data-id="${producto.id}" min="0" onChange="actualizarCantidadArticulo(this)"></td>
				<td class="subtotal">₡ ${subtotal}</td>
				<td><button value="${producto.id}" type="button" class="btn btn-outline-primary" onclick="eliminarArticulo(this.value)">X</button></td>`
			
				tbody.appendChild(elemento)

				total += subTotal;
			});
		}
		aplicarDescuento()
		actualizarSubtotal()
		validar()
	}
	else
	{
		return
	}
	
}

document.querySelectorAll('input[name="shippingOptions"]').forEach(radio => {
	radio.addEventListener('change', () => {
		let costoEnvio = 0
		switch (radio.id) {
		case "shippingPostal":
			costoEnvio = 5000;
			break;
		case "shippingStore":
			costoEnvio = 0;
			break;
		}
		$('#costoEnvio').text("₡ "+costoEnvio)

		actualizarSubtotal()

	});
});

/* DESCUENTO */

document.getElementById('codigo-descuento').addEventListener('input', function () {
	if(this.value.trim() != ''){
		document.getElementById('boton-descuento').removeAttribute('disabled')
	}else{
		document.getElementById('boton-descuento').setAttribute('disabled', 'disabled')
	}
});

function aplicarDescuento(){
	let codigo = document.getElementById('codigo-descuento')
	let subtotal = parseFloat(document.getElementById('subtotal').textContent.substring(2))
	if(codigo.value === 'Placeholder'){
		$('#descuento').text("₡ "+ subtotal * 0.05)
		actualizarSubtotal()
	}
	else if(codigo.value === 'ISW'){
		$('#descuento').text("₡ "+ subtotal * 0.10)
		actualizarSubtotal()
	}
	else {
		$('#descuento').text("₡ "+ 0)
		actualizarSubtotal()
	}
	codigo.value = ""
}

function actualizarSubtotal() {
	
	let subtotal = 0
	let descuento = parseFloat(document.getElementById('descuento').textContent.substring(2))
	let costoEnvio = parseFloat((document.getElementById('costoEnvio').textContent).substring(2))
	let total = 0

	let subtotales = document.querySelectorAll('.subtotal')
	subtotales.forEach(subtotalArticulo => {
		subtotal += parseFloat(subtotalArticulo.textContent.substring(2))
	})
	
	
	$('#subtotal').text("₡ "+subtotal)
	total = subtotal - descuento + costoEnvio
	$('#total').text("₡ "+ total)

	validar()

}

function validar(){
	var cart = JSON.parse(localStorage.getItem('compra'))
	var postal = document.getElementById('shippingPostal')
	var tienda = document.getElementById('shippingStore')
		if (cart) {
			postal.disabled = false
			tienda.disabled = false
			document.getElementById('medios-tab').classList.add('disabled')
			if(postal.checked || tienda.checked){
				document.getElementById('continuar').disabled = false
			}else{
				document.getElementById('continuar').disabled = true
				document.getElementById('medios-tab').classList.add('disabled')
			}
		}else{
			postal.disabled = true
			tienda.disabled = true
			postal.checked = false
			tienda.checked = false
			document.getElementById('costoEnvio').textContent = "₡ "+0
			document.getElementById('continuar').disabled = true
			document.getElementById('medios-tab').classList.add('disabled')
		}
}




