class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const isEnglish = window.location.pathname.startsWith('/en/');
        const isBlog = window.location.pathname.includes('blog.html');
        const basePath = isEnglish ? '../' : '';
        
        // Determinar las rutas para los selectores de idioma
        const spanishPath = isBlog ? '/blog.html' : '/';
        const englishPath = isBlog ? '/en/blog.html' : '/en/';
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                /* Estilos base */
                :host {
                    display: block;
                    width: 100%;
                }

                .navbar {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1240px;
                    z-index: 1000;
                    padding: 0 20px;
                }

                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--nav-background, rgba(255, 255, 255, 0.95));
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-radius: 24px;
                    padding: 12px 25px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    position: relative;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    width: 33.33%;
                }

                .nav-logo {
                    width: auto;
                    height: 36px;
                    object-fit: contain;
                    border-radius: 0;
                    background-color: transparent;
                    padding: 0;
                }

                .nav-logo-text {
                    height: 24px;
                    margin-left: 10px;
                    transition: filter 0.3s ease;
                }

                .nav-menu {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    width: auto;
                    justify-content: center;
                    white-space: nowrap;
                }

                .nav-item {
                    display: inline-block;
                    margin: 0 10px;
                }

                .nav-item a {
                    color: var(--primary-color, #333);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    padding: 5px 10px;
                    border-radius: 12px;
                }

                .nav-item a:hover {
                    color: var(--secondary-color, #007bff);
                    background-color: rgba(42, 157, 143, 0.1);
                }

                .controls-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .language-switch {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .language-switch img {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: transform 0.2s ease;
                }

                .language-switch img:hover {
                    transform: scale(1.1);
                }

                .theme-switch {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    color: var(--primary-color, #333);
                    transition: all 0.2s ease;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .theme-switch:hover {
                    background-color: rgba(42, 157, 143, 0.1);
                }

                .theme-switch i {
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                }

                .theme-switch .fa-sun {
                    color: #ffd43b;
                }

                :host-context(.dark-mode) .nav-container {
                    background-color: rgba(30, 30, 30, 0.95);
                }

                :host-context(.dark-mode) .nav-item a {
                    color: #fff;
                }

                :host-context(.dark-mode) .theme-switch {
                    color: #fff;
                }

                :host-context(.dark-mode) .nav-item a:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                :host-context(.dark-mode) .nav-logo-text {
                    filter: brightness(0) invert(1);
                }

                /* Ajustes para tablet y dispositivos medianos */
                @media (max-width: 1240px) {
                    .navbar {
                        width: 100%;
                        top: 0;
                        padding: 10px;
                    }

                    .nav-container {
                        border-radius: 0;
                    }
                    
                    .nav-menu {
                        position: static;
                        transform: none;
                        width: auto;
                        justify-content: center;
                    }
                }

                /* Ajustes específicos para resoluciones problemáticas */
                @media (max-width: 1024px) {
                    .nav-menu {
                        flex-wrap: wrap;
                        justify-content: center;
                        padding: 5px 0;
                        gap: 0;
                    }
                    
                    .nav-item {
                        margin: 5px 5px;
                    }
                    
                    .nav-item a {
                        font-size: 0.9rem;
                        padding: 4px 8px;
                    }
                }

                /* Solución específica para móviles alrededor de 770px */
                @media (max-width: 800px) and (min-width: 769px) {
                    .nav-container {
                        flex-direction: column;
                        padding: 10px;
                    }
                    
                    .logo-container {
                        margin-bottom: 5px;
                        width: auto;
                    }
                    
                    .nav-menu {
                        display: flex;
                        flex-wrap: nowrap;
                        width: 100%;
                        padding: 0;
                        gap: 0;
                    }
                    
                    .nav-item {
                        margin: 2px;
                    }
                    
                    .nav-item a {
                        font-size: 0.8rem;
                        padding: 3px 5px;
                    }
                    
                    .controls-container {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }
                }

                @media (max-width: 768px) {
                    .navbar {
                        width: 100%;
                        top: 0;
                        padding: 0;
                    }

                    .nav-container {
                        border-radius: 0;
                        flex-direction: column;
                        padding: 10px;
                    }
                    
                    .logo-container {
                        width: auto;
                        margin-bottom: 8px;
                    }

                    .nav-menu {
                        position: static;
                        transform: none;
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        justify-content: center;
                        padding: 0;
                        gap: 0;
                    }
                    
                    .nav-item {
                        margin: 4px;
                    }
                    
                    .nav-item a {
                        font-size: 0.9rem;
                        padding: 3px 6px;
                    }
                    
                    .controls-container {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .nav-item {
                        margin: 3px;
                    }
                    
                    .nav-item a {
                        font-size: 0.8rem;
                        padding: 3px 5px;
                    }
                    
                    .language-switch img {
                        width: 20px;
                        height: 20px;
                    }
                    
                    .theme-switch {
                        width: 30px;
                        height: 30px;
                    }
                    
                    .theme-switch i {
                        font-size: 1rem;
                    }
                    
                    .controls-container {
                        gap: 8px;
                    }
                }
            </style>

            <nav class="navbar">
                <div class="nav-container">
                    <div class="logo-container">
                        <a href="${isEnglish ? '/en/' : '/'}">
                            <img src="/images/logo/favicon.png" alt="Knowmad Logo" class="nav-logo">
                        </a>
                        <a href="${isEnglish ? '/en/' : '/'}">
                            <img src="/images/logo/logo-text.png" alt="Knowmad Project" class="nav-logo-text">
                        </a>
                    </div>
                    <ul class="nav-menu">
                        <li class="nav-item"><a href="${isEnglish ? '#about-us' : '#quienes-somos'}">${isEnglish ? 'About Us' : 'Quiénes Somos'}</a></li>
                        <li class="nav-item"><a href="${isEnglish ? '#services' : '#servicios'}">${isEnglish ? 'Services' : 'Servicios'}</a></li>
                        <li class="nav-item"><a href="${isEnglish ? '#products' : '#productos'}">${isEnglish ? 'Products' : 'Productos'}</a></li>
                        <li class="nav-item"><a href="${isEnglish ? '#community' : '#comunidad'}">${isEnglish ? 'Community' : 'Comunidad'}</a></li>
                        <li class="nav-item"><a href="#blog">Blog</a></li>
                    </ul>
                    <div class="controls-container">
                        <div class="language-switch">
                            <a href="${spanishPath}" title="Español">
                                <img src="/images/lang/espanol.png" alt="Español" id="spanishFlag">
                            </a>
                            <a href="${englishPath}" title="English">
                                <img src="/images/lang/usa_en.png" alt="English" id="englishFlag">
                            </a>
                        </div>
                        <button class="theme-switch" id="themeSwitch" aria-label="Cambiar tema">
                            <i class="fas fa-moon"></i>
                        </button>
                    </div>
                </div>
            </nav>
        `;

        // Manejar el cambio de tema
        const themeSwitch = this.shadowRoot.querySelector('#themeSwitch');
        const icon = themeSwitch.querySelector('i');
        
        // Verificar el tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        themeSwitch.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
            
            // Guardar preferencia
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Actualizar la visibilidad de las banderas según la página actual
        const spanishFlag = this.shadowRoot.querySelector('#spanishFlag');
        const englishFlag = this.shadowRoot.querySelector('#englishFlag');

        if (isEnglish) {
            spanishFlag.style.display = 'block';
            englishFlag.style.display = 'none';
        } else {
            spanishFlag.style.display = 'none';
            englishFlag.style.display = 'block';
        }
    }
}

// Registrar el componente
customElements.define('header-component', HeaderComponent); 