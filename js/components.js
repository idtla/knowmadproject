// Importar los componentes
import '../components/head-tags/head-tags.js';
import '../components/header/header.js';
import '../components/footer/footer.js';

// Función para inicializar los componentes en la página
function initializeComponents() {
    // Añadir el componente head-tags
    document.head.appendChild(document.createElement('head-tags'));
    
    // Añadir el componente header al principio del body
    const header = document.createElement('header-component');
    document.body.insertBefore(header, document.body.firstChild);
    
    // Añadir el componente footer al final del body
    const footer = document.createElement('footer-component');
    document.body.appendChild(footer);
}

// Inicializar los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeComponents); 