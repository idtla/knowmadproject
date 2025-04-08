class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                footer {
                    background: var(--footer-bg, #f8f9fa);
                    padding: 2rem 0;
                    text-align: center;
                    margin-top: 4rem;
                }

                footer p {
                    margin: 0;
                    color: var(--footer-text-color, #666);
                    font-size: 0.9rem;
                }

                footer a {
                    color: var(--footer-link-color, #007bff);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                footer a:hover {
                    color: var(--footer-link-hover-color, #0056b3);
                }

                :host-context(.dark-mode) footer {
                    background: var(--dark-bg, #1a1a1a);
                }

                :host-context(.dark-mode) footer p {
                    color: var(--dark-text, #e1e1e1);
                }

                :host-context(.dark-mode) footer a {
                    color: var(--dark-link, #3d9e8c);
                }

                :host-context(.dark-mode) footer a:hover {
                    color: var(--dark-link-hover, #2a9d8f);
                }
            </style>

            <footer>
                <p>© ${new Date().getFullYear()} Knowmad Project - Tecnología que entiende personas - <a href="mailto:hola@knowmadproject.com">hola@knowmadproject.com</a></p>
            </footer>
        `;
    }
}

// Registrar el componente
customElements.define('footer-component', FooterComponent); 