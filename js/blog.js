document.addEventListener('DOMContentLoaded', function() {
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
            const categories = data.categories;
            
            // Comprobar si hay posts disponibles en este idioma
            const noResultsElement = document.getElementById('noResults');
            const blogGrid = document.getElementById('blogGrid');
            
            if (posts.length === 0) {
                // No hay posts en este idioma
                if (noResultsElement) {
                    noResultsElement.style.display = 'block';
                }
                
                // Si estamos en la versión en inglés, mostrar el mensaje de redirección
                const languageMessageElement = document.querySelector('.no-posts-message');
                if (languageMessageElement && isEnglishVersion) {
                    languageMessageElement.style.display = 'block';
                }
                
                return;
            } else {
                // Ocultar mensaje de no hay posts en este idioma si existe
                if (noResultsElement) {
                    noResultsElement.style.display = 'none';
                }
                
                // Ocultar mensaje de redirección de idioma si existe
                const languageMessageElement = document.querySelector('.no-posts-message');
                if (languageMessageElement) {
                    languageMessageElement.style.display = 'none';
                }
            }
            
            // Cargar categorías para filtros
            const categoryFilters = document.getElementById('categoryFilters');
            if (categoryFilters) {
                // Limpiar categorías existentes (excepto 'all')
                const allFilter = categoryFilters.querySelector('.filter-tag[data-category="all"]');
                categoryFilters.innerHTML = '';
                if (allFilter) {
                    categoryFilters.appendChild(allFilter);
                } else {
                    // Crear el filtro 'all' si no existe
                    const allFilterTag = document.createElement('div');
                    allFilterTag.className = 'filter-tag active';
                    allFilterTag.setAttribute('data-category', 'all');
                    allFilterTag.textContent = isEnglishVersion ? 'All' : 'Todos';
                    categoryFilters.appendChild(allFilterTag);
                }
                
                // Obtener categorías únicas de los posts en este idioma
                const uniqueCategories = [...new Set(posts.map(post => post.category))];
                
                uniqueCategories.forEach(category => {
                    const filterTag = document.createElement('div');
                    filterTag.className = 'filter-tag';
                    filterTag.setAttribute('data-category', category);
                    filterTag.textContent = category;
                    categoryFilters.appendChild(filterTag);
                });
            }
            
            // Agregar eventos a los filtros
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    // Eliminar clase active de todos los filtros
                    filterTags.forEach(t => t.classList.remove('active'));
                    // Agregar clase active al filtro seleccionado
                    this.classList.add('active');
                    
                    // Filtrar posts
                    const selectedCategory = this.getAttribute('data-category');
                    filterAndDisplayPosts(posts, selectedCategory, document.getElementById('searchInput').value);
                    
                    // Actualizar la URL
                    if (selectedCategory === 'all') {
                        history.pushState({}, '', isEnglishVersion ? '/en/blog.html' : '/blog.html');
                    } else {
                        // Convertir categoría a formato slug para la URL
                        const slug = convertToSlug(selectedCategory);
                        history.pushState({}, '', isEnglishVersion ? `/en/blog.html#${slug}` : `/blog.html#${slug}`);
                    }
                });
            });
            
            // Función para convertir texto a formato slug
            function convertToSlug(text) {
                return text.toLowerCase()
                    .replace(/[^\w ]+/g, '') // Eliminar caracteres especiales
                    .replace(/ +/g, '-')     // Reemplazar espacios por guiones
                    .trim();                 // Eliminar espacios al inicio/final
            }
            
            // Función para filtrar y mostrar posts
            function filterAndDisplayPosts(posts, category, searchTerm) {
                const blogGrid = document.getElementById('blogGrid');
                const noResults = document.getElementById('noResults');
                
                if (!blogGrid) return;
                
                // Limpiar el grid
                blogGrid.innerHTML = '';
                if (noResults) {
                    blogGrid.appendChild(noResults);
                }
                
                // Filtrar posts por categoría y término de búsqueda
                const filteredPosts = posts.filter(post => {
                    const matchesCategory = category === 'all' || post.category === category;
                    const matchesSearch = searchTerm === '' || 
                        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.description.toLowerCase().includes(searchTerm.toLowerCase());
                    
                    return matchesCategory && matchesSearch;
                }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha descendente
                
                // Mostrar posts filtrados
                if (filteredPosts.length === 0) {
                    if (noResults) {
                        noResults.style.display = 'block';
                    }
                } else {
                    if (noResults) {
                        noResults.style.display = 'none';
                    }
                    
                    filteredPosts.forEach(post => {
                        const formattedDate = formatDate(post.date);
                        
                        // Crear slug para la categoría
                        const categorySlug = convertToSlug(post.category);
                        
                        const postCard = document.createElement('div');
                        postCard.className = 'blog-card';
                        postCard.innerHTML = `
                            <div class="blog-card-img">
                                <img src="${isEnglishVersion ? '../' + post.image : post.image}" alt="${post.title}">
                            </div>
                            <div class="blog-card-content">
                                <span class="blog-card-category">
                                    <a href="${isEnglishVersion ? '/en/blog.html#' : '/blog.html#'}${categorySlug}">${post.category}</a>
                                </span>
                                <h3 class="blog-card-title"><a href="${isEnglishVersion ? '../' + post.url : post.url}">${post.title}</a></h3>
                                <div class="blog-card-meta">
                                    <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                                    <span><i class="far fa-user"></i> ${post.author}</span>
                                </div>
                                <p class="blog-card-description">${post.description}</p>
                                <a href="${isEnglishVersion ? '../' + post.url : post.url}" class="blog-card-link">${isEnglishVersion ? 'Read more' : 'Leer más'} <i class="fas fa-arrow-right"></i></a>
                            </div>
                        `;
                        
                        blogGrid.appendChild(postCard);
                    });
                }
            }
            
            // Formatear fecha
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(dateString);
                return date.toLocaleDateString(isEnglishVersion ? 'en-US' : 'es-ES', options);
            }
            
            // Verificar si hay una categoría en la URL al cargar la página
            function checkUrlForCategory() {
                const hash = window.location.hash;
                
                if (hash && hash.length > 1) {
                    const slugFromUrl = hash.substring(1); // Eliminar el # inicial
                    
                    // Encontrar la categoría que coincida con el slug
                    const matchingCategory = Array.from(document.querySelectorAll('.filter-tag'))
                        .find(tag => {
                            const category = tag.getAttribute('data-category');
                            return convertToSlug(category) === slugFromUrl;
                        });
                    
                    if (matchingCategory) {
                        // Simular clic en la categoría encontrada
                        matchingCategory.click();
                    } else {
                        // Si la categoría no existe, mostrar todos
                        document.querySelector('.filter-tag[data-category="all"]').click();
                    }
                } else {
                    // Por defecto, mostrar todos los posts
                    filterAndDisplayPosts(posts, 'all', '');
                }
            }
            
            // Mostrar todos los posts inicialmente o según la URL
            checkUrlForCategory();
            
            // Manejar el evento popstate para navegación del historial
            window.addEventListener('popstate', function() {
                checkUrlForCategory();
            });
            
            // También manejar el evento hashchange
            window.addEventListener('hashchange', function() {
                checkUrlForCategory();
            });
            
            // Agregar evento para la búsqueda
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const activeCategory = document.querySelector('.filter-tag.active')?.getAttribute('data-category') || 'all';
                    filterAndDisplayPosts(posts, activeCategory, this.value);
                });
            }
        })
        .catch(error => {
            console.error('Error cargando los posts:', error);
            const noResults = document.getElementById('noResults');
            if (noResults) {
                noResults.style.display = 'block';
                noResults.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <h2>${isEnglishVersion ? 'Error loading posts' : 'Error al cargar los posts'}</h2>
                    <p>${isEnglishVersion ? 'Please try reloading the page' : 'Por favor, intenta recargar la página'}</p>
                `;
            }
        });
}); 