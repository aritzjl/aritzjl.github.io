// Función para abrir el modal de la política de privacidad
function openPrivacyPolicyModal() {
    const modal = document.getElementById('default-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

// Obtener los botones para cerrar el modal
const closeModalButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');

// Agregar eventos de clic a los botones para cerrar el modal
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const modal = document.getElementById('default-modal');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        // Enfocar enlace de política de privacidad después de cerrar el modal
        const privacyPolicyLink = document.querySelector('a[href="#"]');
        privacyPolicyLink.focus();
    });
});

// Cuando el DOM esté completamente cargado, realizar las siguientes acciones
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM relacionados con el modal de contacto
    const openContactModal = document.getElementById('openContactModal');
    const closeModalButton = document.querySelector('[data-modal-toggle="crud-modal"]');
    const sendButton = document.getElementById('contactButton');
    const modal = document.getElementById('contacto-modal');
    const notification = document.getElementById('notification');

    // Agregar evento de clic para abrir el modal de contacto
    openContactModal.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('hidden');
    });

    // Agregar evento de clic para cerrar el modal de contacto
    closeModalButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        // Configurar las opciones de animación para ocultar el modal
        const options = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out'
        };
        // Utilizar una biblioteca o método (Dismiss) para ocultar el modal con opciones
        const dismiss = new Dismiss(modal, closeModalButton, options);
        dismiss.hide();
    });

    // Agregar evento de clic para el botón de enviar en el modal de contacto
    sendButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        notification.classList.remove('hidden');
        // Ocultar la notificación después de 3 segundos
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 3000); // 3000 milisegundos = 3 segundos
    });
});
