// Este script se encarga ÚNICAMENTE de la apertura y cierre del menú lateral
function iniciarMenuMovil() {
    const btnAbrir = document.getElementById('btn-abrir');
    const btnCerrar = document.getElementById('btn-cerrar');
    const menu = document.getElementById('menu-lateral');
    const overlay = document.getElementById('capa-oscura');

    if (btnAbrir && menu && btnCerrar) {
        // Abrir menú
        btnAbrir.addEventListener('click', () => {
            menu.classList.add('active');
            overlay.classList.add('active');
        });

        // Cerrar menú con la X
        btnCerrar.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Cerrar menú al tocar la capa oscura
        overlay.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Cerrar menú al hacer clic en cualquier enlace (para que no estorbe al navegar)
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                overlay.classList.remove('active');
            });
        });
    }
}

// Como el header se carga con un fetch, debemos esperar a que el header 
// aparezca en el HTML para poder encontrar los botones.
const observer = new MutationObserver(() => {
    if (document.getElementById('btn-abrir')) {
        iniciarMenuMovil();
        observer.disconnect(); // Una vez encontrado, dejamos de observar
    }
});

observer.observe(document.body, { childList: true, subtree: true });