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

function updateCartItemQty(element) {
	
	var idLibro = element.dataset.id
	var quantity=element.value
	var cartArray = JSON.parse(localStorage.getItem('compra'))
	if(quantity==0 && quantity.trim()!=''){
		//removeZero()
		return
	}
	if (cartArray) {
		let itemIndex = cartArray.findIndex((obj) => obj.id == idLibro);
		cartArray[itemIndex].cantidad=quantity
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
	var cartRowHTML = "";
	var itemCount = 0;
	var total = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;
	var cart = JSON.parse(localStorage.getItem('compra'))
	if (cart) {
		itemCount = cart.length;

		cart.forEach(function(item) {
		
			price = parseFloat(item.price) | 0;
			quantity = parseInt(item.cantidad) | 0;
			subTotal = price * quantity

			cartRowHTML += `<div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-3 col-lg-3 col-xl-3">
                          <h6 class="text-muted name-libro">${item.name}</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">

                          <input min="0" name="quantity" value="${item.cantidad}" type="number" onChange="updateCartItemQty(this)"
                            class="form-control form-control-sm quantity-libro" data-id="${item.id}" />

                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0 price-libro">&dollar; ${item.price}</h6>
                        </div>
                        
						<div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                          <h6 class="mb-0 subtotal-libro">&dollar;${subTotal.toFixed(2)}</h6>
                        </div>
						<div class="col-md-1 col-lg-1 col-xl-1 ">
                          <button type="button" class="btn btn-secondary"><i class="bi bi-trash" onclick="removeCartItem(${item.id})"></i></button>
                        </div>
                      </div>
                      <hr class="my-4">`;

			total += subTotal;
		});
	}

	$('#detail').html(cartRowHTML);
	$('#total-items').text(itemCount);
	$('#total-compra').text("$" + total.toFixed(2));
}
