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
    rodadaGlobal++
    result.textContent = resultado;
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
    result.textContent = ""
    atualizarPlacar();
}

btnPaper.addEventListener("click", () => showResult('Papel'));
btnRock.addEventListener("click", () => showResult('Pedra'));
btnScissor.addEventListener("click", () => showResult('Tesoura'));
btnReset.addEventListener("click", () => reset());
