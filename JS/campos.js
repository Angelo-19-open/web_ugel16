document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("fs-frm");
    const status = document.getElementById("status-mensaje");
    const btn = document.getElementById("btn-enviar");

    if (!form) return; 

    async function handleSubmit(event) {
        event.preventDefault(); 
        
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // EXTRAEMOS SOLO EL TEXTO (Esto ayuda a ocultar metadatos como la IP)
        const data = {
            nombre: form.nombre.value,
            email: form.email.value,
            telefono: form.telefono.value,
            asunto: form.asunto.value,
            mensaje: form.mensaje.value
        };

        fetch(event.target.action, {
            method: "POST", // Forzamos POST
            body: JSON.stringify(data), // Enviamos como texto plano JSON
            headers: {
                'Content-Type': 'application/json', // OBLIGATORIO para ocultar IP
                'Accept': 'application/json'      // OBLIGATORIO para evitar redirección
            }
        }).then(response => {
            if (response.ok) {
                // ÉXITO
                status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado correctamente.";
                status.style.color = "#28a745"; 
                form.reset(); // LIMPIEZA DE CAMPOS
                
                // El aviso desaparece en 5 segundos para que la web quede limpia
                setTimeout(() => {
                    status.innerHTML = "";
                }, 5000);
            } else {
                // ERROR DE SERVIDOR
                status.innerHTML = "Huy! Hubo un problema. Inténtalo de nuevo.";
                status.style.color = "#dc3545";
            }
        }).catch(error => {
            // ERROR DE CONEXIÓN
            status.innerHTML = "Error de red. Revisa tu conexión a internet.";
            status.style.color = "#dc3545";
        }).finally(() => {
            // Restaurar botón
            btn.innerHTML = textoOriginal;
            btn.disabled = false;
        });
    }

    form.addEventListener("submit", handleSubmit);
});