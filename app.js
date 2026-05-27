


function generateRandom() {

    const possibleRandom = ['Pedra', 'Papel', 'Tesoura'];

    return possibleRandom[Math.floor(Math.random() * possibleRandom.length)];

}

function showResult(playerChoice, random) {

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


