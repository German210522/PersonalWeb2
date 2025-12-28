/* --- CONTROL DE LA PANTALLA DE CARGA (SIMULACIÓN PREMIUM) --- */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Referencias a los elementos
    const overlay = document.getElementById('intro-overlay');
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('percentage-num');
    const statusMsg = document.getElementById('status-msg');

    // Validación por si acaso no existen los elementos
    if (!overlay || !progressBar || !percentageText || !statusMsg) {
        console.log("Elementos de carga no encontrados.");
        return;
    }

    // Bloquear el scroll mientras carga
    document.body.style.overflow = 'hidden';

    // 2. Variables de la simulación
    let progress = 0;
    const totalTime = 1500; // Tiempo total de la animación en milisegundos (1.5 segundos)
    const intervalTime = 30; // Cada cuánto actualizamos la barra
    const increment = 100 / (totalTime / intervalTime); // Cuánto sube el porcentaje por tick

    // 3. Función de Animación
    const loadingInterval = setInterval(() => {
        progress += increment;

        // A veces sumamos un poquito extra aleatorio para que se vea "real" (no robótico)
        if(Math.random() > 0.5) progress += 0.5;

        // Topamos en 100%
        if (progress >= 100) progress = 100;

        // Actualizamos el ancho de la barra y el número
        progressBar.style.width = Math.floor(progress) + "%";
        percentageText.innerText = Math.floor(progress) + "%";

        // Cambiamos el mensaje según el avance
        if (progress < 20) {
            statusMsg.innerText = "Conectando con el servidor...";
        } else if (progress < 50) {
            statusMsg.innerText = "Cargando módulos de seguridad...";
        } else if (progress < 80) {
            statusMsg.innerText = "Optimizando interfaz gráfica...";
        } else {
            statusMsg.innerText = "¡Todo listo! Bienvenido.";
        }

        // 4. Finalización
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            // Pequeña pausa al 100% para que el usuario lea "¡Todo listo!"
            setTimeout(() => {
                // EFECTO DE SALIDA: Deslizar hacia arriba (aprovechando tu CSS transition)
                overlay.style.transform = 'translateY(-100%)'; 
                
                // Reactivar el scroll del cuerpo
                document.body.style.overflow = 'auto';

                // (Opcional) Eliminar el div del DOM después de que termine la animación CSS (0.8s)
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 1000);

            }, 500); 
        }

    }, intervalTime);
});


/* --- MENÚ HAMBURGUESA (MÓVIL) --- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if(menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// Cerrar menú al hacer click en un enlace
let navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(menuIcon) menuIcon.classList.remove('bx-x');
        if(navbar) navbar.classList.remove('active');
    });
});


/* --- BOTÓN IR ARRIBA --- */
let mybutton = document.getElementById("scrollTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (mybutton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


/* --- MANEJO DEL FORMULARIO DE CONTACTO (FORMSPREE) --- */
const form = document.getElementById("contact-form");
const statusTxt = document.getElementById("form-status");
const successModal = document.getElementById("success-modal");

if(form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        if(statusTxt) {
            statusTxt.style.display = "block";
            statusTxt.innerHTML = "Enviando mensaje...";
            statusTxt.style.color = "#fff";
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                if(statusTxt) statusTxt.style.display = "none";
                form.reset();
                if(successModal) {
                    successModal.style.display = "flex"; // Mostrar Modal
                } else {
                    alert("¡Gracias! Tu mensaje ha sido enviado.");
                }
            } else {
                if(statusTxt) {
                    statusTxt.innerHTML = "Hubo un problema al enviar. Intenta de nuevo.";
                    statusTxt.style.color = "red";
                }
            }
        } catch (error) {
            if(statusTxt) {
                statusTxt.innerHTML = "Error de conexión.";
                statusTxt.style.color = "red";
            }
        }
    });
}

function closeModal() {
    if(successModal) successModal.style.display = "none";
}

/* --- AÑO AUTOMÁTICO EN FOOTER --- */
const yearSpan = document.getElementById("year");
if(yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}