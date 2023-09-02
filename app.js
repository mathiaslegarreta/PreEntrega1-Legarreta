
// 1 es piedra, 2 es papel, 3 es tijera.

//Funcion para reflejar eleccion
function choice(election) {
    let result = ""

    if (election == 1) {
        result = "Piedra"
    } else if (election == 2) {
        result = "Papel"
    } else if (election == 3) {
        result = "Tijera"
    } else {
        result = "TU ELECCION NO ES CORRECTA!!"
    }

    return result

}

let user
let pc = 2; //Hago que elija papel hasta que pueda generar un numero aleatorio.

user = prompt("Elige: 1-Piedra, 2- Papel o 3- Tijera ")

alert("El Usuario elige " + choice(user))
alert("PC elige " + choice(pc))



//Comparaciones para ver quien gana

if (user == pc) {
    alert("EMPATE")
} else if (user == 1 && pc == 3) {
    alert("GANA EL USUARIO")
} else if (user == 2 && pc == 1) {
    alert("GANA EL USUARIO")
}
else if (user == 3 && pc == 2) {
    alert("GANA EL USUARIO")
}
else {
    alert("GANA LA MAQUINA")
}

