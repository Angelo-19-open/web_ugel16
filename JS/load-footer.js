document.addEventListener("DOMContentLoaded", function() {
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo encontrar el archivo footer.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});