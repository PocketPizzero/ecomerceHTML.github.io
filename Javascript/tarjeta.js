document.getElementById('numeroTarjeta').addEventListener('input', function() {
    const numeroTarjeta = this.value.replace(/\s+/g, ''); // Eliminamos espacios del número de tarjeta
    const bin = numeroTarjeta.slice(0, 6); 
  
    if (numeroTarjeta.length >= 6) {
      // Consulta a la API de HandyAPI con el BIN
      fetch('https://data.handyapi.com/bin/535316') //fetch(`https://data.handyapi.com/bin/${bin}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
          let imagenTarjeta = '';
  
          if (datos.brand === 'VISA') { 
             imagenTarjeta = '../Images/Proceso - Visa.png';
          } else if (datos.brand === 'MASTERCARD') {
            imagenTarjeta = '../Images/Proceso - Mastercard.png';
          } else {
            imagenTarjeta = ''; 
          }
  
          // Actualiza la fuente de la imagen
          document.getElementById('imagenTarjeta').src = imagenTarjeta;
  
          // Muestra en la consola el tipo de tarjeta
          console.log('Tipo de tarjeta:', datos.brand);
  
        })
        .catch(error => {
          console.error('Error:', error);
          document.getElementById('imagenTarjeta').src = '';
        });
    } else {
      document.getElementById('imagenTarjeta').src = ''; // Limpia la imagen si el número de tarjeta es demasiado corto
    }
  });
  