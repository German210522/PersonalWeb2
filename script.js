// --- 1. PANTALLA DE CARGA (MÁS RÁPIDA) ---
window.addEventListener('load', () => {
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percentage-num');
    const statusMsg = document.getElementById('status-msg');
    const overlay = document.getElementById('intro-overlay');

    let width = 0;
    
    // CAMBIO AQUÍ: Bajamos el tiempo de intervalo de 30 a 20ms
    const timer = setInterval(() => {
        // CAMBIO AQUÍ: Aumentamos el incremento de 2 a 4 por paso
        width += 4; 
        
        // Actualizar barra y texto visualmente
        if (bar) bar.style.width = width + '%';
        if (percentText) percentText.innerText = Math.floor(width) + '%';

        // Mensajes de estado (Aparecen más rápido)
        if (statusMsg) {
            if (width < 30) statusMsg.innerText = "Iniciando...";
            else if (width < 60) statusMsg.innerText = "Cargando...";
            else statusMsg.innerText = "¡Listo!";
        }

        // Finalizar carga
        if (width >= 100) {
            width = 100;
            clearInterval(timer);
            
            // Paso 1: Deslizar hacia arriba
            if (overlay) {
                setTimeout(() => { 
                    overlay.style.transform = 'translateY(-100%)'; 
                }, 200); // Antes 500, ahora 200ms para subir más rápido

                // Paso 2: Eliminar por completo
                setTimeout(() => { 
                    overlay.style.display = 'none'; 
                }, 1000); 
            }
        }
    }, 20); // Intervalo más corto = animación más fluida y rápida
});

// --- 2. MENÚ HAMBURGUESA ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => { navbar.classList.toggle('active'); };
    document.querySelectorAll('.navbar a').forEach(link => { 
        link.onclick = () => { navbar.classList.remove('active'); }; 
    });
}

// --- 3. AÑO AUTOMÁTICO ---
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
}

// --- 4. BOTÓN SUBIR (SCROLL UP) ---
let mybutton = document.getElementById("scrollTopBtn");
window.onscroll = function() { scrollFunction() };

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

// --- 5. FORMULARIO AJAX (CONTACTO) ---
var form = document.getElementById("contact-form");
var statusTxt = document.getElementById("form-status");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        if(statusTxt) {
            statusTxt.style.display = 'block'; 
            statusTxt.innerHTML = "Procesando envío...";
        }

        var data = new FormData(event.target);
        
        fetch(event.target.action, {
            method: form.method, 
            body: data, 
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                if(statusTxt) statusTxt.style.display = 'none'; 
                form.reset();
                const successModal = document.getElementById('success-modal');
                if(successModal) successModal.style.display = 'flex';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) { 
                        if(statusTxt) statusTxt.innerHTML = data["errors"].map(error => error["message"]).join(", "); 
                    } else { 
                        if(statusTxt) statusTxt.innerHTML = "Hubo un error al enviar. Intenta de nuevo."; 
                    }
                });
            }
        }).catch(error => { 
            if(statusTxt) statusTxt.innerHTML = "Error de conexión."; 
        });
    }
    form.addEventListener("submit", handleSubmit);
}

function closeModal() { 
    const successModal = document.getElementById('success-modal');
    if(successModal) successModal.style.display = 'none'; 
}