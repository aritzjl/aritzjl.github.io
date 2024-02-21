// Объявление переменной Dismiss (предполагается, что это некоторая пользовательская функция или библиотека)
const Dismiss = window.Dismiss; // Предположим, что Dismiss - глобальная переменная

// Функция для открытия модального окна политики конфиденциальности
function openPrivacyPolicyModal() {
    const modal = document.getElementById('default-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

// Функция для открытия модального окна "Nosotros"
function openNosotrosModal() {
    const modal = document.getElementById('nosotros-modal');
    modal.classList.remove('hidden');
}

// Функция для открытия модального окна "Contacto"
function openContactoModal() {
    const modal = document.getElementById('contacto-modal');
    modal.classList.remove('hidden');
}

// Получение кнопок для закрытия модального окна
const closeModalButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');

// Добавление обработчиков событий клика на кнопки для закрытия модального окна
closeModalButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const modal = document.getElementById('default-modal');
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        // Установка фокуса на ссылку политики конфиденциальности после закрытия модального окна
        const privacyPolicyLink = document.querySelector('a[href="#"]');
        if (privacyPolicyLink) {
            privacyPolicyLink.focus();
        }
    });
});

// Когда DOM полностью загружен, выполнить следующие действия
document.addEventListener('DOMContentLoaded', function() {
    // Получение элементов DOM, связанных с модальным окном контактов
    const openContactModal = document.getElementById('openContactModal');
    const closeModalButton = document.querySelector('[data-modal-toggle="crud-modal"]');
    const sendButton = document.getElementById('contactButton');
    const modal = document.getElementById('contacto-modal');
    const notification = document.getElementById('notification');

    // Добавление обработчика событий клика для открытия модального окна контактов
    openContactModal.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.remove('hidden');
    });

    // Добавление обработчика событий клика для закрытия модального окна контактов
    closeModalButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        // Закрытие модального окна с анимацией (предположительно, с использованием Dismiss)
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

    // Добавление обработчика событий клика для кнопки отправки в модальном окне контактов
    sendButton.addEventListener('click', function() {
        modal.classList.add('hidden');
        notification.classList.remove('hidden');
        // Скрытие уведомления через 3 секунды
        setTimeout(function() {
            notification.classList.add('hidden');
        }, 3000); // 3000 миллисекунд = 3 секунды
    });

    // Добавление обработчика событий для закрытия модального окна по нажатию клавиши Escape
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
// Назначение обработчика события на кнопку "Nosotros"
document.querySelector('a[href="#nosotros"]').addEventListener('click', function(e) {
    e.preventDefault(); // Предотвращает стандартное поведение ссылки
    openNosotrosModal(); // Ваша функция для открытия модального окна "Nosotros"
    return false; // Предотвращает прокрутку страницы и обновление
  });
  
  // Назначение обработчика события на кнопку "Politica de privacidad"
  document.querySelector('a[href="#politica"]').addEventListener('click', function(e) {
    e.preventDefault(); // Предотвращает стандартное поведение ссылки
    openPrivacyPolicyModal(); // Ваша функция для открытия модального окна Politica de privacidad
    return false; // Предотвращает прокрутку страницы и обновление
  });
  
  // Назначение обработчика события на кнопку "Contacto"
  document.querySelector('a[href="#contacto"]').addEventListener('click', function(e) {
    e.preventDefault(); // Предотвращает стандартное поведение ссылки
    openContactoModal(); // Ваша функция для открытия модального окна "Contacto"
    return false; // Предотвращает прокрутку страницы и обновление
  });
});
