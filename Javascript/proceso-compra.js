document.getElementById('continuar').addEventListener('click', function() {
    // Simula un clic en la pestaña de medios de pago
    document.getElementById('medios-tab').classList.remove('disabled')
    document.getElementById('medios-tab').click();
});
document.getElementById('aceptar').addEventListener('click', function() {
    // Simula un clic en la pestaña de medios de pago
    document.getElementById('finalizar-tab').classList.remove('disabled')
    document.getElementById('finalizar-tab').click();
	mostrarFactura()
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
	var cobro = 
	{
		subtotal: subtotal, 
		costoEnvio: costoEnvio, 
		total : total
	}
	localStorage.setItem('cobro', JSON.stringify(cobro))

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

function mostrarFactura() {
	const facturaCarrito = document.getElementById("factura-carrito")
	const facturaCobro = document.getElementById("factura-cobro")
	const facturaPago = document.getElementById("factura-pago")
			
	var infoCarrito = JSON.parse(localStorage.getItem('compra'))
	var infoCobro = JSON.parse(localStorage.getItem('cobro'))
	var infoPago = JSON.parse(localStorage.getItem('medioPago'))

	infoCarrito.forEach(function(articulo) {
		precio = parseFloat(articulo.precio) | 0;
		cantidad = parseInt(articulo.cantidad) | 0;
		subtotal = parseFloat(articulo.subtotal) | 0;

		const row = document.createElement('tr')
		row.innerHTML =
			`<td class="imagen-articulo">
            	<img src=".${articulo.imagen}" alt="" width="80">
            </td>
            <td class="info-articulo right-align">
                ${articulo.nombre}"...X"${articulo.cantidad}"..."${articulo.subtotal}
            </td>`
			
		facturaCarrito.appendChild(row)
	});

	infoCobro.forEach(function(cobro) {
		subtotal = parseFloat(cobro.subtotal) | 0;
		costoEnvio = parseInt(cobro.costoEnvio) | 0;
		total = parseFloat(cobro.total) | 0;

		const rowEnvio = document.createElement('tr')
		rowEnvio.innerHTML =
			`<td>
				Envío
			</td>
            <td class="td-costo-envio right-align">
				${costoEnvio}
			</td>`
		
		const rowSubtotal = document.createElement('tr')
		rowSubtotal.innerHTML =
			`<td>
				Subtotal
			</td>
			<td class="td-subtotal right-align">
				${costoSubtotal}
			</td>`

		const rowTotal = document.createElement('tr')
		rowTotal.innerHTML =
			`<td>
				Total
			</td>
			<td class="td-total right-align">
				${costoTotal}
			</td>`
			
		facturaCobro.appendChild(rowEnvio)
		facturaCobro.appendChild(rowSubtotal)
		facturaCobro.appendChild(rowTotal)
	});

	infoPago.forEach(function(pago) {
		precio = parseFloat(pago.precio) | 0;
		cantidad = parseInt(pago.cantidad) | 0;
		subtotal = precio * cantidad

		const rowTarjeta = document.createElement('tr')
		rowTarjeta.innerHTML =
			`<td>
				Tarjeta
			</td>
			<td class="td-total right-align">
				${pago}
			</td>`
		const rowTipoEnvio = document.createElement('tr')
		rowTipoEnvio.innerHTML =
			`<td>
				Tipo de envío
			</td>
			<td class="td-total right-align">
				${pago}
			</td>`
			
		facturaPago.appendChild(rowTarjeta)
		facturaPago.appendChild(rowTipoEnvio)
	});
}

