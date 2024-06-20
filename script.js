// old JS

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
            box.innerHTML = "X";
            box.style.color = "#0000FF";
            box.style.fontWeight = "900" ; 
        } else {
            box.innerHTML = "O";
            box.style.color = "#FF0000";
            box.style.fontWeight = "900" ; 
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
        box.style.fontWeight = "" ; 
        box.style.backgroundColor = "black" ;
        box.classList.remove("scale-it") ; 
    })
    colorPlayer();
    // #game-box : display: block & #db : display: none below 

    // done ->
    let to_show = document.querySelector("#game-box");
    let to_hide = document.querySelector("#db");

    to_show.style.display = "block";
    to_hide.style.display = "none";

    return;
}

const checkWinner = () => {
    let found = false;

    for (let i = 0; i < 8; ++i) {
        let val1 = boxes[winPatterns[i][0]].innerText;
        let val2 = boxes[winPatterns[i][1]].innerText;
        let val3 = boxes[winPatterns[i][2]].innerText;

        let box1 = boxes[winPatterns[i][0]];
        let box2 = boxes[winPatterns[i][1]];
        let box3 = boxes[winPatterns[i][2]];

        if ((val1 !== "X" && val1 !== "O") || (val2 !== "X" && val2 !== "O") || (val3 !== "X" && val3 !== "O")) {
            found = true;
        }

        if (val1 === val2 && val2 === val3) {

            setTimeout(() => {
                setTimeout(() => {
                    setTimeout(() => {
                        box3.style.backgroundColor = "#3CB371";
                        box3.classList.add("scale-it") ; 
                        setTimeout(() => {
                            // remove the alert here and make the display none for the #game-box and display flex for #db
                            // done -> 
                            let to_hide = document.querySelector("#game-box");
                            let to_show = document.querySelector("#db");
            
                            to_hide.style.display = "none";
                            to_show.style.display = "flex";
            
                            let to_display = document.querySelector(".decision");
                            to_display.innerHTML = "Congratulations <br> Player " + val1 + " is the Winner ";
            
                            // alert("Player " + val1 + " is The Winner");
                            // resetGame();
                            turn = false;
                        }, 500)
                    }, 150)
                    box2.style.backgroundColor = "#3CB371";
                    box2.classList.add("scale-it") ; 
                }, 150)
                box1.style.backgroundColor = "#3CB371";
                box1.classList.add("scale-it") ; 
            }, 150)
            return;
        }
    }
    if (!found) {

        // done ->
        setTimeout(() => {
            // remove the alert here and make the display none for the #game-box and display flex for #db
            let to_hide = document.querySelector("#game-box");
            let to_show = document.querySelector("#db");

            to_hide.style.display = "none";
            to_show.style.display = "flex";

            let to_display = document.querySelector(".decision");
            to_display.innerHTML = "Oops <br> The Game is a Tie";

            // alert("The Game is Tie! Play Again?");
            // resetGame();
            turn = false;
        }, 300)

    }
    return;
}

document.addEventListener("keydown", (event) => {
    if (event.key >= '1' && event.key <= '9') {
        let boxNumber = parseInt(event.key);
        let box = document.querySelector(`.box${boxNumber}`);
        handleBoxClick(box);
    } else if (event.key === 'Enter') {
        if (document.querySelector("#db").style.display === "flex") {
            let resetBtn2 = document.querySelector("#reset-2");
            resetBtn2.click();
        }
    }
});

resetBtn.addEventListener("click", resetGame);
