btnRock = document.getElementById("btnRock");
btnPaper = document.getElementById("btnPaper");
btnScissor = document.getElementById("btnScissor");
result = document.getElementById("result");

let history;


function generateRandom() {

    const possibleRandom = ['Pedra', 'Papel', 'Tesoura'];

    return possibleRandom[Math.floor(Math.random() * possibleRandom.length)];

}

function calculeResult(playerChoice, random) {

    const results = ['Vitória', 'Empate', 'Derrota']

    if (playerChoice === 'Pedra') {
        if (random === 'Papel') {
            return results[2];
        } else if (random === 'Tesoura') {
            return results[0];
        } else {
            return results[1];
        }
    }

    if (playerChoice === 'Papel') {
        if (random === 'Papel') {
            return results[1];
        } else if (random === 'Tesoura') {
            return results[2];
        } else {
            return results[0];
        }
    }

    if (playerChoice === 'Tesoura') {
        if (random === 'Papel') {
            return results[0];
        } else if (random === 'Tesoura') {
            return results[1];
        } else {
            return results[2];
        }
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

function showResult(playerChoice) {

    const random = generateRandom();

    console.log(random);
    console.log(playerChoice);

    result.textContent = calculeResult(playerChoice, random);

    incrementHistory(playerChoice, random, calculeResult(playerChoice, random));
}
btnPaper.addEventListener("click", () => showResult('Papel'));
btnRock.addEventListener("click", () => showResult('Pedra'));
btnScissor.addEventListener("click", () => showResult('Tesoura'));



