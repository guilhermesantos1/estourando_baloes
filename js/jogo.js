//variavel que armazena a chamada da funcao timeout
var timerId = null;
var tempo_segundos = 0;
var qtde_baloes = 20;

function iniciaJogo() {
    console.log("jogo iniciado!!!");

    var url = window.location.search;
    var nivel_jogo = url.replace("?nivel=", "");

    //1 facil -> 120 segundos
    //2 normal -> 60 segundos
    //3 dificil -> 30 segundos

    //console.log(typeof nivel_jogo);

    if (nivel_jogo == "1") {
        tempo_segundos = 120;
    }

    if (nivel_jogo == "2") {
        tempo_segundos = 60;
    }

    if (nivel_jogo == "3") {
        tempo_segundos = 5;
    }

    //inserindo os segundos no span
    document.getElementById("cronometro").innerHTML = tempo_segundos;

    criaBaloes(qtde_baloes);

    //imprimir qtde baloes inteiros
    document.getElementById("baloes_inteiros").innerHTML = qtde_baloes;
    //imprimir qtde baloes estourados
    document.getElementById("baloes_estourados").innerHTML = 0;

    contagemTempo(tempo_segundos + 1);
}

function contagemTempo(tempo) {
    tempo -= 1;

    if (tempo == -1) {
        clearTimeout(timerId); //para a execucao do setTimeout
        fimJogo();
        return false;
    }
    document.getElementById("cronometro").innerHTML = tempo;
    timerId = setTimeout("contagemTempo("+tempo+")", 1000);
}

function fimJogo() {
    alert("Fim de Jogo, seu tempo acabou!");
    removeEventosBaloes();
}

function criaBaloes(qtde) {
    for (var i = 1; i <= qtde; i++) {
        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "12px";
        balao.style.cursor = "pointer";
        balao.id = "b" + i;
        balao.onclick = function(){ estourar(this); }
        document.getElementById("cenario").appendChild(balao);
    }
}

function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).style.cursor = "default";
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";
    pontuacao(-1);
}

function pontuacao(acao) {
    var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
    var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros += acao;
    baloes_estourados -= acao;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacaoJogo(baloes_inteiros);
}

function situacaoJogo(bi) {
    if (bi == 0) {
        alert("Parabéns, você estourou todos os balões a tempo");
        pararJogo();
    }
}

function pararJogo() {
    clearTimeout(timerId);
}

function removeEventosBaloes() {
    for (var i = 1; i <= qtde_baloes; i++) {
        var botao = document.getElementById("b" + i);
        botao.onclick = "";
        botao.style.cursor = "default";
    }
}
