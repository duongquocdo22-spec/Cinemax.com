// CineMax Main JavaScript
// Dùng cho: tuyết rơi (và các chức năng chung khác)
// Phần JS của trang phim đã được tách ra thành file phim.js

window.addEventListener('DOMContentLoaded', () => {
    console.log('CineMax loaded');

    // Phần tuyết rơi (chung cho toàn site)
    const container = document.querySelector('.snow-container');

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * window.innerWidth + 'px';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
        container.appendChild(snowflake);
        setTimeout(() => snowflake.remove(), 8000);
    }

    if (container) {
        setInterval(createSnowflake, 200);
    }
});
