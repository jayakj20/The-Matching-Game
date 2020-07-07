// Variable Declarations
const container = document.querySelector(".container");
const blackbox = document.querySelectorAll(".pictures");
const moves = document.getElementById("moves");
const timeElapsed = document.querySelector(".TimeElapsed");
const restartButton = document.getElementById('restartGame')
let countNum = 0;
let movesCounter = 0;
const clickedElement = [];
let time = 0; 
let timeStart = true;
let interval;

function setTime() {
    ++time;
    timeElapsed.innerHTML = "Time Elapsed: " + pad(parseInt(time / 60)) + " " + pad(time % 60);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function checkGameDone() {
    var count = 0;
    blackbox.forEach(function (index) {
        if (index.classList.contains("show")) {
            count++;
            console.log(count);
        }
    });
    if (count === 15) {
     return true;
    } else { return false; };

}

/* Event Handler for clicks on images, contains logic to enable css property 
 visible to show cards and  if matching keep as show otherwise hide */
function showCards(event) {
    if (timeStart) {
         interval = setInterval(setTime, 1000);
    }
    timeStart = false;
    if (!checkGameDone()) {
        if (countNum < 2 && event.target !== event.currentTarget) {
            if (event.target.tagName === "DIV") {
                movesCounter++;
                moves.innerHTML = "Moves: " + movesCounter;
                countNum++;
                let child = event.target.querySelector("img");
                child.classList.add("show");
                clickedElement.push(child);
                if (countNum === 2) {
                    if (clickedElement[0].getAttribute('alt') === clickedElement[1].getAttribute('alt')) {
                        for (var i = 1; i >= 0; i--) {
                            clickedElement.splice(i, 1);
                        } countNum = 0;
                    } else {
                        setTimeout(function () {
                            for (var i = 1; i >= 0; i--) {
                                clickedElement[i].classList.remove("show");
                                clickedElement.splice(i, 1);
                            } countNum = 0;
                        }, 1000);
                    }
                }
            }
        }
    } else {
        alert("Congratulations! You have matched all the Avengers!");
        restartGame();

    }
}

//Logic to restart game, when the restart button is pressed
function restartGame() {
    blackbox.forEach(function (index) {
        index.classList.remove("show");
    })
    movesCounter = 0;
    moves.innerHTML = "Moves: " + movesCounter;
    clearInterval(interval);
    timeElapsed.innerHTML = "Time Elapsed: ";
    time = 0;
    timeStart = true;
}

//Event Listeners
container.addEventListener("click", showCards);
restartButton.addEventListener("click", restartGame);
