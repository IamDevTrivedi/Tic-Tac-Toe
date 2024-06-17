let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-game");
let mapArray = [7, 8, 9, 4, 5, 6, 1, 2, 3];
let turn = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const colorPlayer = () => {
    let player1 = document.querySelector("#p1");
    let player2 = document.querySelector("#p2");

    if (turn) {
        player1.style.color = "rgb(0,255,255)";
        player2.style.color = "white";
    } else {
        player2.style.color = "rgb(0,255,255)";
        player1.style.color = "white";
    }
}

const handleBoxClick = (box) => {
    console.log("Grid Box is Clicked");

    if (box.innerText === "1" || box.innerText === "2" || box.innerText === "3" || box.innerText === "4" || box.innerText === "5" || box.innerText === "6" || box.innerText === "7" || box.innerText === "8" || box.innerText === "9") {
        if (turn) {
            box.innerText = "X";
            box.style.color = "white";
        } else {
            box.innerText = "O";
            box.style.color = "white";
        }
        checkWinner();
        turn = !turn;
        colorPlayer();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => handleBoxClick(box));
})

const resetGame = () => {
    turn = true;  
    boxes.forEach((box, idx) => {
        box.style.color = "";
        box.innerText = `${mapArray[idx]}`;
    })
    colorPlayer();
}

const checkWinner = () => {
    let found = false;

    for (let i = 0; i < 8; ++i) {
        let val1 = boxes[winPatterns[i][0]].innerText;
        let val2 = boxes[winPatterns[i][1]].innerText;
        let val3 = boxes[winPatterns[i][2]].innerText;

        if ((val1 !== "X" && val1 !== "O") || (val2 !== "X" && val2 !== "O") || (val3 !== "X" && val3 !== "O")) {
            found = true;
        }

        if (val1 === val2 && val2 === val3) {
            alert("Player " + val1 + " is The Winner");
            resetGame();
            turn = false ; 
            return;
        }
    }
    if (!found) {
        alert("The Game is Tie! Play Again?");
        resetGame();
        turn = false ; 
    }
    return;
}

document.addEventListener("keydown", (event) => {
    if (event.key >= '1' && event.key <= '9') {
        let boxNumber = parseInt(event.key);
        let box = document.querySelector(`.box${boxNumber}`);
        handleBoxClick(box);
    }
});

resetBtn.addEventListener("click", resetGame);
