btnRock = document.getElementById("btnRock");
btnPaper = document.getElementById("btnPaper");
btnScissor = document.getElementById("btnScissor");
result = document.getElementById("result");
infomodo = document.getElementById("infomodo");
btnFree = document.getElementById("free");
resultSerie = document.getElementById("result-serie");
btnReset = document.getElementById("btnReset");

let placarJogador = 0
let placarCpu = 0
let placarDraw = 0
let rodadaGlobal = 0
let history = [];


function generateRandom() {

    const possibleRandom = ['Pedra', 'Papel', 'Tesoura'];

    return possibleRandom[Math.floor(Math.random() * possibleRandom.length)];

}

function calculeResult(playerChoice, random) {

    const results = ['Vitória', 'Empate', 'Derrota']

    if (playerChoice === random) {
    return results[1]
    }
    if ((playerChoice === "Pedra" && random === "Tesoura") ||
        (playerChoice === "Papel" && random === "Pedra") ||
        (playerChoice === "Tesoura" && random === "Papel")) {
        return results[0]
    }
    else {
        return results[2]
    }
}

function incrementHistory(playerChoice, random, result) {

    if (history.length >= 10) {
        history.shift();
    }

    const item = {
        playerChoice: playerChoice,
        random: random,
        result: result
    }

    history.push(item);
}

function renderHistory() {

    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';

    if (history.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = "Nenhum Histórico Ainda.";
        historyDiv.appendChild(empty);
        return;
    }

    history.forEach(item => {

        const p = document.createElement('p');
        p.textContent = `Você: ${item.playerChoice} | PC: ${item.random} | ${item.result}`;
        historyDiv.appendChild(p);

    })

}

function showResult(playerChoice) {

    const random = generateRandom();

    console.log(random);
    console.log(playerChoice);

    const resultado = calculeResult(playerChoice, random);
    if (resultado === "Vitória"){
        placarJogador++;
    }
    else if (resultado === "Empate"){
        placarDraw++
    }
    else {
        placarCpu++;
    }
    result.textContent = resultado;

    incrementHistory(playerChoice, random, resultado);
    renderHistory();
    atualizarPlacar()

}

function atualizarPlacar() {
    document.getElementById('placar-jogador').textContent = "Total de pontos do jogador: " + placarJogador;
    document.getElementById('placar-cpu').textContent = "Total de pontos do Gon: " + placarCpu;
    document.getElementById('placar-empate').textContent = "Total Empate: " + placarDraw;
}

function reset() {
    placarJogador = 0;
    placarCpu = 0;
    placarDraw = 0;
    result.textContent = ""
    atualizarPlacar();
}

btnPaper.addEventListener("click", () => showResult('Papel'));
btnRock.addEventListener("click", () => showResult('Pedra'));
btnScissor.addEventListener("click", () => showResult('Tesoura'));
btnReset.addEventListener("click", () => reset());
