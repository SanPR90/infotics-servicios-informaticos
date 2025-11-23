const enlaces = document.querySelectorAll('.seccion-menu nav ul li a');
const urlActual = window.location.pathname;

enlaces.forEach(enlace => {
    if (urlActual.includes(enlace.getAttribute('href'))) {
        enlace.parentElement.classList.add('activo');
    }
});
