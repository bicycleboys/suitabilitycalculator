document.addEventListener('DOMContentLoaded', function () {
    const path = window.decodeURIComponent(window.location.pathname);
    const page = path === '/' ? 'view1' : path.slice(1);
    console.log(page);
})