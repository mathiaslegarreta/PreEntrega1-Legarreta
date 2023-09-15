// Declaracion de variables usuario, maquina, victorias y perdidas, juego terminado, resultado.
let userChoice
let cpuChoice
let wins = 0;
let losses = 0;
let gameEnded = false;
let result = document.getElementById("result");


//Funcion para reflejar eleccion
function election(choice) {

    if (choice == 1) {
        return "PIEDRA"
    } else if (choice == 2) {
        return "PAPEL"
    } else if (choice == 3) {
        return "TIJERA"
    } else {
        return "UNA OPCION INCORRECTA!!"
    }



}
//Funcion de aleatoriedad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funcion para comparar opcion usuario vs pc 
function makeChoice(choice) {
    // Si el juego terminó, no hacer nada
    if (gameEnded) {
        return;
    }

    userChoice = choice;
    cpuChoice = aleatorio(1, 3)


    document.getElementById("user-choice").src = `images/${election(userChoice).toLowerCase()}.png`;
    document.getElementById("cpu-choice").src = `images/${election(cpuChoice).toLowerCase()}.png`;



    if (userChoice == cpuChoice) {
        result.textContent = "EMPATE";
    } else if (
        (userChoice == 1 && cpuChoice == 3) ||
        (userChoice == 2 && cpuChoice == 1) ||
        (userChoice == 3 && cpuChoice == 2)
    ) {
        result.textContent = "GANA EL USUARIO";
        wins++;
    } else {
        result.textContent = "GANA LA PC";
        losses++;
    }


    // Verificar si alguien ha ganado 3 veces
    if (wins === 3 || losses === 3) {
        document.getElementById("user-choice").src = "";
        document.getElementById("cpu-choice").src = "";
        if (wins === 3) {
            result.textContent = "¡El usuario ha ganado 3 veces! El juego ha terminado.";
        } else {
            result.textContent = "¡La PC ha ganado 3 veces! El juego ha terminado.";
        }

        // Desactivar el juego una vez alguien llegue a 3 
        gameEnded = true;

    }
}
//Funcion para reiniciar el juego
function restartGame() {
    wins = 0;
    losses = 0;
    result.textContent = "A Jugar!"
    gameEnded = false;

    //Poner imagenes de piedra como al principio
    //Le asigno piedra a las variables para que vuelvan, porque no se me ocurre de que otra forma hacerlo
    userChoice = 1;
    cpuChoice = 1;
    document.getElementById("user-choice").src = `images/${election(userChoice).toLowerCase()}.png`;
    document.getElementById("cpu-choice").src = `images/${election(cpuChoice).toLowerCase()}.png`;
}













