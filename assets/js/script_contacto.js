document.addEventListener("DOMContentLoaded", function() {

    // 1. MENÚ MÓVIL
    const mobileToggle = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileToggle && mobileMenu && closeMobileMenu) {
        mobileToggle.addEventListener('click', () => { mobileMenu.classList.add('show'); document.body.style.overflow = 'hidden'; });
        closeMobileMenu.addEventListener('click', () => { mobileMenu.classList.remove('show'); document.body.style.overflow = ''; });
    }

    // 2. WIDGET DE WHATSAPP INTERACTIVO
    const waWidget = document.getElementById('whatsapp-widget');
    const closeWa = document.getElementById('close-wa-widget');
    const btnFlotanteWa = document.getElementById('btn-contacto-flotante');

    if (waWidget && closeWa && btnFlotanteWa) {
        setTimeout(() => {
            waWidget.style.display = 'flex';
            if (typeof gsap !== 'undefined') gsap.fromTo(waWidget, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)"});
        }, 4000);

        closeWa.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') gsap.to(waWidget, {opacity: 0, y: 20, duration: 0.3, onComplete: () => waWidget.style.display = 'none'});
            else waWidget.style.display = 'none';
        });

        btnFlotanteWa.addEventListener('click', (e) => {
            e.preventDefault();
            if (waWidget.style.display === 'none' || waWidget.style.display === '') {
                waWidget.style.display = 'flex';
                if (typeof gsap !== 'undefined') gsap.fromTo(waWidget, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)"});
            } else {
                if (typeof gsap !== 'undefined') gsap.to(waWidget, {opacity: 0, y: 20, duration: 0.3, onComplete: () => waWidget.style.display = 'none'});
                else waWidget.style.display = 'none';
            }
        });
    }

// 3. ANIMACIÓN DE TEXTO INICIAL (MÁQUINA DE ESCRIBIR SINCRONIZADA)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const typeTexts = document.querySelectorAll('.type-animation');
    let heroDelay = 0.5; // El tiempo de espera inicial

    typeTexts.forEach((el, index) => {
        const texto = el.innerText;
        el.innerText = '';
        
        // Separamos en letras respetando los espacios
        el.innerHTML = texto.split('').map(char => {
            if (char === ' ') return ' '; 
            return `<span style="opacity:0">${char}</span>`;
        }).join('');
        
        const spans = el.querySelectorAll('span');

        // Si son los textos de la cabecera (Impacta con tu / EVENTO)
        if (index === 0 || index === 1) {
            gsap.to(spans, { 
                opacity: 1, 
                stagger: 0.05, 
                duration: 0.1, 
                ease: "none", 
                delay: heroDelay 
            });
            // Le sumamos al delay el tiempo que tardó esta palabra en escribirse
            // para que la siguiente (EVENTO) empiece exactamente cuando esta termine
            heroDelay += (spans.length * 0.05); 
        } 
        // Para el resto de textos tipo máquina de escribir más abajo en la página
        else {
            gsap.to(spans, {
                scrollTrigger: { trigger: el, start: "top 90%" },
                opacity: 1, 
                stagger: 0.05, 
                duration: 0.1, 
                ease: "none"
            });
        }
    });
    
    // Reparación de los textos que hacen "Fade In"
    const fadeTexts = document.querySelectorAll('.fade-in-text');
    fadeTexts.forEach((el, index) => {
        // Los textos de la cabecera entran automáticos
        if (index === 0 || index === 1) { 
            gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.5 });
        } 
        // Si hubiera textos abajo, esperan al Scroll
        else { 
            gsap.fromTo(el, { opacity: 0, y: 20 }, {
                scrollTrigger: { trigger: el, start: "top 90%" },
                opacity: 1, y: 0, duration: 1
            });
        }
    });
}
// ==========================================
// LÓGICA DEL FORMULARIO WIZARD (Con Validación de Teléfono)
// ==========================================
const form = document.getElementById('spira-contact-form');

if (form && typeof gsap !== 'undefined') {
    // [Tus variables originales se quedan igual]
    const btnNext = document.querySelectorAll('.btn-next');
    const btnPrev = document.querySelectorAll('.btn-prev'); 
    const btnReview = document.getElementById('btn-review');
    const btnEdit = document.getElementById('btn-edit');
    const globalSubmit = document.getElementById('global-submit-wrapper');

    const checkTelefono = document.getElementById('check-telefono');
    const phoneDetails = document.getElementById('phone-details');
    const checkCorreo = document.getElementById('check-correo');
    const emailDetails = document.getElementById('email-details');

    checkTelefono.addEventListener('change', function() {
        if (this.checked) {
            phoneDetails.style.display = 'block';
            gsap.fromTo(phoneDetails, {opacity: 0, y: -10}, {opacity: 1, y: 0, duration: 0.3});
        } else { phoneDetails.style.display = 'none'; }
    });

    checkCorreo.addEventListener('change', function() {
        if (this.checked) {
            emailDetails.style.display = 'block';
            gsap.fromTo(emailDetails, {opacity: 0, y: -10}, {opacity: 1, y: 0, duration: 0.3});
        } else { emailDetails.style.display = 'none'; }
    });

    // Limpiar el error del teléfono si el usuario corrige
    form.addEventListener('input', (e) => {
        if (e.target.classList.contains('input-error')) e.target.classList.remove('input-error');
        
        if (e.target.id === 'telefono' && e.target.value.length === 10) {
            const telWarning = document.getElementById('tel-warning');
            if(telWarning) telWarning.classList.add('d-none');
        }
    });

    // --- AVANZAR DE PASO Y VALIDAR ---
    btnNext.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStepDiv = this.closest('.form-step');
            const nextStepId = this.getAttribute('data-next');
            const nextStepDiv = document.getElementById(nextStepId);
            let isValid = true;

            if (currentStepDiv.id === 'step-1') {
                const inputs = document.querySelectorAll('.required-step-1');
                inputs.forEach(input => {
                    if (!input.checkValidity() || input.value.trim() === '') {
                        isValid = false;
                        input.classList.add('input-error');
                    }
                });
            }

            if (currentStepDiv.id === 'step-2') {
                if (!checkTelefono.checked && !checkCorreo.checked) {
                    alert('Por favor selecciona al menos un método de contacto (Teléfono o Correo).');
                    return;
                }
                if (checkTelefono.checked) {
                    const telInput = document.getElementById('telefono');
                    const telWarning = document.getElementById('tel-warning');
                    const pref = document.querySelector('input[name="pref_telefono"]:checked');
                    
                    // VALIDACIÓN ESTRICTA A 10 DÍGITOS
                    if (telInput.value.length !== 10) {
                        telInput.classList.add('input-error');
                        if(telWarning) telWarning.classList.remove('d-none'); // Muestra la alerta
                        isValid = false;
                    }
                    
                    if (!pref) {
                        alert('Por favor selecciona si prefieres WhatsApp, Llamadas o Ambas.');
                        isValid = false;
                    }
                }
                if (checkCorreo.checked) {
                    const emailInput = document.getElementById('correo');
                    if (!emailInput.checkValidity() || emailInput.value.trim() === '') {
                        emailInput.classList.add('input-error');
                        isValid = false;
                    }
                }
            }

            if (!isValid) return;

            gsap.to(currentStepDiv, {
                opacity: 0, y: -20, duration: 0.4,
                onComplete: () => {
                    currentStepDiv.style.display = 'none';
                    nextStepDiv.style.display = 'block';
                    gsap.fromTo(nextStepDiv, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
                }
            });
        });
    });

                // --- VISTA PREVIA ---
                        btnReview.addEventListener('click', function() {
                            const currentStepDiv = document.getElementById('step-3');
                            const summaryDiv = document.getElementById('step-summary');
                            const globalActions = document.getElementById('global-actions');

                            // Validar Checkboxes de Eventos y Textarea
                            const checkboxes = document.querySelectorAll('.checkbox-step-3:checked');
                            const textarea = document.querySelector('.required-step-3');

                            if (checkboxes.length === 0) {
                                alert('Por favor selecciona al menos un tipo de evento.');
                                return;
                            }
                            if (!textarea.checkValidity() || textarea.value.trim() === '') {
                                textarea.classList.add('input-error');
                                return;
                            }

                            // Llenar resumen dinámico
                            document.getElementById('sum-nombre').innerText = form.nombre.value;
                            document.getElementById('sum-empresa').innerText = form.empresa.value;

                            // Llenar teléfono condicional
                            if (checkTelefono.checked) {
                                const code = document.getElementById('country-code').value;
                                const tel = form.telefono.value;
                                const pref = document.querySelector('input[name="pref_telefono"]:checked').value;
                                document.getElementById('sum-telefono').innerText = `${code} ${tel} (${pref})`;
                            } else {
                                document.getElementById('sum-telefono').innerText = 'No proporcionado';
                            }

                            // Llenar correo condicional
                            if (checkCorreo.checked) {
                                document.getElementById('sum-correo').innerText = form.correo.value;
                            } else {
                                document.getElementById('sum-correo').innerText = 'No proporcionado';
                            }

                            // Llenar eventos y mensaje
                            let eventosArr = [];
                            checkboxes.forEach(chk => eventosArr.push(chk.value));
                            document.getElementById('sum-eventos').innerText = eventosArr.join(', ');
                            document.getElementById('sum-mensaje').innerText = form.mensaje.value;

                            // Animar la salida del Paso 3 y la entrada del Resumen + Botones Globales
                            gsap.to(currentStepDiv, {
                                opacity: 0, y: -20, duration: 0.4,
                                onComplete: () => {
                                    currentStepDiv.style.display = 'none';

                                    summaryDiv.style.display = 'block';
                                    globalActions.style.display = 'flex'; // Mostramos el área de botones
                                    document.getElementById('btn-edit').style.display = 'block'; // Aseguramos que el botón editar esté visible

                                    gsap.fromTo([summaryDiv, globalActions], {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, stagger: 0.2});
                                }
                            });
                        });

                        // --- MODO EDICIÓN (Muestra todo) ---
                        btnEdit.addEventListener('click', function() {
                            const summaryDiv = document.getElementById('step-summary');
                            const globalActions = document.getElementById('global-actions');
                            const step1 = document.getElementById('step-1');
                            const step2 = document.getElementById('step-2');
                            const step3 = document.getElementById('step-3');

                            // Hacemos que el resumen desaparezca
                            gsap.to(summaryDiv, {
                                opacity: 0, y: 20, duration: 0.4,
                                onComplete: () => {
                                    summaryDiv.style.display = 'none';

                                    // 1. Ocultamos TODAS las flechas y botones de "siguiente" usando CSS forzado
                                    document.querySelectorAll('.step-actions').forEach(el => {
                                        el.style.setProperty('display', 'none', 'important');
                                    });

                                    // 2. Mostramos todos los contenedores de inputs a la vez
                                    [step1, step2, step3].forEach(step => step.style.display = 'block');

                                    // 3. Ocultamos el botón de editar (porque ya estamos editando)
                                    document.getElementById('btn-edit').style.display = 'none';

                                    // 4. Cambiamos el texto del botón de envío para dar más claridad (opcional)
                                    document.getElementById('btn-submit').innerText = '[ GUARDAR Y ENVIAR ]';

                                    // Animar la aparición de todos los campos juntos
                                    gsap.fromTo([step1, step2, step3, globalActions], {opacity: 0}, {opacity: 1, duration: 0.8, stagger: 0.1});
                                }
                            });
                        });

                // --- ENVÍO FINAL ---
                // --- ENVÍO FINAL (Conexión Formspree) ---
                form.addEventListener('submit', function(e) {
                    e.preventDefault(); // Evitamos que la página recargue

                    const submitBtn = document.getElementById('btn-submit');
                    const originalText = submitBtn.innerText;
                    
                    // 1. Cambiamos el estado del botón a cargando
                    submitBtn.innerText = '[ TRANSMITIENDO DATOS... ]';
                    submitBtn.disabled = true;

                    // 2. Recolectamos los datos del formulario
                    const data = new FormData(form);

                    // 3. Enviamos los datos al servidor de correos en segundo plano
                    fetch(form.action, {
                        method: form.method,
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(response => {
                        if (response.ok) {
                            // ÉXITO: El correo se envió
                            alert('¡Transmisión enviada con éxito! Iniciando secuencia de contacto...');
                            form.reset(); // Limpiamos los campos
                            // 2. Transición GSAP: Adiós formulario, hola mensaje final
                            const mensajeFinal = document.getElementById('mensaje-final');
                            
                            gsap.to(form, {
                                opacity: 0,
                                y: -20,
                                duration: 0.4,
                                onComplete: () => {
                                    form.style.display = 'none'; // Desaparece el form
                                    
                                    mensajeFinal.style.display = 'block'; // Aparece el engranaje
                                    gsap.fromTo(mensajeFinal, 
                                        { opacity: 0, scale: 0.9 }, 
                                        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
                                    );
                                }
                            });
                            
                        } else {
                            // ERROR DEL SERVIDOR
                            response.json().then(data => {
                                if (Object.hasOwn(data, 'errors')) {
                                    alert(data["errors"].map(error => error["message"]).join(", "));
                                } else {
                                    alert("Hubo un problema de conexión al enviar tu formulario.");
                                }
                            });
                        }
                    }).catch(error => {
                        // ERROR DE RED
                        alert("Error de red. Verifica tu conexión a internet.");
                    }).finally(() => {
                        // 4. Restauramos el botón a la normalidad si algo falla
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    });
                });
            } // (Aquí termina tu validación de existencia del form)
    // ==========================================================================
    // 🍔 MENÚ HAMBURGUESA MÓVIL (Efecto Cortina)
    // ==========================================================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        // Abrir/Cerrar
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hamburgerBtn.classList.toggle('open');
            navMenu.classList.toggle('active');
        });

        // Cierra la cortina al tocar un enlace
        const navLinksList = document.querySelectorAll('.nav-links a');
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('active');
            });
        });
    }
});