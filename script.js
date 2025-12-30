// ============================================
// SISTEMA DE FILTRO DE PROJETOS
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Função auxiliar para animar cards com delay
function animateCards(cards) {
    cards.forEach((card, index) => {
        // Remove a classe para resetar a animação
        card.classList.remove('fade-in');
        card.style.opacity = '0';
        
        // Força um reflow para reiniciar a animação
        void card.offsetWidth;
        
        // Adiciona delay escalonado (0.1s entre cada card)
        card.style.setProperty('--delay', `${index * 0.1}s`);
        
        // Adiciona a classe de animação
        card.classList.add('fade-in');
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        // Remove classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adiciona classe 'active' ao botão clicado
        button.classList.add('active');
        
        const visibleCards = [];
        
        // Filtra os projetos
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'todos' || category === filterValue) {
                card.classList.remove('hidden');
                visibleCards.push(card);
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
        
        // Anima apenas os cards visíveis
        animateCards(visibleCards);
    });
});

// ... (Dark Mode code remains same) ...

// ============================================
// ANIMAÇÃO DE ENTRADA DOS CARDS (Scroll)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    let delayIndex = 0;
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona delay apenas se o elemento ainda não foi animado
            if (!entry.target.classList.contains('fade-in')) {
                entry.target.style.setProperty('--delay', `${delayIndex * 0.1}s`);
                entry.target.classList.add('fade-in');
                delayIndex++;
                
                // Para de observar após animar
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    // Garante opacidade 0 inicial
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
const backToTopButton = document.getElementById('backToTop');

// Função para verificar a posição do scroll e mostrar/ocultar o botão
function toggleBackToTopButton() {
    // Calcula 50% da altura total da página
    const scrollThreshold = (document.documentElement.scrollHeight - window.innerHeight) * 0.5;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostra o botão se o usuário rolou mais de 50% da página
    if (scrollPosition > scrollThreshold) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// Adiciona o listener de scroll
window.addEventListener('scroll', toggleBackToTopButton);

// Função para rolar suavemente até o topo
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});