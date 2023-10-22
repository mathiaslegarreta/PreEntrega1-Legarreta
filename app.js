const min = 1;
const max = 3;
const choices = {
    1: "Piedra",
    2: "Papel",
    3: "Tijera"
};

const results = {
    historial: [],
    roundsPlayed: 0,
    roundsToPlay: 5,
    gameWinner: null
};

let user;
let pc;
let roundResult;
let originalHistory = results.historial.slice();


function loadGameHistory() {
    const storedHistory = localStorage.getItem('gameHistory');
    if (storedHistory) {
        results.historial = JSON.parse(storedHistory);
        originalHistory = results.historial.slice();
        const historialDiv = document.getElementById("historial");
        historialDiv.innerHTML = '';
        results.historial.forEach(winner => {
            if (winner === "Empate" || winner === "Máquina" || winner === "Usuario") {
                const resultado = document.createElement("p");
                resultado.textContent = winner;
                historialDiv.appendChild(resultado);
            }
        });
    }
}

loadGameHistory();


function playGameRound(userChoice) {
    if (results.roundsPlayed >= results.roundsToPlay) {
        determineWinner();
        return;
    }

    user = parseInt(userChoice);
    pc = Math.floor(Math.random() * (max - min + 1)) + min;

    const userChoiceText = choice(user);
    const pcChoiceText = choice(pc);

    displayChoices(userChoiceText, pcChoiceText);

    if (user === pc) {
        roundResult = "EMPATE";
    } else if (
        (user === 1 && pc === 3) ||  
        (user === 2 && pc === 1) ||  
        (user === 3 && pc === 2)  
    ) {
        roundResult = "GANA EL USUARIO";
    } else {
        roundResult = "GANA LA MÁQUINA";
    }

    updateResult(roundResult);
    results.historial.push(roundResult);
    results.roundsPlayed++;

    localStorage.setItem("gameHistory", JSON.stringify(results.historial));

    if (results.roundsPlayed === results.roundsToPlay) {
        determineWinner();
    }
}


function choice(selection) {
    return choices[selection] || "TU ELECCIÓN NO ES CORRECTA!!";
}

function determineWinner() {
    if (results.gameWinner) {
        return;
    }

    const resultElement = document.getElementById('result');

    const userWins = results.historial.filter(result => result === "GANA EL USUARIO").length;
    const cpuWins = results.historial.filter(result => result === "GANA LA MÁQUINA").length;

    if (userWins > cpuWins) {
        announceWinner("Usuario", "EL USUARIO HA GANADO EL JUEGO");
    } else if (cpuWins > userWins) {
        announceWinner("Máquina", "LA PC HA GANADO EL JUEGO");
    } else {
        announceWinner("Empate", "¡EMPATE GENERAL!");
    }
}

function announceWinner(winner, message) {
    results.gameWinner = winner;
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    storeWinner(winner);
}


function storeWinner(winner) {
    results.historial.push(winner); 

    if (results.roundsPlayed === results.roundsToPlay) {
        const historialDiv = document.getElementById("historial");
        const resultado = document.createElement("p");
        resultado.textContent = winner;
        historialDiv.appendChild(resultado);
        localStorage.setItem("gameHistory", JSON.stringify(results.historial));
    }
}



function updateResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}

function displayChoices(userChoice, pcChoice) {
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = `images/${userChoice.toLowerCase()}.png`;
    cpuChoiceImage.src = `images/${pcChoice.toLowerCase()}.png`;
}

function restartGame() {
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = 'images/piedra.png';
    cpuChoiceImage.src = 'images/piedra.png';

    updateResult('A Jugar!');

    results.historial = originalHistory.slice();

    localStorage.removeItem("gameWinner");
    results.gameWinner = null;

    results.roundsPlayed = 0;
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);

const storedWinner = localStorage.getItem("gameWinner");
if (storedWinner) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `${storedWinner} HA GANADO EL JUEGO`;
}

const optionImages = document.querySelectorAll('.option-image');
optionImages.forEach(optionImage => {
    optionImage.addEventListener('click', function () {
        const userChoice = optionImage.getAttribute('data-choice');
        playGameRound(userChoice);
    });
});
const clearHistoryButton = document.getElementById('clear-history');

clearHistoryButton.addEventListener('click', function () {
    results.historial.length = 0;


    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = '';

    localStorage.removeItem("gameHistory");
    localStorage.removeItem("gameWinner");
});