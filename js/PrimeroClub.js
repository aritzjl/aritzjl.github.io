// Espera a que se cargue el contenido de la página
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el parámetro 'clubInfo' de la URL
    const params = new URLSearchParams(window.location.search);
    const clubInfoJSON = params.get('clubInfo');

    // Преобразует JSON в объект
    const clubInfo = JSON.parse(decodeURIComponent(clubInfoJSON));

    // Отображает информацию о клубе
    document.getElementById('codEq').textContent = clubInfo.codEq;
    document.getElementById('nomEq').textContent = clubInfo.nomEq;
    document.getElementById('estadio').textContent = clubInfo.estadio;
    document.getElementById('presEq').textContent = clubInfo.presEq;
    document.getElementById('cantSocios').textContent = clubInfo.cantSocios;
});