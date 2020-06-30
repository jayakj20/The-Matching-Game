const container = document.querySelector(".container");
const blackbox = document.getElementsByClassName ("blackbox");
let countNum = 0; 
const clickedElement = [];

/* event.target.classList.remove ("show"); */ // to hide cards again


function showCards (event) { 
if ( countNum <= 2 && event.target !== event.currentTarget) {
if (event.target.tagName === "DIV") {
let child = event.target.querySelector("img"); 
child.classList.add ("show");
clickedElement.push (child); 
console.log(clickedElement);
countNum++; 
if (countNum === 2) {
if (clickedElement[0].getAttribute('alt') === clickedElement[1].getAttribute('alt')) {
    for(var i=1; i>=0; i--) {
        clickedElement.splice(i, 1);
} countNum = 0; 
} else {
for(var i=1; i>=0; i--) {
    clickedElement[i].classList.remove ("show");
    clickedElement.splice(i,1); 
} countNum =0; 
} 
}
}
}
}

//Event Listeners
container.addEventListener("click", showCards);