document.addEventListener("DOMContentLoaded", function() {
    const placeholder = document.getElementById('header-placeholder');
    const contenidoPrincipal = document.querySelector('.contenido');

    // 1. CARGAR HEADER
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;
            actualizarMenuActivo(); // Aquí se decide quién se pone naranja
            configurarEnlacesMenu(); 
            configurarMenuMovil();
        });

    // 2. SCROLL (Solo activa en pantallas grandes)
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 900) {
            if (window.scrollY > 50) {
                placeholder.classList.add('header-scrolled');
            } else {
                placeholder.classList.remove('header-scrolled');
            }
        }
    });

    function configurarEnlacesMenu() {
        const links = document.querySelectorAll('#main-nav a, .nav-mobile a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const url = this.getAttribute('href');
                if (url && url.includes('.html')) {
                    e.preventDefault();
                    cerrarMenu();
                    cambiarPagina(url);
                }
            });
        });
    }

    function cambiarPagina(url) {
        // Validación para evitar errores si el contenedor no existe en alguna página
        if (!contenidoPrincipal) {
            window.location.href = url;
            return;
        }

        contenidoPrincipal.classList.add('fade-out');
        setTimeout(() => {
            fetch(url).then(r => r.text()).then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nuevoContenido = doc.querySelector('.contenido');

                if (nuevoContenido) {
                    contenidoPrincipal.innerHTML = nuevoContenido.innerHTML;
                    window.history.pushState({}, '', url);
                    actualizarMenuActivo(); // Se vuelve a verificar al cambiar de página
                    window.scrollTo(0, 0);
                    contenidoPrincipal.classList.remove('fade-out');
                } else {
                    // Si la página destino no tiene .contenido (como el libro), recarga normal
                    window.location.href = url;
                }
            });
        }, 300);
    }

    function actualizarMenuActivo() {
        const links = document.querySelectorAll('#main-nav a, .nav-mobile a');
        // Obtenemos el nombre del archivo actual (ej: libro-reclamaciones.html)
        const path = window.location.pathname;
        const currentPage = path.split("/").pop() || "index.html";

        links.forEach(link => {
            const href = link.getAttribute('href');
            // Solo añade la clase 'activo' (naranja) si el href coincide exactamente con la página actual
            if (href === currentPage) {
                link.classList.add('activo');
            } else {
                // Si estás en el libro de reclamaciones, ninguno coincidirá y todos se limpian
                link.classList.remove('activo');
            }
        });
    }

    function configurarMenuMovil() {
        const btnAbrir = document.getElementById('btn-abrir');
        const btnCerrar = document.getElementById('btn-cerrar');
        if(btnAbrir) btnAbrir.onclick = () => {
            document.getElementById('menu-lateral').classList.add('active');
            document.getElementById('capa-oscura').style.display = 'block';
        };
        if(btnCerrar) btnCerrar.onclick = cerrarMenu;
    }

    function cerrarMenu() {
        const m = document.getElementById('menu-lateral');
        const o = document.getElementById('capa-oscura');
        if(m) m.classList.remove('active');
        if(o) o.style.display = 'none';
    }

    window.onpopstate = () => cambiarPagina(window.location.pathname);
});


