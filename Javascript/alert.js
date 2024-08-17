// Alerta de compra
const notificacionCompra = document.getElementById('notificacionCompra')

const appendNotificacionCompra = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  notificacionCompra.append(wrapper)
}

const notificacionCompraTrigger = document.getElementById('añadir')
if (notificacionCompraTrigger) {
  notificacionCompraTrigger.addEventListener('click', () => {
    appendNotificacionCompra('Artículo añadido a tu carrito con éxito', 'success')
  })
}
