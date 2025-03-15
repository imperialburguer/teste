document.addEventListener('DOMContentLoaded', function () {
    const statusOperacao = document.getElementById('status-operacao');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    if ((horaAtual > 18 || (horaAtual === 18 && minutoAtual >= 30)) && horaAtual < 22) {
        statusText.textContent = 'Aberto';
        statusDot.style.backgroundColor = 'green'; // Verde para aberto
        statusText.style.color = 'green'; // Texto verde
    } else {
        statusText.textContent = 'Fechado';
        statusDot.style.backgroundColor = 'red'; // Vermelho para fechado
        statusText.style.color = 'red'; // Texto vermelho
    }
});

// Variáveis globais
let cart = [];
let isCardPayment = false;
const maquininhaTax = 4.00;
const ketchupGratuito = 1;
const maioneseGratuita = 1;
let descontoCupom = 0;
let cupomAplicado = null;
let freteGratis = false;

// Cupons válidos com regras
const cuponsValidos = {
    "ENTREGAGRATIS": {
        tipo: "frete-gratis",
        regra: {
            tipo: "valor-minimo",
            valor: 35.00,
            produtos: [1, 2, 3, 4, 5, 6],
        },
        validoAte: "2025-03-20",
        maximoUsos: 60,
        usos: 0
    },
    "IMPERIAL5": {
        tipo: "desconto",
        valor: 2,
        regra: {
            tipo: "valor-minimo",
            valor: 30.00,
            produtos: [3, 4],
        },
        validoAte: "2025-03-20",
        maximoUsos: 50,
        usos: 0
    },
    "DESCONTO5": {
        tipo: "desconto-total",
        valor: 5, // 5% de desconto
        regra: {
            tipo: "valor-minimo-total",
            valor: 35.00, // Valor mínimo da compra
        },
        validoAte: "2025-03-20",
        maximoUsos: 50,
        usos: 0
    }
};

// Exemplo de produtos
const produtos = [
    {
        id: 1,
        nome: "Combo X-Burguer",
        preco: 15.00,
        descricao: "Hambúrguer suculento com queijo derretido, batata frita crocante e refrigerante 250ml gelado!",
        imagem: "images/comboxburguer.png",
        destaque: true
    },
    {
        id: 2,
        nome: "Combo X-Salada",
        preco: 16.00,
        descricao: "Hambúrguer suculento com queijo, alface, tomate e maionese especial, batata frita crocante e refrigerante250ml gelado!",
        imagem: "images/comboxsalada.png",
        destaque: true
    },
    {
        id: 3,
        nome: "Combo X-Tudo",
        preco: 23.00,
        descricao: "Hambúrguer suculento com queijo, presunto, bacon, ovo, alface, tomate e maionese especial, batata frita crocante e refrigerante 250ml gelado!",
        imagem: "images/comboxtudo.png",
        destaque: true // Produto em destaque
    },
    {
        id: 4,
        nome: "Combo X-Bacon",
        preco: 20.00,
        descricao: "Hambúrguer suculento com queijo derretido e muito bacon crocante, batata frita e refrigerante 250ml gelado!",
        imagem: "images/comboxbacon.png",
        destaque: true // Produto em destaque
    },
    {
        id: 5,
        nome: "Combo Duplo Burguer",
        preco: 22.00,
        descricao: "Hambúrguer suculento com queijo derretido e muito sabor, batata frita crocante e refrigerante 250ml gelado!",
        imagem: "images/comboduploburguer.png",
        destaque: true // Produto em destaque
    },
    {
        id: 6,
        nome: "Combo Imperial",
        preco: 31.00,
        descricao: "Uma experiência digna de rei, com batata frita crocante e refrigerante 250ml gelado!",
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
        descricao: "Deliciosa batata frita para se deliciar, com cheddar, catupiry e bacon!",
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
    }
];

// Função para exibir a página inicial (Menu, Carrossel e Destaques)
function showInicio() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('categorias').style.display = 'flex';
    document.getElementById('carrossel').style.display = 'block';
    document.getElementById('destaque').style.display = 'block';
    document.getElementById('catalogo').style.display = 'none';
    document.getElementById('cartIcon').style.display = 'block'; // Mostra o ícone do carrinho
    document.getElementById('mainFooter').style.display = 'block';
    document.getElementById('cartDetails').style.display = 'none';
    loadDestaqueProducts(); // Carrega os produtos em destaque
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
                <button onclick="adicionarAoCarrinho(${produto.id})">Pedir agora</button>
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
                <button onclick="adicionarAoCarrinho(${produto.id})">Pedir agora</button>
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

    // Verifica o tipo de cupom
    if (cupom.tipo === "desconto-total") {
        const valorMinimo = cupom.regra.valor;
        const totalCompra = calcularTotal();

        if (totalCompra < valorMinimo) {
            alert(`Cupom válido apenas para compras acima de R$ ${valorMinimo.toFixed(2)}.`);
            return;
        }

        // Aplica o desconto no valor total da compra
        descontoCupom = cupom.valor; // Armazena o desconto do cupom
        cupomAplicado = cupomInput; // Armazena o cupom aplicado
        alert(`Cupom aplicado com sucesso! Desconto de ${cupom.valor}% no valor total da compra.`);
    } else if (cupom.tipo === "desconto") {
        const produtosValidos = cupom.regra.produtos;
        const itemParticipante = cart.find(item => produtosValidos.includes(item.id));

        if (!itemParticipante) {
            alert("Cupom válido apenas para produtos específicos. Adicione um produto participante!");
            return;
        }

        // Aplica o desconto apenas ao primeiro item participante
        const desconto = itemParticipante.preco * (cupom.valor / 100);
        itemParticipante.desconto = desconto; // Armazena o desconto no item
        cupomAplicado = cupomInput; // Armazena o cupom aplicado
        alert(`Cupom aplicado com sucesso! Desconto de ${cupom.valor}% no item "${itemParticipante.nome}".`);
    } else if (cupom.tipo === "frete-gratis") {
        freteGratis = true; // Ativa o frete grátis
        cupomAplicado = cupomInput; // Armazena o cupom aplicado
        alert("Cupom aplicado com sucesso! Frete grátis ativado.");
    }

    // Atualiza a exibição do cupom aplicado
    document.getElementById('toggleCupomButton').style.display = 'none';
    document.getElementById('cupomAplicadoContainer').style.display = 'flex';
    document.getElementById('cupomAplicadoText').textContent = cupomInput;

    // Atualiza o número de usos do cupom
    cuponsValidos[cupomInput].usos += 1;

    // Atualiza o carrinho
    updateCart();
}

// Função para remover o cupom
function removerCupom() {
    // Remove o desconto do item específico
    cart.forEach(item => {
        if (item.desconto) {
            delete item.desconto;
        }
    });

    descontoCupom = 0;
    freteGratis = false;
    cupomAplicado = null;
    document.getElementById('cupomInput').value = '';
    document.getElementById('cupomAplicadoContainer').style.display = 'none';
    document.getElementById('toggleCupomButton').style.display = 'block';
    updateCart();
}

// Função para calcular o total do carrinho
function updateCart(deliveryFee = 0) {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho
    let total = calcularTotal(); // Calcula o total com o desconto aplicado

    // Itera sobre cada item no carrinho
    cart.forEach(item => {
        const price = item.preco;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Nome e preço do item
        const itemName = document.createElement('p');
        let itemTotal = 0;

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = 1; // Primeira unidade gratuita
            const quantidadePaga = Math.max(item.quantity - quantidadeGratuita, 0); // Unidades pagas
            itemTotal = price * quantidadePaga; // Calcula o total pago

            if (item.quantity <= quantidadeGratuita) {
                itemName.textContent = `${item.nome} - Gratuito (${item.quantity}x)`;
            } else {
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        } else {
            // Para outros produtos, cobra normalmente
            itemTotal = price * item.quantity;
            if (item.desconto) {
                itemTotal -= item.desconto; // Aplica o desconto do cupom
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x) - Desconto de R$ ${item.desconto.toFixed(2).replace('.', ',')} aplicado`;
            } else {
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        }

        cartItemDiv.appendChild(itemName);

        // Botões de ajuste de quantidade
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

    // Aplica o frete grátis, se houver
    if (freteGratis) {
        deliveryFee = 0; // Zera a taxa de entrega
    }

    // Adiciona a taxa de maquininha se o pagamento for com cartão
    if (isCardPayment) {
        total += maquininhaTax;
    }

    // Adiciona a taxa de entrega ao total, exceto se o cupom for FRETEGRATIS
    if (!freteGratis) {
        total += deliveryFee;
    }

    // Atualiza o total exibido no carrinho
    cartTotalContainer.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')} (incluindo taxa de entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')})`;

    // Atualiza o contador de itens no ícone do carrinho
    cartCount.textContent = cart.length;
}

// Função para calcular o total da compra
function calcularTotal() {
    let total = 0;

    cart.forEach(item => {
        const price = item.preco;
        let itemTotal = 0;

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = 1; // Primeira unidade gratuita
            const quantidadePaga = Math.max(item.quantity - quantidadeGratuita, 0); // Unidades pagas
            itemTotal = price * quantidadePaga; // Calcula o total pago
        } else {
            // Para outros produtos, cobra normalmente
            itemTotal = price * item.quantity;
            if (item.desconto) {
                itemTotal -= item.desconto; // Aplica o desconto do cupom
            }
        }

        total += itemTotal;
    });

    // Aplica o desconto percentual do cupom, se houver
    if (descontoCupom > 0) {
        total *= (1 - descontoCupom / 100);
    }

    return total;
}

// Função para atualizar o carrinho
function updateCart(deliveryFee = 0) {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho
    let total = calcularTotal(); // Calcula o total com o desconto aplicado

    // Itera sobre cada item no carrinho
    cart.forEach(item => {
        const price = item.preco;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        // Nome e preço do item
        const itemName = document.createElement('p');
        let itemTotal = 0;

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = 1; // Primeira unidade gratuita
            const quantidadePaga = Math.max(item.quantity - quantidadeGratuita, 0); // Unidades pagas
            itemTotal = price * quantidadePaga; // Calcula o total pago

            if (item.quantity <= quantidadeGratuita) {
                itemName.textContent = `${item.nome} - Gratuito (${item.quantity}x)`;
            } else {
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        } else {
            // Para outros produtos, cobra normalmente
            itemTotal = price * item.quantity;
            if (item.desconto) {
                itemTotal -= item.desconto; // Aplica o desconto do cupom
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x) - Desconto de R$ ${item.desconto.toFixed(2).replace('.', ',')} aplicado`;
            } else {
                itemName.textContent = `${item.nome} - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        }

        cartItemDiv.appendChild(itemName);

        // Botões de ajuste de quantidade
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

    // Aplica o frete grátis, se houver
    if (freteGratis) {
        deliveryFee = 0; // Zera a taxa de entrega
    }

    // Adiciona a taxa de maquininha se o pagamento for com cartão
    if (isCardPayment) {
        total += maquininhaTax;
    }

    // Adiciona a taxa de entrega ao total, exceto se o cupom for FRETEGRATIS
    if (!freteGratis) {
        total += deliveryFee;
    }

    // Atualiza o total exibido no carrinho
    cartTotalContainer.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')} (incluindo taxa de entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')})`;

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

    // Zera os dados do cliente, cupom, entrega e pagamento
    document.getElementById('nameInput').value = '';
    document.getElementById('cupomInput').value = '';
    removerCupom();

    // Limpa a observação
    document.getElementById('orderNotes').value = ''; // Limpa o campo de observação

    // Reseta as opções de entrega e pagamento
    document.querySelector('input[name="deliveryOption"][value="Delivery"]').checked = false;
    document.querySelector('input[name="deliveryOption"][value="Retirada"]').checked = false;
    document.getElementById('locationSelect').value = '';
    document.querySelector('input[name="paymentOption"][value="Dinheiro"]').checked = false;
    document.querySelector('input[name="paymentOption"][value="Pix"]').checked = false;
    document.querySelector('input[name="paymentOption"][value="Cartão"]').checked = false;

    // Volta à página inicial
    showInicio();

    // Oculta a confirmação do pedido
    document.getElementById('orderConfirmation').style.display = 'none';
}

// Função para enviar o pedido via WhatsApp
function sendOrder() {
    const customerName = document.getElementById('nameInput').value.trim();
    const orderNotes = document.getElementById('orderNotes').value.trim();

    if (cart.length === 0) {
        alert("Por favor, adicione pelo menos um produto ao carrinho.");
        return;
    }

    // Monta os detalhes do pedido
    let orderDetails = cart.map(item => {
        const price = item.preco;
        let itemTotal = 0;

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = 1; // Primeira unidade gratuita
            const quantidadePaga = Math.max(item.quantity - quantidadeGratuita, 0); // Unidades pagas
            itemTotal = price * quantidadePaga; // Calcula o total pago

            if (item.quantity <= quantidadeGratuita) {
                return `*${item.nome}* - Gratuito (${item.quantity}x)`;
            } else {
                return `*${item.nome}* - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        } else {
            // Para outros produtos, cobra normalmente
            itemTotal = price * item.quantity;
            if (item.desconto) {
                itemTotal -= item.desconto; // Aplica o desconto do cupom
                return `*${item.nome}* - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x) - Desconto de R$ ${item.desconto.toFixed(2).replace('.', ',')} aplicado`;
            } else {
                return `*${item.nome}* - R$ ${itemTotal.toFixed(2).replace('.', ',')} (${item.quantity}x)`;
            }
        }
    }).join('\n');

    // Calcula o valor total do pedido
    let totalAmount = cart.reduce((sum, item) => {
        const price = item.preco;
        let itemTotal = 0;

        // Verifica se o item é ketchup ou maionese
        if (item.nome === 'Ketchup' || item.nome === 'Maionese') {
            const quantidadeGratuita = 1; // Primeira unidade gratuita
            const quantidadePaga = Math.max(item.quantity - quantidadeGratuita, 0); // Unidades pagas
            itemTotal = price * quantidadePaga; // Calcula o total pago
        } else {
            // Para outros produtos, cobra normalmente
            itemTotal = price * item.quantity;
            if (item.desconto) {
                itemTotal -= item.desconto; // Aplica o desconto do cupom
            }
        }

        return sum + itemTotal;
    }, 0);

    // Aplica o desconto percentual do cupom, se houver
    if (descontoCupom > 0) {
        totalAmount *= (1 - descontoCupom / 100);
    }

    // Verifica a opção de entrega
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked')?.value || '';
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

    // Monta a mensagem do WhatsApp
    let message = `Olá, meu nome é ${customerName}, estou enviando o meu pedido:\n\n${orderDetails}\n\n`;

    if (orderNotes) {
        message += `Observações: ${orderNotes}\n\n`; // Adiciona a observação
    }

    if (deliveryOption === 'Delivery') {
        message += `Taxa de entrega: R$ ${freteGratis ? '0,00' : deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }

    if (cupomAplicado) {
        message += `Cupom aplicado: ${cupomAplicado}\n`;
    }

    if (isCardPayment) {
        message += `Taxa de maquininha: R$ ${maquininhaTax.toFixed(2).replace('.', ',')}\n`;
    }

    message += `Total: R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\n`;

    if (deliveryOption) {
        message += `Opção de entrega: ${deliveryOption}\n`;
    }
    if (location) {
        message += `Localização: ${location}\n`;
    }

    const paymentOption = document.querySelector('input[name="paymentOption"]:checked')?.value || '';
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
    document.getElementById('cartIcon').style.display = 'none'; // Oculta o ícone do carrinho
    document.getElementById('mainFooter').style.display = 'none';
};