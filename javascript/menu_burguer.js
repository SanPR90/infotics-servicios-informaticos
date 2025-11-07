
    // 1. Selecciona el botón y el menú (con nombres en castellano)
    const menuAlternador = document.querySelector('.menu-alternador');
    const enlacesNavegacion = document.getElementById('menu-principal'); // Usamos el nuevo ID

    // 2. Define la función de alternar
    menuAlternador.addEventListener('click', function() {
        // Alterna la clase 'activo' en la lista de enlaces
        enlacesNavegacion.classList.toggle('activo'); // ANTES: .active
        
        // Actualiza el atributo ARIA para accesibilidad
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Cambia el icono de hamburguesa a una 'X'
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });