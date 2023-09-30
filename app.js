let user;
let pc;
const min = 1;
const max = 3;
const results = [];
const choices = {
    1: "Piedra",
    2: "Papel",
    3: "Tijera"
};

function choice(election) {
    return choices[election] || "TU ELECCIÓN NO ES CORRECTA!!";
}

do {
    user = parseInt(prompt("Elige: 1-Piedra, 2-Papel o 3-Tijera"));

    if (user !== 1 && user !== 2 && user !== 3) {
        alert("ELECCIÓN INCORRECTA. Por favor, elige 1, 2 o 3.");
        continue;
    }

    pc = Math.floor(Math.random() * (max - min + 1)) + min;

    alert("El Usuario elige " + choice(user));
    alert("PC elige " + choice(pc));

    if (user == pc) {
        alert("EMPATE");
        results.push("EMPATE");
    } else if (
        (user == 1 && pc == 3) ||
        (user == 2 && pc == 1) ||
        (user == 3 && pc == 2)
    ) {
        alert("GANA EL USUARIO");
        results.push("GANA EL USUARIO");
    } else {
        alert("GANA LA MÁQUINA");
        results.push("GANA LA MÁQUINA");
    }

} while (results.length < 3);
alert("Resultados de las rondas:\n" + results.join("\n"));

