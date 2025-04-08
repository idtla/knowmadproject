class HeadTags extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Obtener el head del documento
        const head = document.head;
        
        // Definir las etiquetas que queremos insertar
        const tags = `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="Knowmad - Soluciones digitales innovadoras">
            <meta name="keywords" content="desarrollo web, marketing digital, SEO, diseño web">
            
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:url" content="https://knowmad.es/">
            <meta property="og:title" content="Knowmad - Soluciones Digitales">
            <meta property="og:description" content="Knowmad - Soluciones digitales innovadoras">
            <meta property="og:image" content="https://knowmad.es/images/og-image.jpg">

            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="https://knowmad.es/">
            <meta property="twitter:title" content="Knowmad - Soluciones Digitales">
            <meta property="twitter:description" content="Knowmad - Soluciones digitales innovadoras">
            <meta property="twitter:image" content="https://knowmad.es/images/og-image.jpg">

            <!-- Favicon -->
            <link rel="icon" type="image/x-icon" href="images/logo/favicon.ico">
            <link rel="shortcut icon" type="image/x-icon" href="images/logo/favicon.ico">
        `;

        // Insertar las etiquetas en el head
        head.insertAdjacentHTML('beforeend', tags);
    }
}

// Registrar el componente
customElements.define('head-tags', HeadTags); 