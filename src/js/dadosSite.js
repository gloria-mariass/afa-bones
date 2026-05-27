window.SiteData = Object.freeze({
    // Contatos e Redes Sociais
    whatsappLinkVinculo: "https://wa.me/558386881429?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20C%C3%B3rtex%20e%20tenho%20interesse%20em%20fazer%20o%20site%20da%20minha%20empresa%20para%20divulgar%20meu%20neg%C3%B3cio%20e%20vender%20mais%20na%20internet.",
    mensagemCliente: "Olá! Vim pelo site da UNIC Bonés e gostaria de um orçamento para bonés personalizados.",
    numeroCliente: "5584996215534",
    email: "unicbones@gmail.com",
    instagramLink: "https://www.instagram.com/unicbones/",
    instagramArroba: "@unicbones",
    
    // Empresa
    nomeEmpresa: "Unic Bonés",
    cnpj: "62.779.125/0001-19",
    enderecoEmpresa: "Rua Aristides Alves de Moura, Serra Negra do Norte, RN, Brasil",
    linkRotaMaps: "https://maps.app.goo.gl/ijcBYPv95zXH9V6F8",

    // FAQ e Avaliações
    faq: [
        {
            pergunta: "Qual a quantidade mínima para pedidos?",
            resposta: "Trabalhamos com um lote mínimo de 30 unidades por modelo e cor. Isso nos permite garantir o alto padrão de maquinário e o acabamento premium que a sua marca merece."
        },
        {
            pergunta: "Eu não tenho a arte final pronta, vocês ajudam?",
            resposta: "Com certeza! Nossa equipe de design auxilia na vetorização do seu logotipo e cria um layout virtual (mockup) para você aprovar todos os detalhes antes da produção iniciar."
        },
        {
            pergunta: "Qual é o prazo de produção e entrega?",
            resposta: "Nosso prazo de produção é de 15 a 20 dias úteis após a aprovação do layout. Como temos confecção própria, otimizamos o processo ao máximo para despachar seu pedido com rapidez para todo o Brasil."
        }
    ],

    reviews: [
        {
            autor: "Lucas Matheus",
            nota: 5,
            texto: "Fizemos os bonés para o fardamento e para revenda na nossa loja. O bordado em alto relevo ficou insano! Tecido premium e entregaram até antes do prazo estipulado.",
            foto: "https://ui-avatars.com/api/?name=Lucas+Matheus&background=random"
        },
        {
            autor: "Mariana Costa",
            nota: 5,
            texto: "Meus clientes estão elogiando muito! O acabamento é de marca grande. O atendimento pelo WhatsApp também foi nota 10.",
            foto: "https://ui-avatars.com/api/?name=Mariana+Costa&background=random"
        },
        {
            autor: "Carlos Mendes",
            nota: 5,
            texto: "Procurávamos um fornecedor que entregasse uma modelagem que vestisse bem e finalmente achamos. Já virou nosso parceiro oficial para os eventos da empresa.",
            foto: "https://ui-avatars.com/api/?name=Carlos+Mendes&background=random"
        },
        {
            autor: "Rafael Souza",
            nota: 5,
            texto: "Os bonés superaram nossas expectativas! O bordado 3D é de uma qualidade absurda e chegou tudo muito bem embalado. Com certeza faremos novos pedidos para a nossa marca.",
            foto: "https://ui-avatars.com/api/?name=Rafael+Souza&background=random"
        },
        {
            autor: "Fernanda Lima",
            nota: 5,
            texto: "Atendimento excelente desde o primeiro contato. Eles montaram o layout certinho com a nossa logo e o resultado final ficou incrível. Material de primeira linha!",
            foto: "https://ui-avatars.com/api/?name=Fernanda+Lima&background=random"
        }
    ],

    resumoGoogle: {
        status: "EXCELENTE",
        nota: 5,
        totalAvaliacoes: 127
    },

    // --- PROPRIEDADES COMPUTADAS (Getters) ---
    get emailLink() {
        return `mailto:${this.email}`;
    },
    get whatsappLink() {
        return `https://wa.me/${this.numeroCliente}?text=${encodeURIComponent(this.mensagemCliente)}`;
    },
    get whatsappNumero() {
        const cleanNumber = this.numeroCliente.replace(/\D/g, '');
        return `(${cleanNumber.slice(2, 4)}) ${cleanNumber.slice(4, 9)}-${cleanNumber.slice(9)}`;
    }
});