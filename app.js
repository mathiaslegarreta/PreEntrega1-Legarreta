// Declaracion de variables usuario, maquina, victorias y perdidas.
let userChoice
let cpuChoice
let wins = 0;
let loses = 0;

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

function makeChoice(choice) {
    userChoice = choice;
    cpuChoice = aleatorio(1, 3)

    document.getElementById("user-choice").src = `images/${election(userChoice).toLowerCase()}.png`;
    document.getElementById("cpu-choice").src = `images/${election(cpuChoice).toLowerCase()}.png`;
    

    if (userChoice == cpuChoice) {
        alert("EMPATE");
    } else if ((userChoice == 1 && cpuChoice == 3) || 
               (userChoice == 2 && cpuChoice == 1) || 
               (userChoice == 3 && cpuChoice == 2)) {
        alert("GANA EL USUARIO");
        wins++;
    } else {
        alert("GANA LA PC");
        losses++;
    }
    
    updateScore();

}
function updateScore() {
    alert("Ganaste " + wins + " veces. Perdiste " + losses + " veces");
}



// // Gana el que llega primero a 3 victorias
// while (wins < 3 && loses < 3) {



//     alert("El Usuario elige " + election(user))
//     alert("PC elige " + election(pc))

//     //Comparaciones para ver quien gana
//     if (user == pc) {
//         alert("EMPATE")
//     } else if (user == 1 && pc == 3) {
//         alert("GANA EL USUARIO");
//         wins++;
//     } else if (user == 2 && pc == 1) {
//         alert("GANA EL USUARIO");
//         wins++;
//     }
//     else if (user == 3 && pc == 2) {
//         alert("GANA EL USUARIO");
//         wins++;
//     }
//     else {
//         alert("GANA LA PC")
//         loses++;
//     }
// }

// //Mostrar cuantas veces ganó y perdó el usuario.
// alert("Ganaste " + wins + " veces. Perdiste " + loses + " veces")



