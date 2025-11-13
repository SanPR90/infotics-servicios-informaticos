
        // Opción 1: Usando la clase 'loaded' para controlar la visibilidad con CSS (más limpia)
        window.addEventListener('load', function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                // Añade la clase 'loaded' al cuerpo de la página
                // o directamente al preloader
                preloader.classList.add('loaded'); 
                
                // Opcional: Después de una transición, quítalo del DOM (menos recomendado)
                // setTimeout(() => preloader.remove(), 500); 
            }
        });
        
        // Opción 2: El método de 'opacity' (el que usamos antes)
        /*
        window.onload = function() {
            document.querySelector('.preloader').style.opacity = '0';
            setTimeout(function(){
                document.querySelector('.preloader').style.display = 'none';
            }, 500); // 500ms o el tiempo de transición que elijas
        };
        */