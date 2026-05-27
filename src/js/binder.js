/**
 * Motor de Binding
 * Responsável por ler o HTML e injetar os dados.
 */
class DOMBinder {
    constructor(data) {
        this.data = data;
    }

    init() {
        this.#bindTexts();
        this.#bindHrefs();
        this.#bindSrcs();
        this.#initMapIframes();
    }

    #bindTexts() {
        document.querySelectorAll('[data-text]').forEach(el => {
            const key = el.getAttribute('data-text');
            if (this.data[key]) el.textContent = this.data[key];
        });
    }

    #bindHrefs() {
        document.querySelectorAll('[data-href]').forEach(el => {
            const key = el.getAttribute('data-href');
            if (this.data[key]) el.href = this.data[key];
        });
    }

    #bindSrcs() {
        document.querySelectorAll('[data-src]').forEach(el => {
            const key = el.getAttribute('data-src');
            // Ignora iframes de mapa (eles têm lógica especial de carregamento)
            if (this.data[key] && !el.hasAttribute('data-map-iframe')) {
                el.src = this.data[key];
            }
        });
    }

    /**
     * Lida especificamente com a regra de negócio visual dos mapas
     */
    #initMapIframes() {
        document.querySelectorAll('[data-map-iframe]').forEach(iframe => {
            const key = iframe.getAttribute('data-map-iframe');
            if (this.data[key]) {
                iframe.src = this.data[key];
                iframe.onload = () => {
                    iframe.classList.remove("opacity-0");
                    iframe.classList.add("opacity-100");
                };
            }
        });
    }
}

/**
 * 3. INICIALIZAÇÃO DO SISTEMA
 */
document.addEventListener("DOMContentLoaded", () => {
    const appBinder = new DOMBinder(window.SiteData);
    appBinder.init();
});