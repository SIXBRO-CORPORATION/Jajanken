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

function generateRandom() {

    const possibleRandom = ['Pedra', 'Papel', 'Tesoura'];

    return possibleRandom[Math.floor(Math.random() * possibleRandom.length)];

}

function calculeResult(playerChoice, random) {

    const results = ['Vitória', 'Empate', 'Derrota']

    if (playerChoice === 'Pedra') {
        if (random === 'Papel') {
            placarCpu++
            return results[2];
        } else if (random === 'Tesoura') {
            placarJogador++
            return results[0];
        } else {
            placarDraw++
            return results[1];
        }
    }

    if (playerChoice === 'Papel') {
        if (random === 'Papel') {
            placarDraw++
            return results[1];
        } else if (random === 'Tesoura') {
            placarCpu++
            return results[2];
        } else {
            placarJogador++
            return results[0];
        }
    }

    if (playerChoice === 'Tesoura') {
        if (random === 'Papel') {
            placarJogador++
            return results[0];
        } else if (random === 'Tesoura') {
            placarDraw++
            return results[1];
        } else {
            placarCpu++
            return results[2];
        }
    }
}

function showResult(playerChoice) {

    const random = generateRandom();

    console.log(random);
    console.log(playerChoice);

    result.textContent = calculeResult(playerChoice, random);
    rodadaGlobal++
    atualizarPlacar()

}

function atualizarPlacar() {
    document.getElementById('placar-global').textContent =  "Global: " + rodadaGlobal;
    document.getElementById('placar-jogador').textContent = "Jogador: " + placarJogador;
    document.getElementById('placar-cpu').textContent = "Cpu: " + placarCpu;
    document.getElementById('placar-empate').textContent = "Empate: " + placarDraw;
}

function reset(){
    placarJogador = 0;
    placarCpu = 0;
    placarDraw = 0;
    rodadaGlobal = 0;
    atualizarPlacar();
}

btnPaper.addEventListener("click", () => showResult('Papel'));
btnRock.addEventListener("click", () => showResult('Pedra'));
btnScissor.addEventListener("click", () => showResult('Tesoura'));
btnReset.addEventListener("click", () => reset());
