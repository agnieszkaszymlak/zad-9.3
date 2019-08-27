'use strict';

/* REFERENCJE */
var newGameButton = document.getElementById('new-game-button');

var buttonRock = document.getElementById('rock-button');
var buttonScissors = document.getElementById('scissors-button');
var buttonPaper = document.getElementById('paper-button');

var output = document.getElementById('output');
var choiceButtons = document.getElementById('choice-buttons');

/* NASŁUCHIWACZE */
buttonRock.addEventListener('click', function() {
  playerMove('ROCK');
});
buttonScissors.addEventListener('click', function() {
  playerMove('SCISSORS');
});
buttonPaper.addEventListener('click', function() {
  playerMove('PAPER')
});
newGameButton.addEventListener('click', function(){
  newGame()
});

/* ZMIENNE GLOBALNE */

var playerChoice; 
var computerChoice;
var dispResult;

var wonRounds;
var playerResult = 0;
var computerResult = 0;

/* FUNKCJE */

function newGame() {
    wonRounds = prompt('Enter the number of rounds');
    wonRounds = parseInt(wonRounds); 
  
    if(!isNaN(wonRounds)) {
      choiceButtons.classList.remove('hide');
      newGameButton.classList.add('hide');
    }
};

function addText(text) {
   output.innerHTML = text + '<br><br>';
}

function randMove() {
  var x= Math.floor(Math.random()*3+1);
  if(x===1) return 'ROCK';
  if(x===2) return 'SCISSORS';
  if(x===3) return 'PAPER'; 
}

function playerMove(choice) {
  
  playerChoice = choice;
  computerChoice = randMove();
  
  checkRoundWinner();
  addText('You  ' + dispResult + ': ' + 'You played  ' + playerChoice + ', computer played  ' + computerChoice);
  
  checkEndGame();
  
};

function refreshScore() {
  document.getElementById('playerResult').innerHTML = playerResult;
  document.getElementById('computerResult').innerHTML = computerResult;
}

function resetGame() {
  wonRounds = 0;
  playerResult = 0;
  computerResult = 0;
  choiceButtons.classList.add('hide');
  newGameButton.classList.remove('hide');
  addText('');
  refreshScore();
}

function checkEndGame() {
  
  if(playerResult === wonRounds) {
    alert('Wygrałeś!');
    resetGame();
  }
  else if(computerResult === wonRounds) {
    alert('Przegrales...');
    resetGame();
  }
}

function checkRoundWinner() {
  
  if((playerChoice === 'PAPER' && computerChoice === 'ROCK') 
     || (playerChoice === 'SCISSORS' && computerChoice === 'PAPER') 
     || (playerChoice === 'ROCK' && computerChoice === 'SCISSORS')) {   
    dispResult = 'WIN';
    playerResult++;
  }
  else if(playerChoice === computerChoice) {
    dispResult = 'TIED';
  } 
  else {
    dispResult = 'LOSE';
    computerResult++;
  }
  refreshScore();
}