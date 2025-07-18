document.addEventListener('DOMContentLoaded', function() {
    // Configuración personalizable
    const CONFIGURACION = {
        // Duración de cada slide de productos en milisegundos (1000ms = 1 segundo)
        DURACION_SLIDES_PRODUCTOS: 1000,
        // Opacidad del fondo del vídeo del encabezado
        OPACIDAD_VIDEO_HEADER: 0.4
    };

    // Funcionalidad del dropdown de envío
    const sendDropdownBtn = document.getElementById('sendDropdownBtn');
    const sendDropdownContent = document.getElementById('sendDropdownContent');
    const contactName = document.getElementById('contactName');
    const contactMessage = document.getElementById('contactMessage');

    if (sendDropdownBtn && sendDropdownContent) {
        // Toggle del dropdown
        sendDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendDropdownBtn.classList.toggle('active');
            sendDropdownContent.classList.toggle('active');
        });

        // Cerrar el dropdown cuando se hace clic fuera
        document.addEventListener('click', function(e) {
            if (!sendDropdownBtn.contains(e.target) && !sendDropdownContent.contains(e.target)) {
                sendDropdownBtn.classList.remove('active');
                sendDropdownContent.classList.remove('active');
            }
        });

        // Función para generar el mensaje formateado
        function generateMessage() {
            if (!contactName || !contactMessage) return null;
            
            const name = contactName.value.trim();
            const message = contactMessage.value.trim();
            
            if (!name || !message) {
                alert('Por favor, completa todos los campos');
                return null;
            }
            
            return `Hola, mi nombre es ${name}, escribo a Knowmad Project por que tengo interés en recibir información, te cuento:\n\n${message}`;
        }

        // Manejar los clics en las opciones
        const sendOptions = document.querySelectorAll('.send-option');
        sendOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const message = generateMessage();
                if (!message) return;

                let url = '';
                if (this.id === 'sendTelegram') {
                    url = `https://t.me/kNowmad_contactbot?text=${encodeURIComponent(message)}`;
                } else if (this.id === 'sendWhatsapp') {
                    url = `https://wa.me/34623961924?text=${encodeURIComponent(message)}`;
                } else if (this.id === 'sendEmail') {
                    url = `mailto:hola@knowmadproject.com?subject=Contacto desde web&body=${encodeURIComponent(message)}`;
                }

                window.open(url, '_blank');
                sendDropdownBtn.classList.remove('active');
                sendDropdownContent.classList.remove('active');
            });
        });
    }

    // Efecto de escala en imágenes
    const featureImages = document.querySelectorAll('.feature-image img');
    
    featureImages.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Cambio de tema
    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        const themeSwitchIcon = themeSwitch.querySelector('i');
        
        // Verificar el tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            if (themeSwitchIcon) {
                themeSwitchIcon.classList.remove('fa-moon');
                themeSwitchIcon.classList.add('fa-sun');
            }
        }
        
        themeSwitch.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark-mode');
            if (themeSwitchIcon) {
                themeSwitchIcon.classList.toggle('fa-moon');
                themeSwitchIcon.classList.toggle('fa-sun');
            }
            
            // Guardar preferencia
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // Efecto de hover para las secciones de características
    const featureSections = document.querySelectorAll('.feature-section');
    
    featureSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Efecto de hover para las tarjetas pequeñas
    const smallCards = document.querySelectorAll('.small-card');
    smallCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.small-card-img img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.small-card-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Botón "Ver más"
    const seeMoreBtn = document.querySelector('.see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function(e) {
            // Si es un enlace, permitir la navegación normal (no hacer nada aquí)
            if (this.tagName === 'A' && this.hasAttribute('href')) {
                return; // Permitir comportamiento normal del enlace
            }
            // Solo mostrar alerta si no es un enlace
            alert('Se cargarían más características de Knowmad Project');
        });
    }

    // Botones "Explorar"
    const exploreBtns = document.querySelectorAll('.explore-btn');
    exploreBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Solo prevenir el comportamiento predeterminado si el enlace es "#"
            if (this.getAttribute('href') === "#") {
                e.preventDefault();
            }
            // Eliminamos la alerta (modal)
            // No mostramos ningún alert
        });
    });

    // Animación del carrusel de clientes
    const clientLogos = document.querySelector('.client-logos');
    if (clientLogos) {
        const clientItems = document.querySelectorAll('.client-item');
        
        // Función para aplicar un ligero efecto de flotación a los logos
        function animateClients() {
            clientItems.forEach((item, index) => {
                // Aplicamos diferentes delays para crear un efecto ondulado
                const delay = index * 0.3;
                item.style.animationDelay = `${delay}s`;
                item.classList.add('floating');
            });
        }
        
        // Inicializamos la animación cuando el elemento entra en el viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateClients();
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(clientLogos);
    }

    // Animación de la sección de productos
    const productsModule = document.querySelector('.products-module');
    if (productsModule) {
        const productSlides = document.querySelectorAll('.product-slide');
        const slideDuration = CONFIGURACION.DURACION_SLIDES_PRODUCTOS; // Duración en milisegundos para cada slide
        let activeSlideIndex = 0;
        let progressInterval;
        let progressValue = 0;
        const progressStep = 20; // Aumentar el progreso en 2% cada 100ms

        // Inicializar la función para manejar el slide activo
        function initProductSlider() {
            // Asegurar que solo el primer slide esté activo inicialmente
            productSlides.forEach((slide, index) => {
                if (index === 0) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Agregar event listeners para el clic en los encabezados
            productSlides.forEach((slide, index) => {
                const header = slide.querySelector('.product-header');
                header.addEventListener('click', () => {
                    // Detener la progresión automática
                    resetProgressBar();
                    clearInterval(progressInterval);
                    
                    // Activar el slide clickeado
                    activeSlideIndex = index;
                    activateSlide(activeSlideIndex);
                    
                    // Reiniciar la progresión
                    startProgressBar();
                });
            });

            // Iniciar la barra de progreso
            startProgressBar();
        }

        // Activar un slide específico
        function activateSlide(index) {
            productSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                    slide.classList.remove('completed');
                } else {
                    slide.classList.remove('active');
                    if (i < index) {
                        slide.classList.add('completed');
                    } else {
                        slide.classList.remove('completed');
                    }
                }
            });
        }

        // Iniciar la barra de progreso
        function startProgressBar() {
            progressValue = 0;
            const activeSlide = productSlides[activeSlideIndex];
            const progressBar = activeSlide.querySelector('.progress-indicator');
            progressBar.style.height = '0%';
            
            // Actualizar la barra de progreso
            progressInterval = setInterval(() => {
                progressValue += progressStep;
                if (progressValue >= 10000) {
                    // Cuando llegue al 100%, pasar al siguiente slide
                    clearInterval(progressInterval);
                    moveToNextSlide();
                } else {
                    // Actualizar la altura de la barra de progreso
                    progressBar.style.height = (progressValue / 100) + '%';
                }
            }, slideDuration / 50); // 50 pasos para completar la barra
        }

        // Restablecer la barra de progreso actual
        function resetProgressBar() {
            clearInterval(progressInterval);
            productSlides.forEach(slide => {
                const progressBar = slide.querySelector('.progress-indicator');
                progressBar.style.height = '0%';
            });
        }

        // Avanzar al siguiente slide
        function moveToNextSlide() {
            activeSlideIndex = (activeSlideIndex + 1) % productSlides.length;
            activateSlide(activeSlideIndex);
            startProgressBar();
        }

        // Observador para iniciar el slider cuando la sección sea visible
        const productsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        initProductSlider();
                    }, 500);
                    productsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        productsObserver.observe(productsModule);
    }

    // Animación del módulo de comunidad
    const communityModule = document.querySelector('.community-module');
    if (communityModule) {
        // Animación de barras de progreso
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressValues = [85, 90, 75, 95, 80, 92]; // Valores en porcentaje para cada barra
        
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animamos las barras de progreso cuando el módulo es visible
                    setTimeout(() => {
                        progressBars.forEach((bar, index) => {
                            bar.style.width = `${progressValues[index]}%`;
                        });
                    }, 300);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        progressObserver.observe(communityModule);
        
        // Animación de la red de conexiones
        const canvas = document.getElementById('networkCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const nodes = [];
            const connections = [];
            const nodeCount = 20; // Número de nodos
            const connectionCount = 35; // Número de conexiones
            
            // Ajustar tamaño del canvas
            function resizeCanvas() {
                const canvasContainer = canvas.parentElement;
                canvas.width = canvasContainer.offsetWidth;
                canvas.height = canvasContainer.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Crear nodos aleatorios
            function createNodes() {
                for (let i = 0; i < nodeCount; i++) {
                    nodes.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 3 + 2,
                        vx: Math.random() * 0.5 - 0.25,
                        vy: Math.random() * 0.5 - 0.25
                    });
                }
            }
            
            // Crear conexiones aleatorias entre nodos
            function createConnections() {
                for (let i = 0; i < connectionCount; i++) {
                    const nodeA = Math.floor(Math.random() * nodeCount);
                    let nodeB = Math.floor(Math.random() * nodeCount);
                    // Evitar conexiones con el mismo nodo
                    while (nodeB === nodeA) {
                        nodeB = Math.floor(Math.random() * nodeCount);
                    }
                    
                    connections.push({
                        from: nodeA,
                        to: nodeB
                    });
                }
            }
            
            // Dibujar nodos y conexiones
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Dibujar conexiones
                connections.forEach(connection => {
                    const fromNode = nodes[connection.from];
                    const toNode = nodes[connection.to];
                    
                    // Calcular distancia para la opacidad
                    const dx = fromNode.x - toNode.x;
                    const dy = fromNode.y - toNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150; // Distancia máxima para mostrar conexión
                    
                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        
                        ctx.beginPath();
                        ctx.moveTo(fromNode.x, fromNode.y);
                        ctx.lineTo(toNode.x, toNode.y);
                        
                        // Color adaptado al tema
                        if (document.documentElement.classList.contains('dark-mode')) {
                            ctx.strokeStyle = `rgba(61, 158, 140, ${opacity * 0.5})`;
                        } else {
                            ctx.strokeStyle = `rgba(42, 157, 143, ${opacity * 0.4})`;
                        }
                        
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
                
                // Dibujar nodos
                nodes.forEach(node => {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                    
                    // Color adaptado al tema
                    if (document.documentElement.classList.contains('dark-mode')) {
                        ctx.fillStyle = 'rgba(61, 158, 140, 0.7)';
                    } else {
                        ctx.fillStyle = 'rgba(42, 157, 143, 0.7)';
                    }
                    
                    ctx.fill();
                    
                    // Actualizar posición para la animación
                    node.x += node.vx;
                    node.y += node.vy;
                    
                    // Rebote en los bordes
                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                });
                
                requestAnimationFrame(draw);
            }
            
            // Iniciar animación cuando el elemento es visible
            const networkObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        createNodes();
                        createConnections();
                        draw();
                        networkObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            networkObserver.observe(canvas);
        }
    }

    // Función para cargar y aplicar datos del JSON a los posts
    function loadPostsData() {
        fetch('/data/posts.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                updatePostMetadata(data.posts);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para actualizar los metadatos de los posts
    function updatePostMetadata(posts) {
        // Buscar elementos con atributos data-post-id
        const dateElements = document.querySelectorAll('#post-date[data-post-id]');
        const authorElements = document.querySelectorAll('#post-author[data-post-id]');
        const categoryElements = document.querySelectorAll('#post-category[data-post-id]');

        // Actualizar fechas
        dateElements.forEach(element => {
            const postId = element.getAttribute('data-post-id');
            const post = posts.find(p => p.id === postId);
            if (post) {
                // Convertir fecha ISO a formato legible
                const date = new Date(post.date);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                element.textContent = date.toLocaleDateString('es-ES', options);
            }
        });

        // Actualizar autores
        authorElements.forEach(element => {
            const postId = element.getAttribute('data-post-id');
            const post = posts.find(p => p.id === postId);
            if (post) {
                element.textContent = post.author;
            }
        });

        // Actualizar categorías
        categoryElements.forEach(element => {
            const postId = element.getAttribute('data-post-id');
            const post = posts.find(p => p.id === postId);
            if (post) {
                element.textContent = post.category;
            }
        });
    }

    // Cargar datos de posts si estamos en una página de blog
    if (document.querySelector('.blog-post')) {
        loadPostsData();
    }

    // Cargar posts del blog desde JSON en la página principal
    const blogContainer = document.getElementById('blog-posts-container');
    if (blogContainer) {
        // Determinar el idioma actual basado en la URL
        const isEnglishVersion = window.location.pathname.includes('/en/');
        const currentLanguage = isEnglishVersion ? 'en' : 'es';
        
        // Ruta al archivo JSON (relativa a la ubicación de la página)
        const jsonPath = isEnglishVersion ? '../data/posts.json' : 'data/posts.json';
        
        // Cargar posts desde JSON
        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                const allPosts = data.posts;
                // Filtrar los posts por idioma
                const posts = allPosts.filter(post => post.language === currentLanguage);
                
                // Si no hay posts en este idioma, mostrar mensaje
                if (posts.length === 0) {
                    blogContainer.innerHTML = isEnglishVersion ? 
                        '<p class="no-posts-message">No blog posts available in English yet. We\'re working on it!</p>' : 
                        '<p class="no-posts-message">No hay posts de blog disponibles. ¡Estamos trabajando en ello!</p>';
                    return;
                }
                
                // Ordenar posts por fecha descendente (más reciente primero)
                const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // Mostrar solo los 3 posts más recientes
                const recentPosts = sortedPosts.slice(0, 3);
                
                // Limpiar el contenedor
                blogContainer.innerHTML = '';
                
                // Agregar cada post al contenedor
                recentPosts.forEach(post => {
                    const postCard = document.createElement('div');
                    postCard.className = 'small-card';
                    postCard.innerHTML = `
                        <div class="small-card-img">
                            <img src="${isEnglishVersion ? '../' + post.image : post.image}" alt="${post.title}">
                        </div>
                        <h3><a href="${isEnglishVersion ? '../' + post.url : post.url}" style="text-decoration: none; color: inherit;">${post.title}</a></h3>
                        <p>${post.description.substring(0, 100)}${post.description.length > 100 ? '...' : ''}</p>
                        <a href="${isEnglishVersion ? '../' + post.url : post.url}" class="explore-btn"></a>
                    `;
                    
                    blogContainer.appendChild(postCard);
                });
            })
            .catch(error => {
                console.error('Error cargando los posts del blog:', error);
                blogContainer.innerHTML = isEnglishVersion ? 
                    '<p>Error loading blog posts. Please reload the page.</p>' : 
                    '<p>Error al cargar los posts del blog. Por favor, recarga la página.</p>';
            });
    }
}); 