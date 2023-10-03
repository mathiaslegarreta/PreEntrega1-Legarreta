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

const results = []; 
let roundsPlayed = 0; 
const roundsToPlay = 5; 

function playRound(userChoice) {
    if (roundsPlayed >= roundsToPlay) {
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

    results.push(roundResult);

    roundsPlayed++;

    if (roundsPlayed >= roundsToPlay) {
        determineWinner();
    }
}

const optionImages = document.querySelectorAll('.option-image');
optionImages.forEach(optionImage => {
    optionImage.addEventListener('click', function() {
        const userChoice = optionImage.getAttribute('data-choice');
        playRound(userChoice);
    });
});

function choice(election) {
    return choices[election] || "TU ELECCIÓN NO ES CORRECTA!!";
}

function determineWinner() {
    const resultElement = document.getElementById('result');

    const userWins = results.filter(result => result === "GANA EL USUARIO").length;
    const cpuWins = results.filter(result => result === "GANA LA MÁQUINA").length;

    if (userWins > cpuWins) {
        resultElement.textContent = "EL USUARIO HA GANADO EL JUEGO";
        storeWinner("Usuario");
    } else if (cpuWins > userWins) {
        resultElement.textContent = "LA PC HA GANADO EL JUEGO";
        storeWinner("Máquina");
    } else {
        resultElement.textContent = "¡EMPATE GENERAL!";
        storeWinner("Empate");
    }
}

function storeWinner(winner) {
    localStorage.setItem("gameWinner", winner);
}

function restartGame() {
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = 'images/piedra.png';
    cpuChoiceImage.src = 'images/piedra.png';

    
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'A Jugar!';

   
    results.length = 0;

    localStorage.removeItem("gameWinner");

    roundsPlayed = 0;
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);

const storedWinner = localStorage.getItem("gameWinner");
if (storedWinner) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `${storedWinner} HA GANADO EL JUEGO`;
}
