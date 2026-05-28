btnRock = document.getElementById("btnRock");
btnPaper = document.getElementById("btnPaper");
btnScissor = document.getElementById("btnScissor");
result = document.getElementById("result");
infomodo = document.getElementById("infomodo");
btnFree = document.getElementById("free");
resultSerie = document.getElementById("result-serie");
btnReset = document.getElementById("btnReset");
historyDiv = document.getElementById('history');
btnNormalMode = document.getElementById("btnNormalMode");
btn3Mode = document.getElementById("btn3Mode");
btn5Mode = document.getElementById("btn5Mode");
resultSub = document.getElementById("result-sub");
serieInfo = document.getElementById("serie-info");

let placarJogador = 0
let placarCpu = 0
let placarDraw = 0
let serieJogador = 0;
let serieCpu = 0;
let rodadaGlobal = 0
let history = [];
let rounds = 1;
let locked = false;
let mode = 'normal';

const gameMode = ['normal', '3', '5'];

const EMOJIS  = { Pedra: '✊', Papel: '✋', Tesoura: '✌️' };


function initMelhorDe3() {
    reset();
}

function neededToWin() {
    if (mode === gameMode[1]) return 2;
    if (mode === gameMode[2]) return 3;
    return null;
}

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

function clearHistory() {
    history = [];
    renderHistory();
}

function renderHistory() {

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
        historyDiv.prepend(p);

    })

}

function atualizarPlacar() {
    document.getElementById('placar-jogador').textContent = "Total de pontos do jogador: " + placarJogador;
    document.getElementById('placar-cpu').textContent = "Total de pontos do Gon: " + placarCpu;
    document.getElementById('placar-empate').textContent = "Total de empates: " + placarDraw;
}

function atualizarSerieInfo() {

    const needed = neededToWin();
    if (!needed) {
        serieInfo.textContent = '';
        return;
    }

    serieInfo.textContent = `Série: Você ${serieJogador} x ${serieCpu} Gon`;

}

function setLocked(value) {
    locked = value;
    btnRock.disabled = value;
    btnPaper.disabled = value;
    btnScissor.disabled = value;
}

function resetSerie() {
    serieJogador = 0;
    serieCpu = 0;
    resultSerie.textContent = '';
    setLocked(false);
    atualizarSerieInfo();
}

function reset() {
    placarJogador = 0;
    placarCpu = 0;
    placarDraw = 0;
    result.textContent = "";
    resultSub.textContent = "";
    resultSerie.textContent = "";
    setLocked(false);
    atualizarPlacar();
    atualizarSerieInfo();
    clearHistory();
}

function setMode(newMode) {
    mode = newMode;
    reset();
}

function showResult(playerChoice) {

    if (locked) return;

    const random = generateRandom();
    const resultado = calculeResult(playerChoice, random);

    console.log(random);
    console.log(playerChoice);

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
    resultSub.textContent = `Você: ${EMOJIS[playerChoice]} ${playerChoice} | Gon: ${EMOJIS[random]} ${random}`;

    const needed = neededToWin();

    if (needed && resultado !== 'Empate') {

        if (resultado === 'Vitória') serieJogador++;
        else serieCpu++;

        let serieWinner = null;
        if (serieJogador >= needed) serieWinner = 'player';
        else if (serieCpu >= needed) serieWinner = 'cpu';

        if (serieWinner) {

            resultSerie.textContent = serieWinner === 'player'
                ? 'Você venceu a série!'
                : 'Gon venceu a série!';
            setLocked(true);
            setTimeout(() => resetSerie(), 2200);

        }

    }

    incrementHistory(playerChoice, random, resultado);
    renderHistory();
    atualizarPlacar();
    atualizarSerieInfo();

}

btnPaper.addEventListener("click", () => showResult('Papel'));
btnRock.addEventListener("click", () => showResult('Pedra'));
btnScissor.addEventListener("click", () => showResult('Tesoura'));
btnReset.addEventListener("click", () => reset());
btnNormalMode.addEventListener("click", () => setMode(gameMode[0]));
btn3Mode.addEventListener("click", () => setMode(gameMode[1]));
btn5Mode.addEventListener("click", () => setMode(gameMode[2]));

