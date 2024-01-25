let listaDeNumerosSorteados = []; 
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

//função para selecionar tags e inserir texto. Recebe dois parâmetros. 
function exibirTextoNaTela(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

//função que define o texto inicial
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}


//função que verifica o chute
function verificarChute() {
    //pega o valor do input e armazena em chute
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        //caso acerte de primeira. Muda o texto do h1 pela função exibir na tela
        exibirTextoNaTela('h1', 'Acertou!');
        //verifica o nº de tentativas para singular ou plural
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        //muda o texto da tag p através da função exibir na tela
        exibirTextoNaTela('p', mensagemTentativas)
        //habilita o botão Novo Jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        //incrementa a cada tentativa 
        tentativas++;
        limparCampo();
    }
}

//gera um número inteiro aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroMaximo + 1);
    //joga o tamanho do array, ou seja, quantidade de elementos dentro dele, na variável qtdElementosLista
    let qtdElementosLista = listaDeNumerosSorteados.length;

    //compara a quantidade de elementos no array com o número máximo do jogo
    //caso sejam iguais, limpa o array
    if (qtdElementosLista == numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    //verifica se o número sorteado já se encontra no array.
    //se estiver no array, gera um novo número
    //senão, insere o número no array
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    //limpa o campo a cada interação com o botão Chutar
    chute.value = '';
}

//função que chama outras funções. 
//numeroSecreto para gerar um novo número
//limparCampo para limpar a cada tentativa
//tentativas igual a 1
//exibirMensagemInicial para voltar texto padrão inicial
//document.getElementById('reiniciar').setAttribute('disable', true); Habilida o 'disable', que desabilita o botão Novo Jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disable', true);
}

exibirMensagemInicial()