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

/* ========================================
   LIGHTBOX (GALERIA)
   ======================================== */

const lightbox = document.getElementById('lightbox');
const lightboxImgPlaceholder = document.getElementById('lightbox-img-placeholder');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

// Seleciona todos os placeholders de imagem dentro da galeria
const galleryItems = document.querySelectorAll('.galeria .img-placeholder');

galleryItems.forEach(item => {
    // Torna os itens clicáveis
    item.style.cursor = 'pointer';

    item.addEventListener('click', function () {
        const content = this.textContent; // Pega o texto do placeholder
        const style = window.getComputedStyle(this);
        const background = style.background; // Pega o gradiente de fundo

        // Define o conteúdo e estilo no lightbox
        lightboxImgPlaceholder.textContent = content;
        lightboxImgPlaceholder.style.background = background;
        lightboxImgPlaceholder.style.width = '100%';
        lightboxImgPlaceholder.style.height = '100%';
        lightboxImgPlaceholder.style.display = 'flex';
        lightboxImgPlaceholder.style.alignItems = 'center';
        lightboxImgPlaceholder.style.justifyContent = 'center';

        lightboxCaption.textContent = content;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll do body
    });
});

// Fechar Lightbox
if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura scroll
    });
}

// Fechar ao clicar fora da imagem
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/* ========================================
   BOTÃO VOLTAR AO TOPO
   ======================================== */

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}