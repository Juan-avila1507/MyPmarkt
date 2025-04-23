/* --- Smooth Scroll --- */
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        // Considerar el alto del header fijo si existe y es opaco
        const headerOffset = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 15; // 15px extra de espacio

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    } else {
        console.warn(`Element with ID "${id}" not found.`);
    }
}


/* --- Carrusel Automático (Control Básico y Preparación para Futuro) --- */
const slider = document.querySelector('.slider-imagenes');

// Pausar animación CSS al pasar el ratón (ya hecho en CSS con :hover)
// Si quisieras controles más complejos (botones, etc.), los añadirías aquí.
// Ejemplo:
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// let currentIndex = 0;
// const slides = document.querySelectorAll('.slide');
// const totalSlides = slides.length;
// const slideWidth = slides[0]?.offsetWidth; // Obtener ancho del slide dinámicamente

// function updateCarousel() {
//     if (slider && slideWidth) {
//        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//        slider.style.transition = 'transform 0.5s ease-in-out'; // Añadir transición JS si controlas el movimiento aquí
//     }
// }

// nextBtn?.addEventListener('click', () => {
//      currentIndex = (currentIndex + 1) % totalSlides; // Simple loop
//      updateCarousel();
// });

// prevBtn?.addEventListener('click', () => {
//      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Simple loop
//      updateCarousel();
// });

// Auto-play con JS (alternativa a la animación CSS pura):
/*
let autoPlayInterval;
function startAutoPlay() {
     autoPlayInterval = setInterval(() => {
         currentIndex = (currentIndex + 1) % totalSlides;
         updateCarousel();
     }, 4000); // Cambiar cada 4 segundos
}
function stopAutoPlay() {
     clearInterval(autoPlayInterval);
}
slider?.addEventListener('mouseenter', stopAutoPlay);
slider?.addEventListener('mouseleave', startAutoPlay);
startAutoPlay(); // Iniciar al cargar
*/


/* --- Animaciones de Entrada al Hacer Scroll (Fade-in) --- */
document.addEventListener('DOMContentLoaded', () => {
    const fadeElems = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // Relativo al viewport
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando al menos el 10% del elemento es visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: Dejar de observar una vez que la animación ocurrió
                // observer.unobserve(entry.target);
            } else {
                 // Opcional: Remover la clase si sale de vista (para re-animar al volver a scrollear)
                 // entry.target.classList.remove('visible');
            }
        });
    };

    const fadeInObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElems.forEach(elem => {
        fadeInObserver.observe(elem);
    });


    /* --- Actualizar año en Footer --- */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

     /* --- Opcional: Cambiar estilo del header al hacer scroll --- */
    // const header = document.querySelector('header');
    // window.addEventListener('scroll', () => {
    //    if (window.scrollY > 50) { // Si se scrollea más de 50px
    //        document.body.classList.add('scrolled');
    //    } else {
    //        document.body.classList.remove('scrolled');
    //    }
    // });

}); // Fin de DOMContentLoaded