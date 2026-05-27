class FAQService {
    constructor(data) { this.data = data; }
    getPerguntas() { return this.data.faq || []; }
}

class FAQRenderer {
    constructor(containerId, faqService) {
        this.container = document.getElementById(containerId);
        this.service = faqService;
    }

    render() {
        if (!this.container) return;
        const perguntas = this.service.getPerguntas();
        const fragment = document.createDocumentFragment();

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    
                    setTimeout(() => {
                        entry.target.style.transitionDelay = '0ms';
                    }, 700); 

                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        perguntas.forEach((item, index) => {
            const faqEl = document.createElement('div');
            
            faqEl.className = "bg-zinc-800 rounded-lg overflow-hidden transition-all duration-700 ease-out opacity-0 translate-y-8";
            
            faqEl.style.transitionDelay = `${index * 150}ms`;
            
            faqEl.innerHTML = `
                <button class="w-full px-6 py-4 text-left flex justify-between items-center text-white font-semibold hover:text-brand transition-colors">
                    <span class="faq-pergunta"></span>
                    <svg class="transform transition-transform duration-300 pointer-events-none icon-arrow w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>                </button>
                <div class="px-6 pb-4 text-gray-400 hidden content-box faq-resposta"></div>
            `;

            faqEl.querySelector('.faq-pergunta').textContent = item.pergunta;
            faqEl.querySelector('.faq-resposta').textContent = item.resposta;

            const btn = faqEl.querySelector('button');
            const content = faqEl.querySelector('.content-box');
            const icon = faqEl.querySelector('.icon-arrow');

            // 4. Lógica original de clique mantida intacta
            btn.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');
                
                this.container.querySelectorAll('.content-box').forEach(el => el.classList.add('hidden'));
                this.container.querySelectorAll('.icon-arrow').forEach(el => el.style.transform = 'rotate(0deg)');

                if (!isOpen) {
                    content.classList.remove('hidden');
                    icon.style.transform = 'rotate(180deg)';
                }
            });

            fragment.appendChild(faqEl);
            
            observer.observe(faqEl);
        });

        this.container.appendChild(fragment);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const faqService = new FAQService(window.SiteData);
    const faqRenderer = new FAQRenderer("faq-container", faqService);
    faqRenderer.render();
});