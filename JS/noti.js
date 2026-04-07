function cambiarDato() {
    const textoElemento = document.getElementById('texto-sabias');
    const iconoBoton = document.querySelector('.btn-moderno i');
    
    // Rotar icono del botón
    iconoBoton.style.transform = "rotate(360deg)";
    
    // Efecto de suavizado de texto
    textoElemento.style.opacity = "0";
    textoElemento.style.transform = "translateY(10px)";
    
    setTimeout(() => {
        indiceActual = (indiceActual + 1) % datosCuriosos.length;
        textoElemento.innerText = datosCuriosos[indiceActual];
        
        textoElemento.style.opacity = "1";
        textoElemento.style.transform = "translateY(0)";
        
        // Resetear rotación icono después de la animación
        setTimeout(() => { iconoBoton.style.transform = "rotate(0deg)"; }, 600);
    }, 400);
}