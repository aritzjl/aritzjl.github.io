function openPrivacyPolicyModal() {
    const modal = document.getElementById('default-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

// Obtener los botones de cerrar el modal
const closeModalButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');

// Agregar eventos de clic a los botones de cerrar el modal
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const modal = document.getElementById('default-modal');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        const privacyPolicyLink = document.querySelector('a[href="#"]');
        privacyPolicyLink.focus();
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const openContactModal = document.getElementById('openContactModal');
    const closeModalButton = document.querySelector('[data-modal-toggle="crud-modal"]');
    const sendButton = document.getElementById('contactButton');
    const modal = document.getElementById('contacto-modal');
    const notification = document.getElementById('notification');

    openContactModal.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('hidden');
    });

    closeModalButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        const options = {
            transition: 'transition-opacity',
            duration: 300,
            timing: 'ease-out'
        };
        const dismiss = new Dismiss(modal, closeModalButton, options);
        dismiss.hide();
    });

    sendButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        notification.classList.remove('hidden');
        // Oculta la notificación después de 3 segundos
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 3000); // 3000 milisegundos = 3 segundos
    });
});
