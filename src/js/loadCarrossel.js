(() => {
    const CONFIG = {
        DATA_PATH: '/assets/servicos.json',
        INSTA_DATA_PATH: '/assets/post_instagram.json', // Caminho novo
        DEFAULT_LOGO: 'endereco-da-logo',
        CAROUSEL_INTERVAL: 15000,
        SELECTORS: {
            CONTAINER: '#carousel-content',
            MAIN_EL: '#default-carousel',
            BTN_PREV: '[data-carousel-prev]',
            BTN_NEXT: '[data-carousel-next]',
            PRODUTOS_CONTAINER: '#produtos-carousel',
            INSTA_CONTAINER: '#insta-carousel-content' // Container novo
        }
    };

    // --- DADOS DOS PRODUTOS ---
    const PRODUTOS_DATA = [
        {
            titulo: "Esportivo", preco: "R$ 39,90", imagem: "/img/bones/Bone1.png",
            beneficios: ["Tecido leve de secagem rápida", "Faixa interna antitranspirante", "Ajuste anatômico para alta performance"]
        },
        {
            titulo: "Aba Reta", preco: "R$ 45,90", imagem: "/img/bones/Bone2.png",
            beneficios: ["Aba estruturada com costura reforçada", "Modelagem Streetwear premium", "Copa rígida resistente ao desbotamento"]
        },
        {
            titulo: "Trucker", preco: "R$ 35,00", imagem: "/img/bones/Bone1.png",
            beneficios: ["Tela traseira de alta respirabilidade", "Frente estruturada com espuma premium", "Fecho Snapback de alta durabilidade"]
        },
        {
            titulo: "Americano", preco: "R$ 42,50", imagem: "/img/bones/Bone2.png",
            beneficios: ["Copa alta com modelagem de 5 gomos", "Acabamento frontal sem costura central", "Estrutura firme e visual clássico"]
        },
        {
            titulo: "Dead Hat", preco: "R$ 49,90", imagem: "/img/bones/Bone1.png",
            beneficios: ["100% Algodão com toque macio", "Fivela de metal ajustável", "Design desestruturado que veste bem"]
        }
    ];

    const optionsCarousel = { defaultPosition: 0, interval: CONFIG.CAROUSEL_INTERVAL };

    // --- RENDERIZAÇÃO DOS SERVIÇOS ---
    const createCard = (item) => {
        const bgClass = 'bg-industrial-black';
        return `
        <div class="flex flex-col-reverse md:flex-row w-full h-full md:min-h-[450px] ${bgClass} rounded-2xl !overflow-hidden shadow-2xl border border-white/5 transform-gpu">
            <div class="w-full md:!w-1/2 md:flex-none p-6 md:p-10 flex flex-col relative overflow-y-auto md:overflow-visible">
                <div class="flex items-center gap-2 mb-4 md:mb-0 md:absolute md:top-10 md:left-10">
                    <img src="${CONFIG.DEFAULT_LOGO}" alt="Logo" class="w-5 opacity-80 shadow-sm mt-1" />
                    <span class="text-white/60 text-[10px] leading-none mt-[2px] font-mono tracking-[0.2em] uppercase">@CortexLaser</span>
                </div>
                <div class="my-auto flex flex-col pt-4 md:pt-0">
                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">${item.titulo}</h3>
                    <p class="text-gray-300 text-sm md:text-base leading-relaxed">${item.descricao || ''}</p>
                </div>
            </div>
            <div data-modal-image="${item.imagem}" class="w-full md:!w-1/2 md:flex-none h-[220px] md:!h-auto relative group !overflow-hidden cursor-pointer bg-black !rounded-t-2xl md:!rounded-none md:!rounded-r-2xl">
                <img src="${item.imagem}" alt="${item.titulo}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 opacity-90 group-hover:scale-105 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <svg class="w-12 h-12 text-white/80 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                </div>
            </div>
        </div>
        `;
    };

    // --- RENDERIZAÇÃO DOS PRODUTOS ---
    const createProductCard = (item) => {
        const listItemsHtml = item.beneficios.map(ben => `
            <li class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                ${ben}
            </li>
        `).join('');

        return `
        <div class="w-[85vw] sm:w-[320px] shrink-0 snap-center bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-white/10 flex flex-col transition-transform duration-300 hover:-translate-y-2">
            <div class="h-64 bg-zinc-800 relative">
                <img src="${item.imagem}" alt="${item.titulo}" class="w-full h-full object-cover" loading="lazy" />
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-4 gap-2">
                    <h3 class="text-2xl font-bold text-white leading-tight flex-1">${item.titulo}</h3>
                    <div class="flex flex-col items-end shrink-0 mt-1">
                        <div class="flex items-baseline gap-1">
                            <span class="text-brand text-xl font-bold">${item.preco}</span>
                        </div>
                        <span class="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">mínimo 30 unid.</span>
                    </div>
                </div>
                <ul class="space-y-2 mb-8 text-sm text-gray-400 flex-grow mt-2">${listItemsHtml}</ul>
                <div class="mt-auto w-full flex justify-center">
                    <div class="relative inline-flex group w-full">
                        <span class="absolute inset-0 z-0 rounded-lg bg-verde-site anima-pulso"></span>
                        <button class="relative z-10 w-full inline-flex h-14 items-center justify-center overflow-hidden rounded-lg bg-verde-site px-6 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-verde-hover cursor-pointer shadow-xl">
                            <span class="relative z-10 uppercase tracking-widest text-sm">Pedir Orçamento</span>
                            <div class="absolute inset-0 z-20 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                                <div class="relative h-full w-12 bg-white/30"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    const ModalService = {
        element: null, img: null,
        init() {
            this.element = document.createElement('div');
            this.element.className = 'fixed inset-0 z-50 hidden flex items-center justify-center bg-black/90 p-4 opacity-0 transition-opacity duration-300';
            this.element.innerHTML = `
                <div class="relative max-w-5xl w-full flex justify-center items-center">
                    <button id="close-modal" class="absolute -top-12 right-0 text-white hover:text-gray-300 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <img id="modal-image" src="" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain scale-95 transition-transform duration-300" />
                </div>
            `;
            document.body.appendChild(this.element);
            this.img = this.element.querySelector('#modal-image');
            this.element.addEventListener('click', (e) => {
                if (e.target === this.element || e.target.closest('#close-modal')) this.close();
            });
        },
        open(imageSrc) {
            this.img.src = imageSrc;
            this.element.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                this.element.classList.remove('opacity-0');
                this.img.classList.remove('scale-95');
                this.img.classList.add('scale-100');
            }, 10);
        },
        close() {
            this.element.classList.add('opacity-0');
            this.img.classList.remove('scale-100');
            this.img.classList.add('scale-95');
            setTimeout(() => {
                this.element.classList.add('hidden');
                this.img.src = '';
                document.body.style.overflow = ''; 
            }, 300);
        }
    };

    const DataService = {
        async fetchJSON(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            return response.json();
        }
    };

    const AssetService = {
        preloadImages(dados) {
            const promessas = dados.map((item) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = item.imagem;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            return Promise.all(promessas);
        }
    };

    const UIRenderer = {
        renderSlides(container, data) {
            container.innerHTML = data.map((item, idx) => `
                <div class="hidden duration-700 ease-in-out h-full w-full" data-carousel-item="${idx === 0 ? 'active' : ''}">
                    <div class="h-full flex items-center px-10 md:px-12 py-2 md:py-0">
                        ${createCard(item)}
                    </div>
                </div>
            `).join('');
        },
        renderProdutos(containerId, data) {
            const container = document.querySelector(containerId);
            if(container) {
                container.innerHTML = data.map(item => createProductCard(item)).join('');
            }
        },
        // --- NOVA FUNÇÃO: RENDERIZA O INSTAGRAM ---
        renderInstagram(containerId, data) {
            const container = document.querySelector(containerId);
            if(!container) return;

            // Duplica os dados do array para que o letreiro gire infinitamente sem espaço em branco
            const infiniteData = [...data, ...data];

            container.innerHTML = infiniteData.map((post, index) => {
                // Adiciona aria-hidden nos clones para não duplicar no leitor de tela
                const ariaHidden = index >= data.length ? 'aria-hidden="true"' : '';
                
                return `
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="w-[50vw] sm:w-[200px] md:w-[260px] mx-4 aspect-[3/5] relative group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl rounded-2xl overflow-hidden border border-white/10 block shrink-0" ${ariaHidden}>
                  <img src="${post.imagem}" alt="Instagram" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div class="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white drop-shadow-lg scale-50 group-hover:scale-100 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                    </svg>
                  </div>
                </a>
                `;
            }).join('');
        },
        showError(containerId) {
            const container = document.querySelector(containerId);
            if(container) container.innerHTML = `<p class="text-white text-center">Falha ao carregar.</p>`;
        }
    };

    const CarouselManager = {
        // ... inalterado
        instance: null,
        init(targetElement, container) {
            if (!window.Carousel) return null;
            const items = Array.from(container.querySelectorAll('[data-carousel-item]')).map((el, index) => ({
                position: index, el: el
            }));
            const options = { ...optionsCarousel, items };
            this.instance = new Carousel(targetElement, items, options);
            this.setupButtons(this.instance);
            setTimeout(() => this.instance.cycle(), 100);
            return this.instance;
        },
        setupButtons(carousel) {
            const btnPrev = document.querySelector(CONFIG.SELECTORS.BTN_PREV);
            const btnNext = document.querySelector(CONFIG.SELECTORS.BTN_NEXT);
            if (btnPrev) btnPrev.onclick = () => carousel.prev();
            if (btnNext) btnNext.onclick = () => carousel.next();
        }
    };

    const AppController = {
        async init() {
            // Inicializa Flowbite (Serviços)
            const container = document.querySelector(CONFIG.SELECTORS.CONTAINER);
            const targetElement = document.querySelector(CONFIG.SELECTORS.MAIN_EL);
            
            // Inicializa Produtos (Estáticos no JS)
            UIRenderer.renderProdutos(CONFIG.SELECTORS.PRODUTOS_CONTAINER, PRODUTOS_DATA);

            ModalService.init();

            if (container) {
                container.addEventListener('click', (e) => {
                    const card = e.target.closest('[data-modal-image]');
                    if (card) ModalService.open(card.getAttribute('data-modal-image'));
                });
            }

            // Tenta carregar Serviços do JSON
            if (container && targetElement) {
                try {
                    const dataServicos = await DataService.fetchJSON(CONFIG.DATA_PATH);
                    await AssetService.preloadImages(dataServicos);
                    UIRenderer.renderSlides(container, dataServicos);
                    CarouselManager.init(targetElement, container);
                } catch (err) {
                    console.error("Erro serviços:", err);
                    UIRenderer.showError(CONFIG.SELECTORS.CONTAINER);
                }
            }

            // Tenta carregar Instagram do JSON
            try {
                const dataInsta = await DataService.fetchJSON(CONFIG.INSTA_DATA_PATH);
                UIRenderer.renderInstagram(CONFIG.SELECTORS.INSTA_CONTAINER, dataInsta);
            } catch (err) {
                console.error("Erro ao carregar instagram.json:", err);
                UIRenderer.showError(CONFIG.SELECTORS.INSTA_CONTAINER);
            }
        }
    };

    document.addEventListener('DOMContentLoaded', () => AppController.init());

    // Função global de produtos mantida
    window.moverCarrosselProdutos = function(direcao) {
        const carrossel = document.querySelector(CONFIG.SELECTORS.PRODUTOS_CONTAINER);
        if(!carrossel) return;
        const tamanhoScroll = 336;
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        if (direcao === 'next') {
            if (carrossel.scrollLeft >= maxScroll - 10) carrossel.scrollTo({ left: 0, behavior: 'smooth' }); 
            else carrossel.scrollBy({ left: tamanhoScroll, behavior: 'smooth' }); 
        } else {
            if (carrossel.scrollLeft <= 10) carrossel.scrollTo({ left: maxScroll, behavior: 'smooth' }); 
            else carrossel.scrollBy({ left: -tamanhoScroll, behavior: 'smooth' }); 
        }
    };

})();