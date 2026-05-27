class GoogleReviewsService {
    constructor(data) { this.data = data; }
    async fetchReviews() {
        return Promise.resolve(this.data.reviews || []);
    }
    async fetchResumo() {
        return Promise.resolve(this.data.resumoGoogle || null);
    }
}

class ReviewRenderer {
    constructor(containerId, reviewService) {
        this.container = document.getElementById(containerId);
        this.service = reviewService;
    }

    async render() {
        if (!this.container) return;
        
        const reviews = await this.service.fetchReviews();
        const resumo = await this.service.fetchResumo();
        const fragment = document.createDocumentFragment();

        // 1. Cria o Observador que vai disparar a animação
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-12');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0ms';
                    }, 700); 

                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        let cardIndex = 0;

        // 2. Cria o card de Resumo (se existir) e adiciona primeiro
        if (resumo) {
            const cardResumo = document.createElement('div');
            cardResumo.className = "opacity-0 translate-y-12 duration-700 ease-out bg-zinc-900 p-6 rounded-xl border border-white/5 shadow-lg flex flex-col items-center justify-center gap-2 text-center hover:-translate-y-2 transition-all";
            cardResumo.style.transitionDelay = `${cardIndex * 150}ms`;
            
            const estrelasResumo = '★'.repeat(resumo.nota || 5) + '☆'.repeat(5 - (resumo.nota || 5));
            
            cardResumo.innerHTML = `
                <h3 class="text-white font-extrabold text-2xl tracking-wide mb-1">${resumo.status}</h3>
                <div class="text-yellow-400 text-2xl mb-1 tracking-widest">${estrelasResumo}</div>
                <p class="text-gray-400 text-sm mb-3">Com base em <strong class="text-white">${resumo.totalAvaliacoes} avaliações</strong></p>
            `;
            
            fragment.appendChild(cardResumo);
            observer.observe(cardResumo);
            cardIndex++;
        }

        // 3. Cria os cards de avaliações na sequência
        reviews.forEach((review) => {
            const nota = review.nota || 5; 
            const estrelas = '★'.repeat(nota) + '☆'.repeat(5 - nota);
            const estrelasHtml = `<span class="text-yellow-400 text-lg">${estrelas}</span>`;

            const card = document.createElement('div');
            card.className = "opacity-0 translate-y-12 duration-700 ease-out bg-zinc-900 p-6 rounded-xl border border-white/5 shadow-lg flex flex-col gap-4 hover:-translate-y-2 transition-all";
            
            // Usa o cardIndex para continuar o atraso a partir de onde o card do resumo parou
            card.style.transitionDelay = `${cardIndex * 150}ms`;
            
            card.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${review.foto}" alt="" class="w-12 h-12 rounded-full object-cover">
                    <div class="flex-1">
                        <div class="flex items-center justify-between w-full">
                            <h4 class="text-white font-bold autor-nome"></h4>
                            <div class="text-gray-500 opacity-40">
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.36 5 12c0-3.36 3.36-7.27 7.19-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.19 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.16 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.09-1.81-.09-1.81z"/>
                                </svg>
                            </div>
                        </div>
                        ${estrelasHtml}
                    </div>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed texto-review"></p>
            `;

            card.querySelector('.autor-nome').textContent = review.autor;
            card.querySelector('.texto-review').textContent = `"${review.texto}"`;

            fragment.appendChild(card);
            observer.observe(card);
            cardIndex++;
        });

        this.container.appendChild(fragment);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const reviewService = new GoogleReviewsService(window.SiteData);
    const reviewRenderer = new ReviewRenderer("reviews-container", reviewService);
    reviewRenderer.render();
});