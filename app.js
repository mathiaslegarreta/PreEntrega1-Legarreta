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

function playRound(userChoice) {
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

function restartGame() {
    const userChoiceImage = document.getElementById('user-choice');
    const cpuChoiceImage = document.getElementById('cpu-choice');

    userChoiceImage.src = 'images/piedra.png';
    cpuChoiceImage.src = 'images/piedra.png';

    const resultElement = document.getElementById('result');
    resultElement.textContent = 'A Jugar!';

    results.length = 0;
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartGame);
