document.addEventListener('DOMContentLoaded', () => {
    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const logoContainer = document.getElementById('logo-container');
    const heroSection = document.querySelector('.hero-section');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    const linkInicio = document.querySelector('.nav-links a[href="#inicio"]');
    const imgLogo = document.getElementById('main-logo');
    
    let splashTimeout; // 👈 Variable para controlar el tiempo y evitar bugs

    // 1. Ejecución automática al cargar la página
    splashTimeout = setTimeout(() => {
        irAlMenu();
    }, 3000); 

    // ==========================================================================
    // 🚀 CONTROL INTEGRADO DE NAVEGACIÓN EN JS
    // ==========================================================================
    function irAlMenu() {
        logoContainer.style.transform = '';
        logoContainer.classList.remove('large-hero');
        heroSection.classList.add('collapsed');
        document.body.classList.add('permitir-scroll'); 
        imgLogo.src = "./assets/img/Logo-SPIRA_blanco.png";

        document.getElementById('nav-menu').classList.remove('invisible-inicio');
        document.getElementById('hamburger-btn').classList.remove('invisible-inicio');

        // 🟢 NUEVO: Aparecen los enlaces, la hamburguesa y el FOOTER
        const navMenuObj = document.getElementById('nav-menu');
        const hamBtnObj = document.getElementById('hamburger-btn');
        const footerObj = document.getElementById('footer-sitio'); // 👈 Seleccionamos el footer
        
        if(navMenuObj) navMenuObj.classList.remove('invisible-inicio');
        if(hamBtnObj) hamBtnObj.classList.remove('invisible-inicio');
        if(footerObj) footerObj.classList.remove('invisible-inicio'); // 👈 Lo revelamos

        // Animación de Máquina de escribir sincronizada
        const sloganElement = document.getElementById('slogan-text');
        
        if (sloganElement && typeof gsap !== 'undefined') {
            const texto = "Inspirando emociones";
            sloganElement.innerHTML = ""; // Limpiamos el texto original
            
            // Creamos span por cada letra, invisibles al principio
            const letras = texto.split('').map(letra => {
                return `<span class="char-eslogan" style="opacity:0">${letra === ' ' ? '&nbsp;' : letra}</span>`;
            }).join('');
            
            // Le agregamos el cursor parpadeante al final
            sloganElement.innerHTML = letras + '<span class="cursor-typing" id="cursor-eslogan"></span>';

            // Animamos las letras secuencialmente (efecto type-writer)
            gsap.to(sloganElement.querySelectorAll('.char-eslogan'), {
                opacity: 1,
                stagger: 0.1, // Velocidad de tecleo (0.1s por letra)
                duration: 0.1,
                ease: "none",
                delay: 0.8, // Esperamos a que la cortina negra suba un poco
                onStart: () => {
                    document.getElementById('cursor-eslogan').style.opacity = 1;
                },
                onComplete: () => {
                    // El cursor desaparece un par de segundos después de terminar de escribir
                    setTimeout(() => {
                        const cursor = document.getElementById('cursor-eslogan');
                        if(cursor) cursor.style.display = 'none';
                    }, 2500);
                }
            });
        }
    }

    function regresarAlInicio() {
        // 🔴 NUEVO: Desaparecen los enlaces, la hamburguesa y el FOOTER
        const navMenuObj = document.getElementById('nav-menu');
        const hamBtnObj = document.getElementById('hamburger-btn');
        const footerObj = document.getElementById('footer-sitio'); // 👈 Seleccionamos el footer
        
        if(navMenuObj) navMenuObj.classList.add('invisible-inicio');
        if(hamBtnObj) hamBtnObj.classList.add('invisible-inicio');
        if(footerObj) footerObj.classList.add('invisible-inicio'); // 👈 Lo ocultamos
        
        clearTimeout(splashTimeout); // Limpiamos tiempos fantasmas
        heroSection.classList.remove('collapsed');
        document.body.classList.remove('permitir-scroll'); // Bloquea scroll
        window.scrollTo(0, 0);

        setTimeout(() => {
            logoContainer.style.transform = '';
            logoContainer.classList.add('large-hero');
            imgLogo.src = "./assets/img/Logo-SPIRA_letras-verdes.png";
        }, 800); 

        // Se vuelve a quitar automáticamente después de 3.5 segundos
        splashTimeout = setTimeout(() => {
            irAlMenu();
        }, 3500);
    }

    // ==========================================================================
    // 🎯 EVENTOS DEL LOGO Y LINKS DE LA NAVBAR
    // ==========================================================================
    logoContainer.addEventListener('click', () => {
        if (logoContainer.classList.contains('large-hero')) {
            clearTimeout(splashTimeout); // Si le da clic rápido, cancela el auto-play
            irAlMenu();
        } else {
            regresarAlInicio();
        }
    });

    if (linkInicio) {
        linkInicio.addEventListener('click', (event) => {
            event.preventDefault(); 
            if (heroSection.classList.contains('collapsed')) {
                regresarAlInicio();
            }
        });
    }

    // ==========================================================================
    // 🍔 MENÚ HAMBURGUESA MÓVIL
    // ==========================================================================
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('open');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================================================
    // 🎡 CARRUSEL SWIPER MIGRADO (Autoplay Continuo)
    // ==========================================================================
    if (document.querySelector(".spiraSwiper")) {
        new Swiper(".spiraSwiper", {
            loop: true,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 20,
            speed: 600, // Transición suave
            autoplay: {
                delay: 4000, 
                disableOnInteraction: false, // 👈 CRÍTICO: Nunca se detiene aunque el usuario haga clic
                pauseOnMouseEnter: true // Opcional: Pausa temporal si el usuario pone el mouse encima
            },
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true, // 👈 Permite dar clic en los puntitos para navegar
            },
            breakpoints: {
                992: { spaceBetween: 40 }
            }
        });
    }

// ==========================================================================
    // 🌐 ANIMACIÓN GSAP PROPUESTA DE VALOR (Lista Secuencial Universal)
    // ==========================================================================
    const propuestaSection = document.getElementById('propuesta-section');

    if (propuestaSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const listItems = document.querySelectorAll('.value-list-item');
        
        listItems.forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 75%", // Se ilumina cuando el elemento asoma el 25% de abajo
                end: "bottom 25%", // Se apaga cuando el elemento se va por arriba
                toggleClass: "activo" // Añade la clase que pusimos en el CSS
            });
        });
    }

    // ==========================================================================
    // 💬 LÓGICA DEL WIDGET DE WHATSAPP (MIGRADO)
    // ==========================================================================
    const waWidget = document.getElementById('whatsapp-widget');
    const closeWa = document.getElementById('close-wa-widget');

    if (waWidget && closeWa) {
        // Mostrar el cuadro de diálogo automáticamente después de 6 segundos 
        // (da tiempo a que el logo central desaparezca y se muestre la página)
        setTimeout(() => {
            waWidget.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(waWidget, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)"});
            }
        }, 6000);

        // Ocultar al darle a la X
        closeWa.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(waWidget, {
                    opacity: 0, y: 20, duration: 0.3, onComplete: () => {
                        waWidget.style.display = 'none';
                    }
                });
            } else {
                waWidget.style.display = 'none';
            }
        });
    }

 });

 