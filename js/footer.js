// Supongamos que Dismiss es una función o biblioteca global
const Dismiss = window.Dismiss;

// Función para abrir el modal de política de privacidad
function openPrivacyPolicyModal() {
    const modal = document.getElementById('default-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

// Función para abrir el modal "Nosotros"
function openNosotrosModal() {
    const modal = document.getElementById('nosotros-modal');
    modal.classList.remove('hidden');
}

// Función para abrir el modal "Contacto"
function openContactoModal() {
    const modal = document.getElementById('contacto-modal');
    modal.classList.remove('hidden');
}

// Obtener botones para cerrar el modal
const closeModalButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');

// Agregar manejadores de eventos de clic para cerrar el modal
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const modal = document.getElementById('default-modal');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        // Establecer el foco en el enlace de política de privacidad después de cerrar el modal
        const privacyPolicyLink = document.querySelector('a[href="#"]');
        if (privacyPolicyLink) {
            privacyPolicyLink.focus();
        }
    });
});

// Cuando el DOM se carga completamente, realizar las siguientes acciones
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM relacionados con el modal de contacto
    const openContactModal = document.getElementById('openContactModal');
    const closeModalButton = document.querySelector('[data-modal-toggle="crud-modal"]');
    const sendButton = document.getElementById('contactButton');
    const modal = document.getElementById('contacto-modal');
    const notification = document.getElementById('notification');

    // Agregar manejador de eventos de clic para abrir el modal de contacto
    openContactModal.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('hidden');
    });

    // Agregar manejador de eventos de clic para cerrar el modal de contacto
    closeModalButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        // Cerrar el modal con animación (presumiblemente usando Dismiss)
        if (Dismiss) {
            const options = {
                transition: 'transition-opacity',
                duration: 300,
                timing: 'ease-out'
            };
            const dismiss = new Dismiss(modal, closeModalButton, options);
            dismiss.hide();
        }
    });

    // Agregar manejador de eventos de clic para el botón de enviar en el modal de contacto
    sendButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        notification.classList.remove('hidden');
        // Ocultar la notificación después de 3 segundos
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 3000); // 3000 milisegundos = 3 segundos
    });

    // Agregar manejador de eventos para cerrar el modal al presionar la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('default-modal');
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            const privacyPolicyLink = document.querySelector('a[href="#"]');
            if (privacyPolicyLink) {
                privacyPolicyLink.focus();
            }
        }
    });

    // Asignar manejador de eventos al botón "Nosotros"
    document.querySelector('a[href="#nosotros"]').addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamiento estándar del enlace
        openNosotrosModal(); // Llamar a la función para abrir el modal "Nosotros"
        return false; // Prevenir desplazamiento y recarga de la página
    });

    // Asignar manejador de eventos al botón "Politica de privacidad"
    document.querySelector('a[href="#politica"]').addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamiento estándar del enlace
        openPrivacyPolicyModal(); // Llamar a la función para abrir el modal de política de privacidad
        return false; // Prevenir desplazamiento y recarga de la página
    });

    // Asignar manejador de eventos al botón "Contacto"
    document.querySelector('a[href="#contacto"]').addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir comportamiento estándar del enlace
        openContactoModal(); // Llamar a la función para abrir el modal "Contacto"
        return false; // Prevenir desplazamiento y recarga de la página
    });
});
