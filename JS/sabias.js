const datosCuriosos = [
    "La UGEL N° 16 supervisa la educación en los 5 distritos de nuestra provincia de Barranca.",
    "El trámite de escalafón es totalmente gratuito y se puede solicitar virtualmente.",
    "Contamos con una Mesa de Partes Virtual disponible las 24 horas del día.",
    "Recuerda actualizar tu declaración jurada en el sistema para evitar inconvenientes.",
    "La provincia de Barranca cuenta con más de 150 Instituciones Educativas públicas."
];

let indiceActual = 0;

function cambiarDato() {
    const textoElemento = document.getElementById('texto-sabias');
    
    // Seguridad: Si por algún motivo no encuentra el ID, que no rompa el resto del JS
    if (!textoElemento) return;

    // Actualizamos el índice
    indiceActual = (indiceActual + 1) % datosCuriosos.length;
    
    // Forzamos que el elemento tenga transición para que el opacity se vea suave
    textoElemento.style.transition = "opacity 0.2s ease";
    
    // Efecto de parpadeo
    textoElemento.style.opacity = 2;
    
    setTimeout(() => {
        textoElemento.innerText = datosCuriosos[indiceActual];
        textoElemento.style.opacity = 1;
    }, 200);
}