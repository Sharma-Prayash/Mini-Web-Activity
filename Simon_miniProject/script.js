"use strict";        //PREVENT DECLARATION OF ANY VARIABLE WITHOUT var, let OR const KEYWORD, TO AVOID GLOBAL LEAK. EVEN THE VARIABLE DECLARED INSIDE THE FOR EACH LOOP WITHOUT THESE KEYWORDS.

let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let color = ["green", "red", "yellow", "blue"];

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function () {
        btn.classList.remove("gameFlash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {        //ONLY HANDLES GAME SEQUENCE & LEVEL
    level++;
    h3.innerText = `Level ${level}`;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = color[randomNumber];
    gameSeq.push(randomColor);

    let selectedBtn = document.querySelector(`.${randomColor}`);
    gameFlash(selectedBtn);
}

function checkSeq() {       //HANDLES USER INPUT & RESET
    if (userSeq[userSeq.length - 1] != gameSeq[userSeq.length - 1]) {
        gameOver();
        return;     //TERMINATES THE GAME IF WRONG INPUT
    }

    if (userSeq.length == gameSeq.length) {
        userSeq = [];                           //TO DISPLAY THE HISTORY OF THE CORRECT SEQUENCE USE THE gameSeq[], AND FOR THE USER INPUT, NEED TO IMPLEMENT AS OF REQUIREMENT.
        if (level <= 5) {                           //TIME DELAY CAN BE ADJUSTED BASED ON THE CHOICE OF THE PROGRAMMER!!
            setTimeout(levelUp, 400);
        }
        else if (level <= 10) {
            setTimeout(levelUp, 300);
        }
        else {
            setTimeout(levelUp, 250);
        }
    }
}

function gameOver() {
    h3.innerHTML = `Game Over! Your score was: <b>${level - 1}</b> <br> Press any key to start.`;       //innerText ONLY SETS THE STRING. TO ADD THE HTML TAGS WE USE innerHTML.

    document.body.classList.add("game-over", "shake");      //1> ALTERNATIVELY WE CAN USE: document.body.style.backgroundColor = "red"; BUT IN THAT CASE IF WE WANT TO ADD MORE ANIMATION, LIKE HERE 'shake', ITS
    setTimeout(function () {                                //   IMPLEMENTATION IS MORE TOUGH IN CASE OF DIRECT APPLICATION, INSTEAD OF ADDING CLASS.
        document.body.classList.remove("game-over", "shake");
    }, 500);

    //RESET ALL IMPORTANT VARIABLES
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq();
}

let btns = document.querySelectorAll("div[type='button']");     //1> THE LOOP OVER HERE DOESN'T ITERATE EVERY TIME THE BUTTON IS CLICKED, INSTEAD IT ITERATES ONLY ONCE WHEN THE PROGRAM IS COMPILED TO ADD THE EVENT
for (let btn of btns) {                                              //   LISTENER TO EACH AND EVERY BUTTON. NOW THE BUTTON 'CLICKED' IS HANDLED USING THE CONCEPT 'event delegation' AT THE ELEMENT LEVEL NOT BY 'looping'.
    btn.addEventListener("click", btnPress);                    //2> ON BUTTON CLICK, ONLY THAT BUTTON's EVENT LISTENER IS FIRED [NO ITERATION NO SEARCH AT THIS POINT] THE BROWSER KNOW WHICH BUTTON HAS FIRED THE 
}                                                               //   EVENT AND CALLS THE FUNCTION FOR THAT BUTTON ONLY.