// Funções para Cadastro de Funcionários
function carregarFuncionarios() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const lista = document.getElementById('listaFuncionarios');
    lista.innerHTML = '';
    funcionarios.forEach(f => {
        const li = document.createElement('li');
        li.textContent = `ID: ${f.id} - Nome: ${f.nome} - Cargo: ${f.cargo}`;
        lista.appendChild(li);
    });
}

document.getElementById('formFuncionario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const id = document.getElementById('idFuncionario').value;

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    funcionarios.push({ id, nome, cargo });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    carregarFuncionarios();
    this.reset();
});

// Funções para Controle de Estoque
function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
    produtos.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `Nome: ${p.nome} - Quantidade: ${p.quantidade} - Preço: R$ ${p.preco}`;
        lista.appendChild(li);
    });
}

document.getElementById('formProduto').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeProduto').value;
    const quantidade = document.getElementById('quantidadeProduto').value;
    const preco = document.getElementById('precoProduto').value;

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push({ nome, quantidade, preco });
    localStorage.setItem('produtos', JSON.stringify(produtos));

    carregarProdutos();
    this.reset();
});

// Funções para Registro de Vendas
function carregarVendas() {
    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    const lista = document.getElementById('listaVendas');
    lista.innerHTML = '';
    vendas.forEach(v => {
        const li = document.createElement('li');
        li.textContent = `Funcionário: ${v.funcionario} - Produto: ${v.produto} - Quantidade: ${v.quantidade}`;
        lista.appendChild(li);
    });
}

function carregarFuncionariosSelect() {
    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const select = document.getElementById('funcionarioVenda');
    select.innerHTML = '<option value="">Selecione o Funcionário</option>';
    funcionarios.forEach(f => {
        const option = document.createElement('option');
        option.value = f.id;
        option.textContent = f.nome;
        select.appendChild(option);
    });
}

function carregarProdutosSelect() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const select = document.getElementById('produtoVenda');
    select.innerHTML = '<option value="">Selecione o Produto</option>';
    produtos.forEach(p => {
        const option = document.createElement('option');
        option.value = p.nome;
        option.textContent = p.nome;
        select.appendChild(option);
    });
}

document.getElementById('formVenda').addEventListener('submit', function(e) {
    e.preventDefault();
    const funcionarioId = document.getElementById('funcionarioVenda').value;
    const produtoNome = document.getElementById('produtoVenda').value;
    const quantidade = document.getElementById('quantidadeVenda').value;

    if (!funcionarioId || !produtoNome || !quantidade) return;

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const produtoIndex = JSON.parse(localStorage.getItem('produtos')).findIndex(p => p.nome === produtoNome);
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const funcionario = funcionarios.find(f => f.id == funcionarioId);
    const produto = produtos[produtoIndex];

    if (produto.quantidade < quantidade) {
        alert('Estoque insuficiente!');
        return;
    }

    produto.quantidade -= quantidade;
    localStorage.setItem('produtos', JSON.stringify(produtos));

    const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
    vendas.push({ funcionario: funcionario.nome, produto: produtoNome, quantidade });
    localStorage.setItem('vendas', JSON.stringify(vendas));

    carregarVendas();
    carregarProdutos();
    this.reset();
});

// Carregar dados ao iniciar
if (document.getElementById('listaFuncionarios')) carregarFuncionarios();
if (document.getElementById('listaProdutos')) carregarProdutos();
if (document.getElementById('listaVendas')) carregarVendas();
if (document.getElementById('funcionarioVenda')) carregarFuncionariosSelect();
if (document.getElementById('produtoVenda')) carregarProdutosSelect();
