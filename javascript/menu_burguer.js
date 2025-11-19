document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Alterna clases para abrir/cerrar menú y animar icono 'X'
            navLinks.classList.toggle('open');
            menuToggle.classList.toggle('open');
            // Actualiza aria-expanded dinámicamente según estado
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
        });

        // Cerrar el menú al hacer clic en cualquier enlace (cumple punto 2)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    } else {
        console.error("No se encontraron los elementos del menú (menu-toggle o nav-links).");
    }
});
