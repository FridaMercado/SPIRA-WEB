document.addEventListener("DOMContentLoaded", function() {

    // 1. LÓGICA MENÚ MÓVIL
    const mobileToggle = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileToggle && mobileMenu && closeMobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        });
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = ''; 
        });
    }

    // 2. LÓGICA WIDGET WHATSAPP
    const waWidget = document.getElementById('whatsapp-widget');
    const closeWa = document.getElementById('close-wa-widget');
    const btnFlotanteWa = document.getElementById('btn-contacto-flotante');

    if (waWidget && closeWa && btnFlotanteWa) {
        setTimeout(() => {
            waWidget.style.display = 'flex';
            if (typeof gsap !== 'undefined') gsap.fromTo(waWidget, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)"});
        }, 4000);

        closeWa.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(waWidget, {opacity: 0, y: 20, duration: 0.3, onComplete: () => waWidget.style.display = 'none'});
            } else { waWidget.style.display = 'none'; }
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

    // 3. ANIMACIONES GSAP (Scroll)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A) Iluminación secuencial de los Pasos (Así Trabajamos)
        const pasos = document.querySelectorAll('.paso-item');
        pasos.forEach((paso) => {
            ScrollTrigger.create({
                trigger: paso,
                start: "top 75%", // Se ilumina cuando llega al 75% de la pantalla
                end: "bottom 25%", 
                toggleClass: "activo", // Agrega y quita la clase automáticamente
                markers: false
            });
        });

        // B) Aparición simultánea de Misión, Visión, Valores
        const mvvSection = document.getElementById('mvv-section');
        if (mvvSection) {
            gsap.from(".mvv-card", {
                scrollTrigger: {
                    trigger: mvvSection,
                    start: "top 75%", // Inicia la animación un poco antes
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 2.2, // 🐢 MÁS LENTO: 2.2 segundos para aparecer
                stagger: 0,    // 🐢 0 = Las 3 tarjetas aparecen exactamente al mismo tiempo
                ease: "power2.out"
            });
        }
    }

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