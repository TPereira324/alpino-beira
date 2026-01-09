/* ========================================
   NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
   ======================================== */

// Faz scroll suave quando clicas em links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
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

    if (window.scrollY > 100) {
        // Quando scrollas mais de 100px, a navbar fica mais opaca e com sombra
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    } else {
        // Volta ao estado normal
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

/* ========================================
   LINK ATIVO NA NAVEGAÇÃO
   ======================================== */

// Marca qual o link de navegação ativo baseado na secção onde estás
window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');

    // Verifica qual a secção mais próxima do topo
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Remove a classe 'active' de todos os links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        // Adiciona a classe 'active' apenas ao link da secção atual
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
