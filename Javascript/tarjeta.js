document.getElementById('numeroTarjeta').addEventListener('input', function() {
  let numeroTarjeta = document.getElementById('numeroTarjeta').value

//Página de BIN de bancos en Costa Rica https://bincheck.org/costa-rica?page=1
//BIN MASTERCARD BANCO DE COSTA RICA: 510209
//BIN VISA BANCO DE COSTA RICA: 410372


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
  
})
  


//   
//     const numeroTarjeta = this.value.replace(/\s+/g, ''); // Eliminamos espacios del número de tarjeta
//     const bin = numeroTarjeta.slice(0, 6); 
  
//     if (numeroTarjeta.length >= 6) {
   
//       fetch('https://data.handyapi.com/bin/535316', {
//                                                        mode:"no-cors",
//                                                        headers: {
//                                                         'Content-Type': 'application/json'
//                                                       }
                                                    
//                                                      }) 
//       //fetch(https://data.handyapi.com/bin/${bin})
//         .then(response => console.log(response))
//         .then(datos => {
//           let imagenTarjeta = '';
  
//           if (datos.brand === 'VISA') { 
//              imagenTarjeta = '../Images/Proceso - Visa.png';
//           } else if (datos.brand === 'MASTERCARD') {
//             imagenTarjeta = '../Images/Proceso - Mastercard.png';
//           } else {
//             imagenTarjeta = ''; 
//           }
  
//           // Actualiza la fuente de la imagen
//           document.getElementById('imagenTarjeta').src = imagenTarjeta;
  
//           // Muestra en la consola el tipo de tarjeta
//           console.log('Tipo de tarjeta:', datos.brand);
  
//         })
//         .catch(error => {
//           console.error('Error:', error);
//           document.getElementById('imagenTarjeta').src = '';
//         });
//     } else {
//       document.getElementById('imagenTarjeta').src = ''; // Limpia la imagen si el número de tarjeta es demasiado corto
//     }