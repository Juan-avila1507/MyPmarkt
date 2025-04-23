function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`Element with ID "${id}" not found.`); // Advertencia si el ID no existe
    }
}

// Opcional: Añadir más interactividad aquí en el futuro
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // Puedes añadir listeners u otras inicializaciones aquí
});