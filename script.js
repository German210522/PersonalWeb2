/* --- 1. PANTALLA DE CARGA (MÁS RÁPIDA) --- */
window.addEventListener('load', () => {
    const bar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percentage-num');
    const statusMsg = document.getElementById('status-msg');
    const overlay = document.getElementById('intro-overlay');

    let width = 0;
    
    // Intervalo de carga
    const timer = setInterval(() => {
        width += 4; 
        
        // Actualizar barra y texto visualmente
        if (bar) bar.style.width = width + '%';
        if (percentText) percentText.innerText = Math.floor(width) + '%';

        // Mensajes de estado
        if (statusMsg) {
            if (width < 30) statusMsg.innerText = "Conectando con el Polo Norte...";
            else if (width < 60) statusMsg.innerText = "Cargando regalos...";
            else statusMsg.innerText = "¡Feliz Navidad!";
        }

        // Finalizar carga
        if (width >= 100) {
            width = 100;
            clearInterval(timer);
            
            // Deslizar hacia arriba
            if (overlay) {
                setTimeout(() => { 
                    overlay.style.transform = 'translateY(-100%)'; 
                }, 200); 

                setTimeout(() => { 
                    overlay.style.display = 'none'; 
                }, 1000); 
            }
        }
    }, 20); 
});

/* --- 2. EFECTO DE NIEVE (SIN BLOQUEAR CLICS) --- */
document.addEventListener("DOMContentLoaded", function() {
    const snowContainer = document.createElement('div');
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none'; // CRUCIAL: Permite hacer clic a través de la nieve
    snowContainer.style.zIndex = '9999'; 
    document.body.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.style.position = 'absolute';
        snowflake.style.color = 'white';
        snowflake.style.fontSize = Math.random() * 20 + 10 + 'px'; 
        snowflake.style.left = Math.random() * 100 + 'vw'; 
        snowflake.style.opacity = Math.random();
        snowflake.style.top = '-50px';
        
        const duration = Math.random() * 3 + 2; 
        snowflake.style.transition = `top ${duration}s linear, opacity ${duration}s ease-out`;
        
        snowContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.style.top = '110vh'; 
            snowflake.style.opacity = '0'; 
        }, 50);

        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000);
    }
    
    // Generar nieve constante
    setInterval(createSnowflake, 200);
});

/* --- 3. MENÚ HAMBURGUESA --- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => { navbar.classList.toggle('active'); };
    document.querySelectorAll('.navbar a').forEach(link => { 
        link.onclick = () => { navbar.classList.remove('active'); }; 
    });
}

/* --- 4. AÑO AUTOMÁTICO --- */
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.innerHTML = new Date().getFullYear();
}

/* --- 5. BOTÓN SUBIR (SCROLL UP) --- */
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

/* --- 6. FORMULARIO AJAX (CONTACTO) --- */
var form = document.getElementById("contact-form");
var statusTxt = document.getElementById("form-status");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        if(statusTxt) {
            statusTxt.style.display = 'block'; 
            statusTxt.innerHTML = "Enviando carta a Santa...";
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
/* --- CÓDIGO DE SEGURIDAD PARA MÓVILES --- */

// Opción 1: Tu código de carga normal (el que ya tienes)
window.addEventListener('load', function() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Reactivar scroll
    }
});

// Opción 2: El "Seguro de Vida" (Timeout)
// Si por alguna razón la página tarda más de 3 segundos en cargar,
// quitamos la pantalla de carga a la fuerza.
setTimeout(function() {
    const overlay = document.getElementById('intro-overlay');
    if (overlay && overlay.style.display !== 'none') {
        console.log("Carga forzada por tiempo de espera.");
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Asegurar que se pueda bajar
    }
}, 3000); // 3000 milisegundos = 3 segundos