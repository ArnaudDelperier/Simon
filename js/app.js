/**
 * 
 * Code fourni
 */
const app = {
    // just a utility var to remember all the colors
    colors: ["red", "green", "blue", "yellow"],

    // this var will contain the sequence said by Simon
    sequence: [],

    indice: 0,

    // ID du timer de gameover si le joueur ne fait rien pendant 5 secondes
    idTimeout: undefined,
    playerTurn: false,

    drawCells: function () {
        const playground = document.getElementById("playground");
        for (const color of app.colors) {
            let cell = document.createElement("div");
            cell.className = "cell";
            cell.id = color;
            cell.style.backgroundColor = color;
            playground.appendChild(cell);
            cell.addEventListener("click", app.clickedCell);
        }
    },

    bumpCell: function (color) {
    // let's modify the syle directly
        document.getElementById(color).style.borderWidth = "45px";
        // and reset the same style, after a small pause (150 ms)
        setTimeout(() => {
            document.getElementById(color).style.borderWidth = "0";
        }, 150);

    },

    newGame: function () {
    // start by reseting the sequence 
        app.sequence = [];
        app.indice = 0;
        // make it 3 times :
        for (let index = 0; index < 3; index++) {
            // get a random number between 0 and 3
            let random = Math.floor(Math.random() * 4);
            // add the corresponding color to the sequence
            app.sequence.push(app.colors[random]);
        }

        // start the "Simon Says" sequence
        app.simonSays(app.sequence);
    },

    // fonction pour empêcher le click pendant que Simon parle
    // handler: function(e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    // },

    simonSays: function (sequence) {

        // document.addEventListener("click", app.handler, true);

        app.showMessage("A vous de jouer !");
        if (sequence && sequence.length) {
            // after 500ms, bump the first cell
            setTimeout(app.bumpCell, 500, sequence[0]);
            // plays the rest of the sequence after a longer pause
            setTimeout(app.simonSays, 850, sequence.slice(1));
            app.showMessage("Mémorisez la séquence");
        }
        // console.log(sequence.slice().length);
        if (sequence.slice().length === 0) {
            app.idTimeout = setTimeout(app.gameOver, 5000);
            app.playerTurn = true;
            // document.removeEventListener("click", app.handler, true);
        }
    },

    clickedCell: function (event) {
        if (app.playerTurn === true) {
            app.bumpCell(event.target.id);
            console.log(app.indice);
            if (event.target.style.backgroundColor === app.sequence[app.indice]) {
                clearTimeout(app.idTimeout);
                if (app.indice + 1 < app.sequence.length) {
                    app.indice++;
                    console.log("oui !");
                    app.idTimeout = setTimeout(app.gameOver, 5000);
                } else {
                    app.nextMove();
                    console.log("well done");
                    app.playerTurn = false;
                }
            } else {
                app.gameOver();
                app.playerTurn = false;
            }
        }
    },

    nextMove: function () {
        app.indice = 0;
        // get a random number between 0 and 3
        let random = Math.floor(Math.random() * 4);
        // add the corresponding color to the sequence
        app.sequence.push(app.colors[random]);
        app.simonSays(app.sequence);
    },

    init: function () {
        console.log("init");
        app.drawCells();

        // listen click on the "go" button
        document.getElementById("go").addEventListener("click", app.newGame);
    },

    /** Fin du code fourni. Après, c'est à toi de jouer! */

    showMessage: function (message) {
        document.getElementById("go").style.display = "none";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").innerHTML = message;

    },

    showButton: function () {
        document.getElementById("go").style.display = "block";
        document.getElementById("message").style.display = "none";
    },

    gameOver: function () {
        alert(`Partie terminée. Votre score : ${app.sequence.length - 3}`);
        clearTimeout(app.idTimeout);
        app.showButton();
        app.sequence = [];
    }

};


document.addEventListener("DOMContentLoaded", app.init);
