document.getElementById('continuar').addEventListener('click', function() {
    // Simula un clic en la pestaña de medios de pago
    document.getElementById('medios-tab').classList.remove('disabled')
    document.getElementById('medios-tab').click();
});
document.getElementById('aceptar').addEventListener('click', function() {
    // Simula un clic en la pestaña de medios de pago
    document.getElementById('finalizar-tab').classList.remove('disabled')
    document.getElementById('finalizar-tab').click();
});

//Esta parte es la que obtiene la informacion del carrito en consola 
document.getElementById('continuar').addEventListener('click', () => {
	
	//tipo del envio
    if (!document.querySelector('input[name="shippingOptions"]:checked').value){
        return

    }
let tipoEnvio= document.querySelector('input[name="shippingOptions"]:checked').value;

	//total y el subtotal 
	let subtotal = parseFloat((document.getElementById('subtotal').textContent).substring(2)) ;
	let costoEnvio= parseFloat((document.getElementById('costoEnvio').textContent).substring(2));
	let total= parseFloat((document.getElementById('total').textContent).substring(2)) ;

	//consola
	var objeto = 
	{
		subtotal: subtotal, 
		costoEnvio: costoEnvio, 
		total : total
	}
	localStorage.setItem('objeto', JSON.stringify(objeto))

}) 


//tab de la tarjeta
document.getElementById('pago').addEventListener('click',() => {

	//valores de la tarjeta
	let numeroTarjeta = document.getElementById('numeroTarjeta').value;
	let fechaExpiracion = document.getElementById('fechaExpiracion').value;
	let cvv = document.getElementById('cvv').value;

	//consola
	var medioPago = 
	{
		numeroTarjeta: numeroTarjeta, 
		fechaExpiracion: fechaExpiracion, 
		cvv : cvv
	}
	localStorage.setItem('medioPago', JSON.stringify(medioPago))
 
})