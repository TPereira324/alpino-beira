/* ========================================
   NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
   ======================================== */

// Faz scroll suave quando clicas em links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // Se for o link para o inicio (#hero), vai para o topo absoluto da página
        if (href === '#hero') {
            // Fecha o menu mobile se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            // Fecha o menu mobile se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========================================
   EFEITO NA NAVBAR AO FAZER SCROLL
   ======================================== */

// Muda o estilo da navbar quando fazes scroll para baixo
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0.8rem 0';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1rem 0';
    }
});

/* ========================================
   MENU MOBILE
   ======================================== */

const menuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

/* ========================================
   ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER)
   ======================================== */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Anima apenas uma vez
        }
    });
}, {
    root: null,
    threshold: 0.15, // Dispara quando 15% do elemento está visível
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

/* ========================================
   LINK ATIVO NA NAVEGAÇÃO
   ======================================== */

window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
