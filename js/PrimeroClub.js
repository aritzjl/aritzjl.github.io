// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el parámetro 'clubInfo' de la URL
    const params = new URLSearchParams(window.location.search);
    const clubInfoJSON = params.get('clubInfo');

    // Преобразует JSON в объект
    const clubInfo = JSON.parse(decodeURIComponent(clubInfoJSON));

    // Отображает информацию о клубе
    document.getElementById('escudo').src = clubInfo.escudo;
    document.getElementById('codigo').textContent = clubInfo.codigo;
    document.getElementById('nombre').textContent = clubInfo.nombre;
    document.getElementById('estadio').textContent = clubInfo.estadio;
    document.getElementById('presidente').textContent = clubInfo.presidente;
    document.getElementById('cantidad').textContent = clubInfo.cantidadSocios;
    document.getElementById('historia').textContent = clubInfo.historia;
});