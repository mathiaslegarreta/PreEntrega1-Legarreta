
// 1 es piedra, 2 es papel, 3 es tijera.

//Funcion para reflejar eleccion
function election(choice) {
    let result = ""

    if (choice == 1) {
        result = "PIEDRA"
    } else if (choice == 2) {
        result = "PAPEL"
    } else if (choice == 3) {
        result = "TIJERA"
    } else {
        result = "UNA OPCION INCORRECTA!!"
    }

    return result

}
// Declaracion de variables usuario, maquina, victorias y perdidas.
let user
let pc = 2; //Hago que elija papel hasta que pueda generar un numero aleatorio.
let wins = 0;
let loses = 0;

// Gana el que llega primero a 3 victorias
while (wins < 3 && loses < 3) {

    user = prompt("Elige: 1) Piedra, 2) o 3) Tijera ")

    alert("El Usuario elige " + election(user))
    alert("PC elige " + election(pc))

    //Comparaciones para ver quien gana

    if (user == pc) {
        alert("EMPATE")
    } else if (user == 1 && pc == 3) {
        alert("GANA EL USUARIO");
        wins++;
    } else if (user == 2 && pc == 1) {
        alert("GANA EL USUARIO");
        wins++;
    }
    else if (user == 3 && pc == 2) {
        alert("GANA EL USUARIO");
        wins++;
    }
    else {
        alert("GANA LA PC")
        loses++;
    }



}

//Mostrar cuantas veces gane y perdi.
alert("Ganaste " + wins + "veces. Perdiste " + loses + " veces")



