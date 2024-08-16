showDetailShop();

function addToCart(id) {
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

	//////Notificar Guardar
	/////$.notify("Libro agregado: "+name,"sucess")
}

function removeCartItem(id) {
	var cartArray = JSON.parse(localStorage.getItem('compra'))
	if (cartArray) {
		let index = cartArray.findIndex((producto) => producto.id == id);
		cartArray.splice(index,1)
	}
	//Guardar
	localStorage.setItem('compra',  JSON.stringify(cartArray))
	//////$.notify("Libro Eliminado de la Compra", "warn");
	//////showDetailShop()
} 

function updateCartItemQty(articulo) {
	
	var id = articulo.dataset.id
	var cantidad = articulo.value
	var cartArray = JSON.parse(localStorage.getItem('compra'))
	if(cantidad==0 && cantidad.trim()!=''){
		//removeZero()
		return
	}
	if (cartArray) {
		let index = cartArray.findIndex((p) => p.id === id);
		cartArray[index].cantidad=cantidad
		//Subtotal
		
	}
	//Guardar
	localStorage.setItem('compra',  JSON.stringify(cartArray))
	showDetailShop()
}

 function emptyCart() {
	if (localStorage.getItem('compra')) {
		localStorage.removeItem('compra');
		showDetailShop()
	}
}
function showDetailShop() {
	console.log('1')
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
            <td>${producto.precio}</td>
            <td><input type="number" class="form-control form-control-fucsia" value="${producto.cantidad}" min="0" onChange="updateCartItemQty(this)"></td>
            <td>${subtotal}</td>
            <td><button value="${producto.id}" type="button" class="btn btn-fucsia" onclick="removeCartItem(this.value)">X</button></td>`
        
            const tbody = document.getElementById("carrito")
            tbody.appendChild(elemento)

			total += subTotal;
		});
	}

	//$('#total-items').text(itemCount);
	//$('#total-compra').text("$" + total.toFixed(2));
}
