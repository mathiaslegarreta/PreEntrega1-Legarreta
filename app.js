let user;
let pc;
let roundResult;
const min = 1;
const max = 3;
const choices = {
    1: "Piedra",
    2: "Papel",
    3: "Tijera"
};
const results = {
    historial: [], // Array para almacenar el historial de resultados
    roundsPlayed: 0,
    roundsToPlay: 5, // Cambiado a 5 rondas
    gameWinner: null // Ganador del juego
};

function playRound(userChoice) {
    if (results.roundsPlayed >= results.roundsToPlay) {
        determineWinner();
        return;
    }

    user = parseInt(userChoice);
    pc = Math.floor(Math.random() * (max - min + 1)) + min;

    const userChoiceText = choice(user);
    const pcChoiceText = choice(pc);

    const resultElement = document.getElementById('result');
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = `images/${userChoiceText.toLowerCase()}.png`;
    cpuChoiceImage.src = `images/${pcChoiceText.toLowerCase()}.png`;

    if (user == pc) {
        roundResult = "EMPATE";
    } else if (
        (user == 1 && pc == 3) ||
        (user == 2 && pc == 1) ||
        (user == 3 && pc == 2)
    ) {
        roundResult = "GANA EL USUARIO";
    } else {
        roundResult = "GANA LA MÁQUINA";
    }

    resultElement.textContent = roundResult;
    results.historial.push(roundResult); // Agrega el resultado al historial
    results.roundsPlayed++;

    if (results.roundsPlayed === results.roundsToPlay) {
        determineWinner(); // Verificar ganador después de todas las rondas
    }
}

function choice(election) {
    return choices[election] || "TU ELECCIÓN NO ES CORRECTA!!";
}

function determineWinner() {
    if (results.gameWinner) {
        return; // Si ya se determinó un ganador, no hacer nada
    }

    const resultElement = document.getElementById('result');

    const userWins = results.historial.filter(result => result === "GANA EL USUARIO").length;
    const cpuWins = results.historial.filter(result => result === "GANA LA MÁQUINA").length;

    if (userWins > cpuWins) {
        results.gameWinner = "Usuario";
        resultElement.textContent = "EL USUARIO HA GANADO EL JUEGO";
        storeWinner("Usuario");
    } else if (cpuWins > userWins) {
        results.gameWinner = "Máquina";
        resultElement.textContent = "LA PC HA GANADO EL JUEGO";
        storeWinner("Máquina");
    } else if (userWins === results.roundsToPlay) {
        results.gameWinner = "Empate";
        resultElement.textContent = "¡EMPATE GENERAL!";
        storeWinner("Empate");
    }
}

function storeWinner(winner) {
    localStorage.setItem("gameWinner", winner);

    // Mostrar el ganador en el historial solo una vez si es un empate general o hay un ganador
    if (winner === "Empate" && results.roundsPlayed === results.roundsToPlay) {
        const historialDiv = document.getElementById("historial");
        const resultado = document.createElement("p");
        resultado.textContent = winner;
        historialDiv.appendChild(resultado);
    } else if (results.roundsPlayed === results.roundsToPlay) {
        const historialDiv = document.getElementById("historial");
        const resultado = document.createElement("p");
        resultado.textContent = winner;
        historialDiv.appendChild(resultado);
    }
}

function restartGame() {
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = 'images/piedra.png';
    cpuChoiceImage.src = 'images/piedra.png';

    const resultElement = document.getElementById('result');
    resultElement.textContent = 'A Jugar!';

    results.historial.length = 0; // Limpia el historial

    localStorage.removeItem("gameWinner");
    results.gameWinner = null; // Reinicia el ganador

    results.roundsPlayed = 0; // Reinicia el contador de rondas
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
        playRound(userChoice);
    });
});
