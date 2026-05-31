(() => {
    // Configurações
    const CONFIG = {
        PRODUTOS_JSON_PATH: '/assets/produtos.json', 
        SELECTORS: {
            PRODUTOS_CONTAINER: '#produtos-carousel'
        }
    };

    // Criação do HTML do Card de Produto
    const createProductCard = (item) => {
        // Monta as tags de qualidades (pílulas cinzas)
        const tagsHtml = item.beneficios.map(ben => `
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">${ben}</span>
        `).join('');

        return `
        <div class="flex-shrink-0 w-[85%] sm:w-[350px] md:w-auto snap-center bg-pure-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
            <img src="${item.imagem}" alt="${item.titulo}" class="w-full h-64 object-cover bg-gray-200" loading="lazy">
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-2xl font-semibold text-industrial-black mb-4">${item.titulo}</h3>
                
                <div class="flex flex-wrap gap-2 mb-8">
                    ${tagsHtml}
                </div>
                
                <div class="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                    <div class="text-xs text-gray-500 font-medium leading-tight max-w-[110px]">
                        Qtd. mínima:<br>
                        <span class="text-industrial-black text-sm font-bold">${item.quantidade_minima} unidades</span>
                    </div>
                    <a href="https://wa.me/55SEUNUMERO?text=Olá, tenho interesse no modelo: ${item.titulo}" target="_blank" class="flex-1 bg-red-600 hover:bg-red-700 text-pure-white font-bold py-3 px-2 rounded-xl text-center transition duration-300 text-sm sm:text-base">
                        Peça agora
                    </a>
                </div>
            </div>
        </div>
        `;
    };

    // Serviço de Busca de Dados
    const DataService = {
        async fetchJSON(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
            return response.json();
        }
    };

    // Renderizador na Tela
    const UIRenderer = {
        renderProdutos(containerId, data) {
            const container = document.querySelector(containerId);
            if (container) {
                container.innerHTML = data.map(item => createProductCard(item)).join('');
            }
        },
        showError(containerId) {
            const container = document.querySelector(containerId);
            if (container) container.innerHTML = `<p class="text-gray-500 text-center w-full py-10">Falha ao carregar os produtos.</p>`;
        }
    };

    // Controlador Principal
    const AppController = {
        async init() {
            try {
                const dataProdutos = await DataService.fetchJSON(CONFIG.PRODUTOS_JSON_PATH);
                UIRenderer.renderProdutos(CONFIG.SELECTORS.PRODUTOS_CONTAINER, dataProdutos);
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
                UIRenderer.showError(CONFIG.SELECTORS.PRODUTOS_CONTAINER);
            }
        }
    };

    document.addEventListener('DOMContentLoaded', () => AppController.init());

})();