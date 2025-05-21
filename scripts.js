document.addEventListener('DOMContentLoaded', () => {
    // Función para scroll suave a secciones
    const smoothScroll = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - (document.querySelector('.site-header')?.offsetHeight || 0),
                behavior: 'smooth'
            });
        }
    };

    // Asignar scroll suave a todos los enlaces de navegación
    document.querySelectorAll('.main-nav a, .site-logo, .btn-primary').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Animación Fade-in al hacer scroll
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -80px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Actualizar el año en el footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Lógica de Modo Oscuro/Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sol para cambiar a claro
            themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        } else { // light mode
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Luna para cambiar a oscuro
            themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    };

    // 1. Cargar el tema guardado en localStorage o usar la preferencia del sistema
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        applyTheme(savedTheme); // Aplicar el tema guardado
    } else {
        // CAMBIO CLAVE AQUÍ: Si no hay tema guardado, aplicamos 'light' por defecto
        // Y luego verificamos la preferencia del sistema para el icono inicial
        applyTheme('light');
        if (prefersDarkMode.matches) {
            // Si el sistema prefiere oscuro, mostramos el sol, pero la página estará en claro
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Si el sistema prefiere claro, mostramos la luna
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }


    // 2. Escuchar cambios en la preferencia del sistema (si el usuario cambia en la configuración de su OS)
    prefersDarkMode.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Solo si el usuario NO ha forzado un tema manualmente
            // Aquí decidiríamos si seguir la preferencia del sistema,
            // pero como el usuario quiere CLARO por defecto, esta parte se comporta diferente.
            // Si no hay tema guardado, la página siempre inicia en claro,
            // pero el ícono del botón debe reflejar si el sistema sugiere oscuro.
            applyTheme('light'); // La página permanece en claro
            if (e.matches) { // Si el sistema cambia a oscuro
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Muestra sol (para cambiar a claro)
            } else { // Si el sistema cambia a claro
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Muestra luna (para cambiar a oscuro)
            }
        }
    });

    // 3. Alternar tema al hacer click en el botón
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            } else {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});