const grid = document.querySelector(".main-container");
let isMouseDown = false;
let randomEnabled = false;

function addSquares(num) {
    for(let i = 0;i < num*num;i++){
        const square = document.createElement("div");
        square.classList.add("square")
        square.style.width = `${100/num}%`;
        square.add
        grid.appendChild(square);
    }
}

function getRandomNumber(){
    return Math.floor(Math.random()*256);
}

function paint (eventObj) {
    const square = eventObj.target;
    if (randomEnabled) {
        if (!square.dataset.colored) { 
            square.style.backgroundColor = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`
            square.style.opacity = "0.1";
            square.dataset.colored = "true";
        }
        else {
            let currentOpacity = parseFloat(square.style.opacity) || 0;
            square.style.opacity = Math.min(currentOpacity + 0.1, 1);
        }
    }
    else {
        square.style.backgroundColor = "black";
        square.style.opacity = "1";
        square.dataset.colored = "true";
    }
}

document.addEventListener('mousedown',e => {
    if (e.button === 0) {
        isMouseDown = true;
    }
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

grid.addEventListener('mouseover', e => {
    if (e.target.matches(".square") && isMouseDown) {
        paint(e);
    }   
});

grid.addEventListener('mousedown', e => {
     if (e.button === 0) {
        paint(e);
    }
});

document.querySelector('#create-new-grid').addEventListener('click', e => {
    let input = 0;
    do {
        input = prompt("Enter a valid number (1-100)");
        if (input === null) break;
        input = Number(input);
    }
    while(!Number.isInteger(input) || input < 1 || input > 100);
    grid.innerHTML = "";
    addSquares(input);
});

document.querySelector("#random-color").addEventListener('click', e => {
    randomEnabled = true;
});

// initial
addSquares(50);