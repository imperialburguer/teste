// Variáveis globais
let cart = []; // Array para armazenar os itens do carrinho
let isCardPayment = false; // Controla se o pagamento é com cartão
const maquininhaTax = 4.00; // Taxa de maquininha para pagamento com cartão
const ketchupGratuito = 1; // Quantidade gratuita de ketchup
const maioneseGratuita = 1; // Quantidade gratuita de maionese
let descontoCupom = 0; // Variável para armazenar o desconto atual
let cupomAplicado = null; // Variável para armazenar o cupom aplicado
let freteGratis = false; // Variável para controlar o frete grátis

// Cupons válidos com regras
const cuponsValidos = {
    "ENTREGAGRATIS": {
        tipo: "frete-gratis",
        regra: {
            tipo: "valor-minimo",
            valor: 35.00,
            produtos: [1, 2, 3, 4, 5, 6],
        },
        validoAte: "2025-03-13",
        maximoUsos: 20,
        usos: 0
    },
    "IMPERIAL5": {
        tipo: "desconto",
        valor: 5,
        regra: {
            tipo: "valor-minimo",
            valor: 30.00,
            produtos: [3, 4],
        },
        validoAte: "2025-03-13",
        maximoUsos: 20,
        usos: 0
    }
};

// Exemplo de produtos
const produtos = [
    {
        id: 1,
        nome: "Combo X-Burguer",
        preco: 15.00,
        descricao: "Clássico e irresistível! Hambúrguer suculento, queijo derretido, batata frita crocante e refrigerante gelado!",
        imagem: "images/comboxburguer.png",
        destaque: true // Produto em destaque
    },
    {
        id: 2,
        nome: "Combo X-Salada",
        preco: 16.00,
        descricao: "Hambúrguer suculento com queijo, alface, tomate e maionese especial. Acompanha batata frita crocante e refrigerante gelado!",
        imagem: "images/comboxsalada.png",
        destaque: true // Produto em destaque
    },
    {
        id: 3,
        nome: "Combo X-Tudo",
        preco: 23.00,
        descricao: "Hambúrguer suculento com queijo, presunto, bacon, ovo, alface, tomate. Acompanha batata frita crocante e refrigerante gelado!",
        imagem: "images/comboxtudo.png",
        destaque: true // Produto em destaque
    },
    {
        id: 4,
        nome: "Combo X-Bacon",
        preco: 20.00,
        descricao: "Hambúrguer suculento com queijo derretido e muito bacon crocante! Acompanha batata frita e refrigerante gelado!",
        imagem: "images/comboxbacon.png",
        destaque: true // Produto em destaque
    },
    {
        id: 5,
        nome: "Combo Duplo Burguer",
        preco: 22.00,
        descricao: "hambúrguer suculento, queijo derretido e muito sabor! Acompanha batata frita crocante e refrigerante gelado!",
        imagem: "images/comboduploburguer.png",
        destaque: true // Produto em destaque
    },
    {
        id: 6,
        nome: "Combo Imperial",
        preco: 31.00,
        descricao: "Uma experiência digna de rei, experimente e apaixone-se. Hamburguer, batata frita crocante e refrigerante gelado!",
        imagem: "images/comboimperial.png",
        destaque: true // Produto em destaque
    },
    // Outros produtos...
    {
        id: 7,
        nome: "X-Burguer",
        preco: 8.00,
        descricao: "Delicioso hambúrguer com pão, carne e mussarela!",
        imagem: "images/xburguer.png",
        categoria: "Hambúrgueres",
        subcategoria: "X",
    },
    {
        id: 8,
        nome: "X-Salada",
        preco: 9.00,
        descricao: "Delicioso hambúrguer com pão, carne, mussarela e salada!",
        imagem: "images/xsalada.png",
        categoria: "Hambúrgueres",
        subcategoria: "X",
    },
    {
        id: 9,
        nome: "X-Frango",
        preco: 12.00,
        descricao: "Delicioso hambúrguer com pão, frango empanado e salada, alface e tomate!",
        imagem: "images/xfrango.png",
        categoria: "Hambúrgueres",
        subcategoria: "X",
    },
    {
        id: 10,
        nome: "X-Bacon",
        preco: 12.00,
        descricao: "Delicioso hambúrguer com pão, carne, bacon, mussarela e salada, alface e tomate!",
        imagem: "images/xbacon.png",
        categoria: "Hambúrgueres",
        subcategoria: "X",
    },
    {
        id: 11,
        nome: "X-Tudo",
        preco: 15.00,
        descricao: "Delicioso hambúrguer com pão, carne, presunto, bacon, milho, batata palha, ovo e salada, alface e tomate!",
        imagem: "images/xtudo.png",
        categoria: "Hambúrgueres",
        subcategoria: "X",
    },
    {
        id: 12,
        nome: "Duplo Burguer",
        preco: 14.00,
        descricao: "Um delicioso hambúrguer clássico, com pão, duas carnes, duas mussarela e salada, alface e tomate!",
        imagem: "images/duploburguer.png",
        categoria: "Hambúrgueres",
        subcategoria: "Duplos",
    },
    {
        id: 13,
        nome: "Duplo Cheddar",
        preco: 17.00,
        descricao: "Um delicioso hambúrguer clássico, com pão, duas carnes, dois cheddar, bacon e salada, alface e tomate!",
        imagem: "images/duplocheddar.png",
        categoria: "Hambúrgueres",
        subcategoria: "Duplos",
    },
    {
        id: 14,
        nome: "Especial Imperial",
        preco: 23.00,
        descricao: "Um deliciso hambúrguer especial, com pão, três carnes, três queijos, cheddar, bacon, ovo, batata palha, cebola e salada, alface e tomate!",
        imagem: "images/especialimperial.png",
        categoria: "Hambúrgueres",
        subcategoria: "Especial",
    },
    {
        id: 15,
        nome: "Batata Frita P",
        preco: 7.00,
        descricao: "Deliciosa batata frita tamanho P, crocante e macia!",
        imagem: "images/batatap.png",
        categoria: "Porções"
    },
    {
        id: 16,
        nome: "Batata Frita G",
        preco: 9.00,
        descricao: "Deliciosa batata frita tamanho G, crocante e macia!",
        imagem: "images/batatag.png",
        categoria: "Porções"
    },
    {
        id: 17,
        nome: "Batata Frita Imperial",
        preco: 15.00,
        descricao: "Deliciosa batata frita para se deliciar, com cheddar, katupiry e bacon!",
        imagem: "images/batataimperial.png",
        categoria: "Porções"
    },
    {
        id: 18,
        nome: "Linguiça Imperial",
        preco: 20.00,
        descricao: "Deliciosa linguiça calabresa com cebola!",
        imagem: "images/linguica.png",
        categoria: "Porções"
    },
    {
        id: 19,
        nome: "Ketchup",
        preco: 1.00,
        descricao: "Molho de ketchup. O primeiro é grátis!",
        imagem: "images/ketchup.png",
        categoria: "molhos"
    },
    {
        id: 20,
        nome: "Maionese",
        preco: 1.00,
        descricao: "Molho de maionese. O primeiro é grátis!",
        imagem: "images/maionese.png",
        categoria: "molhos"
    },
    {
        id: 21,
        nome: "Molho Especial",
        preco: 2.00,
        descricao: "Molho de maionese temperada!",
        imagem: "images/molhoespecial.png",
        categoria: "molhos"
    },
    {
        id: 22,
        nome: "Refrigerante Laranja 250ml",
        preco: 3.00,
        descricao: "Geladinho para refrescar e acompanhar o seu lanche!",
        imagem: "images/laranja250ml.png",
        categoria: "Bebidas"
    },
    {
        id: 23,
        nome: "Refrigerante Uva 250ml",
        preco: 3.00,
        descricao: "Geladinho para refrescar e acompanhar o seu lanche!",
        imagem: "images/uva250ml.png",
        categoria: "Bebidas"
    },
    {
        id: 24,
        nome: "Refrigerante Guaraná 250ml",
        preco: 3.00,
        descricao: "Geladinho para refrescar e acompanhar o seu lanche!",
        imagem: "images/guarana250ml.png",
        categoria: "Bebidas"
    },
    {
        id: 25,
        nome: "Refrigerante Jeri Cola 250ml",
        preco: 3.00,
        descricao: "Geladinho para refrescar e acompanhar o seu lanche!",
        imagem: "images/jeri250ml.png",
        categoria: "Hambúrgueres",
        subcategoria: "Combos"
    },
];

// Função para exibir a página inicial (Menu, Carrossel e Destaques)
function showInicio() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('categorias').style.display = 'flex';
    document.getElementById('carrossel').style.display = 'block';
    document.getElementById('destaque').style.display = 'block';
    document.getElementById('catalogo').style.display = 'none';
    document.getElementById('cartIcon').style.display = 'block';
    document.getElementById('mainFooter').style.display = 'block';
    document.getElementById('cartDetails').style.display = 'none';
    loadDestaqueProducts(); // Carrega os produtos em destaque
}

// Função para exibir/ocultar o menu de categorias em dispositivos móveis
function toggleMenu() {
    const categorias = document.getElementById('categorias');
    categorias.classList.toggle('active');
}

// Função para carregar os produtos em destaque
function loadDestaqueProducts() {
    const produtosDestaqueContainer = document.getElementById('produtos-destaque');
    produtosDestaqueContainer.innerHTML = '';

    produtos.forEach(produto => {
        if (produto.destaque) {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            `;
            produtosDestaqueContainer.appendChild(produtoDiv);
        }
    });
}

// Função para filtrar produtos por categoria
function filterProducts(categoria, subcategoria = null) {
    document.getElementById('carrossel').style.display = 'none';
    document.getElementById('destaque').style.display = 'none';
    document.getElementById('catalogo').style.display = 'block';

    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
        if (produto.categoria === categoria && (!subcategoria || produto.subcategoria === subcategoria)) {
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('produto');
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
            `;
            produtosContainer.appendChild(produtoDiv);
        }
    });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = cart.find(p => p.id === id);
    if (itemExistente) {
        itemExistente.quantity += 1;
    } else {
        const novoItem = { ...produto, quantity: 1 };
        cart.push(novoItem);
    }
    updateCart();
}

// Função para exibir/ocultar o campo de cupom
function toggleCupomInput() {
    const cupomInputContainer = document.getElementById('cupomInputContainer');
    const toggleCupomButton = document.getElementById('toggleCupomButton');
    const arrow = toggleCupomButton.querySelector('.arrow');
    if (cupomInputContainer.style.display === 'none' || cupomInputContainer.style.display === '') {
        cupomInputContainer.style.display = 'flex';
        arrow.classList.add('rotate');
    } else {
        cupomInputContainer.style.display = 'none';
        arrow.classList.remove('rotate');
    }
}

// Função para aplicar o cupom
function aplicarCupom() {
    const cupomInput = document.getElementById('cupomInput').value.trim();
    const cupom = cuponsValidos[cupomInput];
    const total = calcularTotal();
    const dataAtual = new Date();

    if (!cupom) {
        alert("Cupom inválido!");
        return;
    }

    // Verifica a validade do cupom
    const dataValidade = new Date(cupom.validoAte);
    if (dataAtual > dataValidade) {
        alert("Cupom expirado!");
        return;
    }

    // Verifica o número de usos do cupom
    if (cupom.usos >= cupom.maximoUsos) {
        alert("Número máximo de usos do cupom atingido!");
        return;
    }

    // Verifica o valor mínimo do pedido
    if (cupom.regra.tipo === "valor-minimo" && total < cupom.regra.valor) {
        alert(`Cupom válido apenas para pedidos acima de R$ ${cupom.regra.valor.toFixed(2)}.`);
        return;
    }

    // Verifica se o cupom se aplica aos produtos no carrinho
    const produtosValidos = cupom.regra.produtos;
    const produtosNoCarrinho = cart.map(item => item.id);
    const cupomValidoParaCarrinho = produtosNoCarrinho.every(produtoId => produtosValidos.includes(produtoId));

    if (!cupomValidoParaCarrinho) {
        alert("Cupom não se aplica aos produtos no carrinho!");
        return;
    }

    if (cupom.tipo === "frete-gratis") {
        freteGratis = true; // Ativa o frete grátis
        cupomAplicado = cupomInput; // Armazena o cupom aplicado
        alert("Cupom aplicado! Frete grátis!");
    } else if (cupom.tipo === "desconto") {
        descontoCupom = cupom.valor; // Aplica o desconto
        cupomAplicado = cupomInput; // Armazena o cupom aplicado
        alert(`Cupom aplicado! Desconto de ${cupom.valor}%.`);
    }

    // Atualiza a exibição do cupom aplicado
    document.getElementById('toggleCupomButton').style.display = 'none';
    document.getElementById('cupomAplicadoContainer').style.display = 'flex';
    document.getElementById('cupomAplicadoText').textContent = cupomAplicado; // Exibe o nome do cupom

    // Atualiza o número de usos do cupom
    cuponsValidos[cupomInput].usos += 1;

    // Atualiza o carrinho
    updateCart();
}

// Função para remover o cupom
function removerCupom() {
    descontoCupom = 0;
    freteGratis = false;
    cupomAplicado = null;
    document.getElementById('cupomInput').value = '';
    document.getElementById('cupomAplicadoContainer').style.display = 'none';
    document.getElementById('toggleCupomButton').style.display = 'block';
    updateCart();
}

// Função para calcular o total do carrinho
function calcularTotal() {
    let total = cart.reduce((sum, item) => sum + item.preco * item.quantity, 0);
    return total;
}

// Função para atualizar o carrinho
function updateCart(deliveryFee = 0) {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho
    let total = 0;

    // Itera sobre cada item no carrinho
    cart.forEach(item => {
        const price = item.preco;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const itemName = document.createElement('p');

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = item.nome === 'Ketchup' ? ketchupGratuito : maioneseGratuita;

            // Se a quantidade for menor ou igual à gratuita, não cobra
            if (item.quantity <= quantidadeGratuita) {
                itemName.textContent = `${item.nome} - Gratuito (${item.quantity}x)`;
            } else {
                // Calcula a quantidade excedente e cobra R$ 1,00 por unidade
                const extraQuantity = item.quantity - quantidadeGratuita;
                itemName.textContent = `${item.nome} - R$ ${(price * extraQuantity).toFixed(2)} (${item.quantity}x)`;
                total += price * extraQuantity; // Adiciona ao total apenas o valor das unidades excedentes
            }
        } else {
            // Para outros produtos, cobra normalmente
            itemName.textContent = `${item.nome} - R$ ${(price * item.quantity).toFixed(2)} (${item.quantity}x)`;
            total += price * item.quantity;
        }

        cartItemDiv.appendChild(itemName);

        // Cria os botões de ajuste de quantidade
        const adjustButtons = document.createElement('div');
        adjustButtons.classList.add('adjust-buttons');

        // Botão para diminuir a quantidade
        const decreaseButton = document.createElement('span');
        decreaseButton.textContent = '-';
        decreaseButton.onclick = () => updateItemQuantity(item, item.quantity - 1);
        adjustButtons.appendChild(decreaseButton);

        // Exibe a quantidade atual
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        adjustButtons.appendChild(quantityDisplay);

        // Botão para aumentar a quantidade
        const increaseButton = document.createElement('span');
        increaseButton.textContent = '+';
        increaseButton.onclick = () => updateItemQuantity(item, item.quantity + 1);
        adjustButtons.appendChild(increaseButton);

        cartItemDiv.appendChild(adjustButtons);

        // Botão para remover o item do carrinho
        const removeButton = document.createElement('span');
        removeButton.textContent = '🗑️';
        removeButton.classList.add('remove-item');
        removeButton.onclick = () => removeFromCart(item);
        cartItemDiv.appendChild(removeButton);

        // Adiciona o item ao contêiner do carrinho
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Aplica o desconto do cupom, se houver
    if (descontoCupom > 0) {
        const desconto = total * (descontoCupom / 100);
        total -= desconto;
    }

    // Aplica o frete grátis, se houver
    if (freteGratis) {
        deliveryFee = 0; // Zera a taxa de entrega
    }

    // Atualiza o total exibido no carrinho
    cartTotalContainer.textContent = `Total: R$ ${total.toFixed(2)} (incluindo taxa de entrega: R$ ${deliveryFee.toFixed(2)})`;

    // Atualiza o contador de itens no ícone do carrinho
    cartCount.textContent = cart.length;
}

// Função para atualizar a quantidade de um item no carrinho
function updateItemQuantity(item, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(item);
    } else {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Função para remover um item do carrinho
function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

// Função para alternar a exibição do carrinho
function toggleCart() {
    const cartDetails = document.getElementById('cartDetails');
    cartDetails.style.display = cartDetails.style.display === 'block' ? 'none' : 'block';
}

// Função para lidar com a mudança na opção de entrega
function handleDeliveryOptionChange(option) {
    const locationOption = document.getElementById('locationOption');
    const locationSelect = document.getElementById('locationSelect');
    const customerNameInput = document.getElementById('customerName');

    if (option === 'Delivery') {
        locationOption.style.display = 'block';
    } else {
        locationOption.style.display = 'none';
        locationSelect.value = ''; // Reseta a seleção de localização
        updateCart(); // Atualiza o carrinho para remover a taxa de entrega
    }

    customerNameInput.style.display = 'block';
}

// Função para atualizar a taxa de entrega
function updateDeliveryFee() {
    const locationSelect = document.getElementById('locationSelect');
    const selectedOption = locationSelect.options[locationSelect.selectedIndex];
    const deliveryFee = parseFloat(selectedOption.getAttribute('data-fee')) || 0;
    updateCart(deliveryFee);
}

// Função para verificar a opção de pagamento
function checkPaymentOption() {
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked').value;

    if (paymentOption === 'Cartão') {
        const agree = confirm(`Será cobrada uma taxa de maquininha de R$ ${maquininhaTax.toFixed(2)}. Você concorda?`);
        
        if (agree) {
            isCardPayment = true; // Definir que o pagamento é com cartão
            updateCart();
        } else {
            isCardPayment = false; // Redefinir a variável se o cliente não concordar
            document.querySelector('input[name="paymentOption"]:checked').checked = false;
        }
    } else {
        isCardPayment = false; // Redefinir a variável se o pagamento não for com cartão
    }

    updateCart(); // Atualizar o carrinho para refletir a mudança
}

// Função para finalizar o pedido
function finalizeOrder() {
    if (cart.length === 0) {
        alert("Por favor, adicione pelo menos um produto ao carrinho.");
        return;
    }
    // Verifica se há apenas itens gratuitos no carrinho
    const apenasItensGratuitos = cart.every(item => {
        return (item.nome === 'Ketchup' && item.quantity <= ketchupGratuito) ||
               (item.nome === 'Maionese' && item.quantity <= maioneseGratuita);
    });

    if (apenasItensGratuitos) {
        alert("Adicione pelo menos um item válido ao carrinho para finalizar o pedido.");
        return;
    }

    const customerName = document.getElementById('nameInput').value.trim();
    if (!document.querySelector('input[name="paymentOption"]:checked')) {
        alert("Por favor, selecione um método de pagamento.");
        return;
    }
    if (!document.querySelector('input[name="deliveryOption"]:checked')) {
        alert("Por favor, selecione a opção de entrega.");
        return;
    }
    if (document.querySelector('input[name="deliveryOption"]:checked').value === 'Delivery' && !document.getElementById('locationSelect').value) {
        alert("Por favor, selecione sua localização.");
        return;
    }
    if (customerName === "") {
        alert("Por favor, insira seu nome.");
        return;
    }

    // Exibir tela de confirmação
    document.getElementById('orderConfirmation').style.display = 'block';
}

// Função para enviar o pedido e retornar ao catálogo
function sendOrderAndReturnToCatalog() {
    sendOrder(); // Envia o pedido via WhatsApp

    // Fecha o carrinho
    document.getElementById('cartDetails').style.display = 'none';

    // Esvazia o carrinho
    cart = [];
    updateCart();

    // Zera os dados do cliente e do cupom
    document.getElementById('nameInput').value = '';
    document.getElementById('cupomInput').value = '';
    removerCupom();

    // Volta à página inicial
    showInicio();

    // Oculta a confirmação do pedido
    document.getElementById('orderConfirmation').style.display = 'none';
}

// Função para enviar o pedido via WhatsApp
function sendOrder() {
    const customerName = document.getElementById('nameInput').value.trim();
    if (cart.length === 0) {
        alert("Por favor, adicione pelo menos um produto ao carrinho.");
        return;
    }

    let orderDetails = cart.map(item => {
        const price = item.preco;
        if ((item.nome === 'Ketchup' && item.quantity <= ketchupGratuito) || (item.nome === 'Maionese' && item.quantity <= maioneseGratuita)) {
            return `*${item.nome}* - Gratuito (${item.quantity}x)`;
        } else if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const extraQuantity = item.quantity - (item.nome === 'Ketchup' ? ketchupGratuito : maioneseGratuita);
            return `*${item.nome}* - R$ ${(price * extraQuantity).toFixed(2)} (${item.quantity}x)`;
        } else {
            return `*${item.nome}* - R$ ${(price * item.quantity).toFixed(2)} (${item.quantity}x)`;
        }
    }).join('\n');

    let totalAmount = cart.reduce((sum, item) => {
        const price = item.preco;
        if ((item.nome === 'Ketchup' && item.quantity <= ketchupGratuito) || (item.nome === 'Maionese' && item.quantity <= maioneseGratuita)) {
            return sum;
        } else if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const extraQuantity = item.quantity - (item.nome === 'Ketchup' ? ketchupGratuito : maioneseGratuita);
            return sum + price * extraQuantity;
        } else {
            return sum + price * item.quantity;
        }
    }, 0);

    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked')?.value || '';
    const paymentOption = document.querySelector('input[name="paymentOption"]:checked')?.value || '';
    const locationSelect = document.getElementById('locationSelect');
    const location = locationSelect ? locationSelect.value : '';
    let deliveryFee = 0;

    // Verifica se há taxa de entrega e se o cupom "FRETEGRATIS" foi aplicado
    if (deliveryOption === 'Delivery' && !freteGratis) {
        const selectedOption = locationSelect.options[locationSelect.selectedIndex];
        deliveryFee = parseFloat(selectedOption.getAttribute('data-fee')) || 0;
    }

    // Adiciona a taxa de maquininha se o pagamento for com cartão
    if (isCardPayment) {
        totalAmount += maquininhaTax;
    }

    // Adiciona a taxa de entrega ao total, exceto se o cupom for FRETEGRATIS
    if (!freteGratis) {
        totalAmount += deliveryFee;
    }

    // Aplica o desconto do cupom, se houver
    if (descontoCupom > 0) {
        const desconto = totalAmount * (descontoCupom / 100);
        totalAmount -= desconto;
    }

    // Monta a mensagem do WhatsApp
    let message = `Olá, meu nome é ${customerName}, estou enviando o meu pedido:\n\n${orderDetails}\n\n`;

    if (deliveryOption === 'Delivery') {
        message += `Taxa de entrega: R$ ${freteGratis ? '0.00' : deliveryFee.toFixed(2)}\n`;
    }

    if (cupomAplicado) {
        message += `Cupom aplicado: ${cupomAplicado}\n`;
    }

    if (isCardPayment) {
        message += `Taxa de maquininha: R$ ${maquininhaTax.toFixed(2)}\n`;
    }

    message += `Total: R$ ${totalAmount.toFixed(2)}\n\n`;

    if (deliveryOption) {
        message += `Opção de entrega: ${deliveryOption}\n`;
    }
    if (location) {
        message += `Localização: ${location}\n`;
    }
    if (paymentOption) {
        message += `Forma de pagamento: ${paymentOption}\n`;
    }

    message += `\nObrigado(a)! Aguardando a confirmação!`;

    // Envia a mensagem via WhatsApp
    let phoneNumber = '5588993467578'; // Substitua pelo número correto
    let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank'); // Abre o link do WhatsApp em uma nova aba
}

// Função para exibir o botão de finalização
function showFinalizeButton() {
    document.getElementById('finalizeOrderSection').style.display = 'block';
}

// Função para voltar ao catálogo
function goToCatalog() {
    document.getElementById('orderConfirmation').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('categorias').style.display = 'none';
    document.getElementById('catalogo').style.display = 'none';
    document.getElementById('cartIcon').style.display = 'none';
}

// Carrossel Automático
let carrosselIndex = 0;
const carrosselItems = document.querySelectorAll('.carrossel-item');

function showCarrosselItem(index) {
    carrosselItems.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextCarrosselItem() {
    carrosselIndex = (carrosselIndex + 1) % carrosselItems.length;
    showCarrosselItem(carrosselIndex);
}

function prevCarrosselItem() {
    carrosselIndex = (carrosselIndex - 1 + carrosselItems.length) % carrosselItems.length;
    showCarrosselItem(carrosselIndex);
}

// Iniciar carrossel
showCarrosselItem(carrosselIndex);
setInterval(nextCarrosselItem, 5000); // Alterna a cada 5 segundos

// Exibir produtos ao carregar a página
window.onload = () => {
    // Exibir a capa inicialmente
    document.getElementById('header').style.display = 'block';
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('categorias').style.display = 'none';
    document.getElementById('catalogo').style.display = 'none';
    document.getElementById('cartIcon').style.display = 'none';
    document.getElementById('mainFooter').style.display = 'none';
};