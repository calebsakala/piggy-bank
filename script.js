'use strict';

let playerOneName = document.querySelector("#name--0")
let playerTwoName = document.querySelector("#name--1")
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdScoreButton = document.querySelector(".btn--hold");
const image = document.querySelector(".dice");
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");
let p1Score = document.querySelector("#score--0");
let p2Score = document.querySelector("#score--1");
let playerOneCurrent = document.querySelector("#current--0");
let playerTwoCurrent = document.querySelector("#current--1");
let p1RunningScore = Number(playerOneCurrent.textContent);
let p2RunningScore = Number(playerTwoCurrent.textContent);
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.show-modal');


const askForNames = function () {
  let player1 = prompt(`What is your name? (Leave blank to accept "${playerOneName.textContent}")`);
  let player2 = prompt(`What is your name? (Leave blank to accept "${playerTwoName.textContent}")`);
  if (player1) {
    playerOneName.textContent = player1;
  } else {
  }
  if (player2) {
    playerTwoName.textContent = player2;
  } else {

  }
}


const resetTheGame = function () {
  if (playerOne.classList.contains("player--winner")) {
    playerOne.classList.remove("player--winner")
  } else if (playerTwo.classList.contains("player--winner")) {
    playerTwo.classList.remove("player--winner")
    playerTwo.classList.remove("player--active")
    playerOne.classList.add("player--active")
  }
  if (playerTwo.classList.contains("player--active")) {
    playerTwo.classList.remove("player--active")
    playerOne.classList.add("player--active")
  }
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  playerOneCurrent.textContent = 0;
  playerTwoCurrent.textContent = 0;
  p1RunningScore = Number(playerOneCurrent.textContent);
  p2RunningScore = Number(playerTwoCurrent.textContent);
  p1Score.textContent = 0;
  p2Score.textContent = 0;
  askForNames()
}


const switchActivePlayer = function () {
  if (playerOne.classList.contains("player--active")) {
    playerOne.classList.remove("player--active")
    p1RunningScore = 0;
    playerOneCurrent.textContent = 0;

    playerTwo.classList.add("player--active")
  } else {
    playerTwo.classList.remove("player--active")
    p2RunningScore = 0;
    playerTwoCurrent.textContent = 0;

    playerOne.classList.add("player--active")
  }
}


const checkForWinner = function () {
  let gameOver = false
  if (Number(p1Score.textContent) >= 100) {
    gameOver = true
    playerOne.classList.remove("player--active")
    playerOne.classList.add("player--winner")
  } else if (Number(p2Score.textContent) >= 100) {
    playerTwo.classList.remove("player--active")
    playerTwo.classList.add("player--winner")
    gameOver = true
  }
  return gameOver
}


const holdTheScore = function () {
  let gameOver = checkForWinner()
  if (!gameOver) {
    if (playerOne.classList.contains("player--active")) {
      p1Score.textContent = Number(p1Score.textContent) + p1RunningScore;
    } else {
      p2Score.textContent = Number(p2Score.textContent) + p2RunningScore;
    }
    let gameOver = checkForWinner()
    if (!gameOver) {
      switchActivePlayer()
    }
  }
}


const addToCurrent = function (roll) {
    if (playerOne.classList.contains("player--active")) {
      p1RunningScore += roll;
      playerOneCurrent.textContent = p1RunningScore;
    } else {
      p2RunningScore += roll;
      playerTwoCurrent.textContent = p2RunningScore;
  }
}


const rollTheDice = function () {
  const gameOver = checkForWinner()
  if (!gameOver) {
    const roll = Math.floor(Math.random() * 6) + 1;
    switch(roll) {
      case 1:
        image.src = "dice-1.png";
        switchActivePlayer()
        break;
      case 2:
        image.src = "dice-2.png";
        addToCurrent(roll);
        break;
      case 3:
        image.src = "dice-3.png";
        addToCurrent(roll);
        break;
      case 4:
        image.src = "dice-4.png";
        addToCurrent(roll);
        break;
      case 5:
        image.src = "dice-5.png";
        addToCurrent(roll);
        break;
      case 6:
        image.src = "dice-6.png";
        addToCurrent(roll);
        break;
    }
  }
}


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}


const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

askForNames()
rollDiceButton.addEventListener('click', rollTheDice);
holdScoreButton.addEventListener('click', holdTheScore)
newGameButton.addEventListener('click', resetTheGame)
btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
btnOpenModal.addEventListener('click', openModal)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains("hidden")) {
    closeModal();
  }
})