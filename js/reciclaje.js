$(document).ready(function () {
    // Cargar el header
    $.ajax({
        url: 'header.html',
        type: 'GET',
        success: function (data) {
            $('#header-container').html(data); // Corregido aquí
        }
    });

    // Cargar los modals
    $.ajax({
        url: 'modals.html',
        type: 'GET',
        success: function (data) {
            $('#modals-container').html(data); // Corregido aquí
        }
    });

    // Cargar el footer
    $.ajax({
        url: 'footer.html',
        type: 'GET',
        success: function (data) {
            $('#footer-container').html(data); // Corregido aquí
        }
    });
});
