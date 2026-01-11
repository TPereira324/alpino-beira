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
        navbar.style.padding = '1.3rem 0';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '1.5rem 0';
    }
});

/* ========================================
   BARRA DE PROGRESSO DE SCROLL
   ======================================== */

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
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
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

// Seleciona todas as imagens da galeria (incluindo expandida)
const galleryItems = document.querySelectorAll('.galeria img, .galeria-expandida img');

galleryItems.forEach(item => {
    // Torna os itens clicáveis
    item.style.cursor = 'pointer';

    item.addEventListener('click', function () {
        const imgSrc = this.src; // Pega o src da imagem
        const altText = this.alt; // Pega o texto alternativo

        // Define a imagem e legenda no lightbox
        lightboxImg.src = imgSrc;
        lightboxImg.alt = altText;
        lightboxCaption.textContent = altText;

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

// Botão Carregar Mais Imagens (WhatsApp)
const btnCarregarMais = document.getElementById('btn-carregar-mais');
const galeriaExpandida = document.getElementById('galeria-expandida');
const btnCarregarMaisLotes = document.getElementById('btn-carregar-mais-lotes');

let loteAtual = 1;
const totalLotes = 3;

if (btnCarregarMais && galeriaExpandida) {
    btnCarregarMais.addEventListener('click', function () {
        if (galeriaExpandida.style.display === 'none') {
            galeriaExpandida.style.display = 'block';
            this.textContent = 'Ver Menos Imagens';
            btnCarregarMaisLotes.style.display = 'inline-block';

            // Adicionar animação suave
            galeriaExpandida.style.opacity = '0';
            galeriaExpandida.style.transform = 'translateY(20px)';
            galeriaExpandida.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                galeriaExpandida.style.opacity = '1';
                galeriaExpandida.style.transform = 'translateY(0)';
            }, 50);

            // Scroll suave para a galeria expandida
            setTimeout(() => {
                galeriaExpandida.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else {
            // Esconder todos os lotes
            document.querySelectorAll('.lote2, .lote3').forEach(item => {
                item.style.display = 'none';
            });

            galeriaExpandida.style.opacity = '0';
            galeriaExpandida.style.transform = 'translateY(20px)';

            setTimeout(() => {
                galeriaExpandida.style.display = 'none';
                this.textContent = 'Ver Mais Imagens';
                btnCarregarMaisLotes.style.display = 'none';
                loteAtual = 1;
            }, 500);
        }
    });
}

// Botão para carregar mais lotes dentro da galeria expandida
if (btnCarregarMaisLotes) {
    btnCarregarMaisLotes.addEventListener('click', function () {
        if (loteAtual < totalLotes) {
            loteAtual++;
            const proximoLote = document.querySelectorAll('.lote' + loteAtual);

            // Mostrar o próximo lote com animação
            proximoLote.forEach((item, index) => {
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.transition = 'all 0.5s ease';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });

            // Se for o último lote, esconder o botão
            if (loteAtual === totalLotes) {
                setTimeout(() => {
                    this.style.display = 'none';
                }, proximoLote.length * 100 + 500);
            }

            // Scroll suave para as novas imagens
            setTimeout(() => {
                proximoLote[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 200);
        }
    });
}