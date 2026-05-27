document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        
        // 1. Reseta TODOS os botões para o estado Inativo (Cinza)
        buttons.forEach(btn => {
          // Remove as cores do Brand
          btn.classList.remove('text-brand', 'border-brand');
          // Adiciona as cores neutras de volta
          btn.classList.add('border-transparent', 'text-gray-400');
        });

        // 2. Esconde TODOS os blocos de conteúdo
        contents.forEach(content => {
          content.classList.remove('block');
          content.classList.add('hidden');
        });

        // 3. Destaca APENAS o botão clicado (Aplica o Brand)
        // Primeiro tiramos o cinza dele para não dar conflito
        button.classList.remove('border-transparent', 'text-gray-400');
        // Depois aplicamos o seu Brand
        button.classList.add('text-brand', 'border-brand');

        // 4. Mostra o conteúdo correspondente
        const targetId = button.getAttribute('data-target');
        const targetContent = document.querySelector(targetId);
        targetContent.classList.remove('hidden');
        targetContent.classList.add('block');
      });
    });
  });

  