document.getElementById('numeroTarjeta').addEventListener('input', function() {
	let numeroTarjeta = document.getElementById('numeroTarjeta').value
	let fechaExpiracion = document.getElementById('fechaExpiracion').value
	let cvv = document.getElementById('cvv').value
  
  //Página de BIN de bancos en Costa Rica https://bincheck.org/costa-rica?page=1
  //BIN MASTERCARD BANCO DE COSTA RICA: 510209
  //BIN VISA BANCO DE COSTA RICA: 410372
  
  // Identificar tipo de tarjeta
	if (numeroTarjeta.length >= 6) {
	   fetch(`https://data.handyapi.com/bin/${numeroTarjeta}`)
	  .then(response => {
		return response.json(); // Convertir el Response a JSON
	  })
	  .then(datos => {
		console.log(datos); // Muestra el JSON en la consola
		let imagenTarjeta = '../Images/logo - icono pestaña.jpeg';
  
		if (datos.Scheme === 'VISA') { 
		  imagenTarjeta = '../Images/Proceso - Visa.png';
		} else if (datos.Scheme === 'MASTERCARD') {
		  imagenTarjeta = '../Images/Proceso - Mastercard.png';
		} else {
		  imagenTarjeta = '../Images/logo - icono pestaña.png';
		}
  
		// Actualiza la fuente de la imagen
		document.getElementById('imagenTarjeta').src = imagenTarjeta;
  
		// Muestra en la consola el tipo de tarjeta
		console.log('Tipo de tarjeta:', datos.brand);
  
	  })
	  .catch(error => {
		console.error('Error:', error);
		document.getElementById('imagenTarjeta').src = '../Images/logo - icono pestaña.png'; // Limpia la imagen en caso de error
	  
	  });
	} else {
	document.getElementById('imagenTarjeta').src = '../Images/logo - icono pestaña.png'; // Limpia la imagen si el número de tarjeta es demasiado corto
  }
  
  // Validar tarjeta
  if(!numeroTarjeta.length == 16){
	document.querySelector('#numeroTarjeta').classList.add('is-invalid');
	document.querySelector('.invalidad-feedback').textContent= 'Numero de tarjeta inválido';
  }
  /*if(fechaExpiracion){
	document.querySelector('#cvv').classList.add('is-invalid');
	document.querySelector('.invalidad-feedback').textContent= 'Código de seguridad inválido';
  }*/
  if(cvv.length!=3){
	document.querySelector('#cvv').classList.add('is-invalid');
	document.querySelector('.invalidad-feedback').textContent= 'Código de seguridad inválido';
  }
  
  })

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
		precio = parseFloat(infoCarrito.precio) | 0;
		cantidad = parseInt(infoCarrito.cantidad) | 0;
		subtotal = parseFloat(infoCarrito.subtotal) | 0;

		const row = document.createElement('tr')
		row.innerHTML =
			`<td class="imagen-articulo">
            	<img src=".${articulo.imagen}" alt="" width="80">
            </td>
            <td class="info-articulo right-align">
                ${articulo.nombre}.....x${articulo.cantidad}.....${articulo.subtotal}
            </td>`
			
		facturaCarrito.appendChild(row)
	});


		subtotal = parseFloat(infoCobro.subtotal) | 0;
		costoEnvio = parseInt(infoCobro.costoEnvio) | 0;
		total = parseFloat(infoCobro.total) | 0;

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
				${subtotal}
			</td>`

		const rowTotal = document.createElement('tr')
		rowTotal.innerHTML =
			`<td>
				Total
			</td>
			<td class="td-total right-align">
				${total}
			</td>`
			
		facturaCobro.appendChild(rowEnvio)
		facturaCobro.appendChild(rowSubtotal)
		facturaCobro.appendChild(rowTotal)

		precio = parseFloat(infoPago.precio) | 0;
		cantidad = parseInt(infoPago.cantidad) | 0;
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
	
}

