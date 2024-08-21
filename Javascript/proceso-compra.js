/* API BIN TARJETA */
let tipoTajeta
document.getElementById('numeroTarjeta').addEventListener('input', function () {
	//Página de BIN de bancos en Costa Rica https://bincheck.org/costa-rica?page=1
	//BIN MASTERCARD BANCO DE COSTA RICA: 510209
	//BIN VISA BANCO DE COSTA RICA: 410372
	//TARJETA DE PRUEBA: 5102091234567890
	const numeroTarjeta = document.getElementById('numeroTarjeta').value

	// Identificar tipo de tarjeta
	if (numeroTarjeta.length >= 6) {
		fetch(`https://data.handyapi.com/bin/${numeroTarjeta}`)
			.then(response => {
				return response.json(); // Convertir el Response a JSON
			})
			.then(datos => {
				//console.log(datos); // Muestra el JSON en la consola
				let imagenTarjeta = '../Images/logo - icono pestaña.jpeg';
				tipoTajeta = datos.Scheme

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
				console.log('Tipo de tarjeta:', datos.Scheme);

			})
			.catch(error => {
				console.error('Error:', error);
				document.getElementById('imagenTarjeta').src = '../Images/logo - icono pestaña.png'; // Limpia la imagen en caso de error

			});
	} else {
		document.getElementById('imagenTarjeta').src = '../Images/logo - icono pestaña.png'; // Limpia la imagen si el número de tarjeta es demasiado corto
	}

})


/* VALIDAR FORMULARIO TARJETA */
const form = document.getElementById('cardForm');
// Agregar un evento de envío al formulario
form.addEventListener('submit', function (event) {

	// Prevenir el comportamiento por defecto de envío del formulario
	event.preventDefault();

	// Verifica si el formulario es válido
	if (form.checkValidity() === false) {
		// errores de validación
		event.stopPropagation()
	} else {
		// datos del formulario
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		$('#confirmacionPago').modal('show')
	}

	// Agregar la clase de validación al formulario
	form.classList.add('was-validated');
});


/* EVENTOS DE TAB */
document.getElementById('continuar').addEventListener('click', function () {
	// Simula un clic en la pestaña de medios de pago
	document.getElementById('medios-tab').classList.remove('disabled')
	document.getElementById('medios-tab').click();
});

document.getElementById('aceptar').addEventListener('click', function () {
	if (document.getElementById('cardForm').classList.contains('was-validated')) {
		// Simula un clic en la pestaña de medios de pago
		document.getElementById('pago').classList.add('disabled');
		document.getElementById('finalizar-tab').classList.remove('disabled')
		document.getElementById('finalizar-tab').click();
		mostrarFactura()
	}

});


var cobro
/* OBTENER COBRO */
document.getElementById('continuar').addEventListener('click', () => {

	//tipo del envio
	if (!document.querySelector('input[name="shippingOptions"]:checked').value) {
		return

	}

	let tipoEnvio = document.querySelector('input[name="shippingOptions"]:checked').value;
	let subtotal = parseFloat((document.getElementById('subtotal').textContent).substring(2));
	let descuento = parseFloat((document.getElementById('descuento').textContent).substring(2));
	let costoEnvio = parseFloat((document.getElementById('costoEnvio').textContent).substring(2));
	let total = parseFloat((document.getElementById('total').textContent).substring(2));

	cobro =
	{
		tipoEnvio: tipoEnvio,
		subtotal: subtotal,
		costoEnvio: costoEnvio,
		descuento: descuento,
		total: total
	}

})


var medioPago
/* OBTENER MEDIO PAGO */
document.getElementById('pago').addEventListener('click', () => {
	//valores de la tarjeta
	let numeroTarjeta = document.getElementById('numeroTarjeta').value;
	let fechaExpiracion = document.getElementById('fechaExpiracion').value;
	let cvv = document.getElementById('cvv').value;

	medioPago =
	{
		tipoTajeta: tipoTajeta,
		numeroTarjeta: numeroTarjeta,
		fechaExpiracion: fechaExpiracion,
		cvv: cvv
	}

})


/* MOSTRAR FACTURA */
function mostrarFactura() {
	const factura = document.getElementById("factura-carrito")
	factura.innerHTML =
	``

	var infoCarrito = JSON.parse(localStorage.getItem('compra'))
	var infoCobro = cobro
	var infoPago = medioPago

	infoCarrito.forEach(function (articulo) {
		precio = parseFloat(infoCarrito.precio) | 0;
		cantidad = parseInt(infoCarrito.cantidad) | 0;
		subtotal = parseFloat(infoCarrito.subtotal) | 0;

		const row = document.createElement('tr')
		row.innerHTML =
			`<td class="col-1">
            	<img src=".${articulo.imagen}" alt="" width="80">
            </td>
            <td class="text-end col-11 align-middle">
                ${articulo.nombre} . . . . . . x${articulo.cantidad} . . . . . . ₡ ${articulo.subtotal}
            </td>`

		factura.appendChild(row)
	});

	tipoEnvio = infoCobro.tipoEnvio
	subtotal = parseFloat(infoCobro.subtotal) | 0;
	descuento = parseFloat(infoCobro.descuento) | 0;
	costoEnvio = parseInt(infoCobro.costoEnvio) | 0;
	total = parseFloat(infoCobro.total) | 0;

	const rowTipoEnvio = document.createElement('tr')
	rowTipoEnvio.innerHTML =
		`<td class="col-1">
				Tipo de envío
			</td>
            <td class="text-end col-11 align-middle">
				${tipoEnvio}
			</td>`

	const rowSubtotal = document.createElement('tr')
	rowSubtotal.innerHTML =
		`<td class="col-1">
				Subtotal
			</td>
			<td class="text-end col-11 align-middle">
				₡ ${subtotal}
			</td>`
	const rowDescuento = document.createElement('tr')
	rowDescuento.innerHTML =
		`<td class="col-1">
				Descuento
			</td>
			<td class="text-end col-11 align-middle">
				₡ ${descuento}
			</td>`


	const rowCostoEnvio = document.createElement('tr')
	rowCostoEnvio.innerHTML =
		`<td class="col-1">
				Costo de envío
			</td>
            <td class="text-end col-11 align-middle">
				₡ ${costoEnvio}
			</td>`


	const rowTotal = document.createElement('tr')
	rowTotal.innerHTML =
		`<td class="col-1">
				Total
			</td>
			<td class="text-end col-11 align-middle">
				₡ ${total}
			</td>`

	factura.appendChild(rowTipoEnvio)
	factura.appendChild(rowSubtotal)
	factura.appendChild(rowDescuento)
	factura.appendChild(rowCostoEnvio)
	factura.appendChild(rowTotal)

	precio = parseFloat(infoPago.precio) | 0;
	cantidad = parseInt(infoPago.cantidad) | 0;
	subtotal = precio * cantidad

	const rowTarjeta = document.createElement('tr')
	rowTarjeta.innerHTML =
		`<td class="col-1">
				Medio de pago
			</td>
			<td class="text-end col-11 align-middle">
				${tipoTajeta}
			</td>`

	factura.appendChild(rowTarjeta)

	reiniciarProcesoCompra()
}

// Limpir el proceso
function reiniciarProcesoCompra() {
	localStorage.removeItem('compra')
	localStorage.removeItem('cobro')
	localStorage.removeItem('medioPago')
	actualizarSubtotal()
	mostrarCarrito()

	document.getElementById("cardForm").reset()
}


