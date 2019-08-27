'use strict';

/* REFERENCJE */
var newGameButton = document.getElementById('new-game-button');
var choiceButtons = document.getElementById('choice-buttons');

var buttonRock = document.getElementById('rock-button');
var buttonScissors = document.getElementById('scissors-button');
var buttonPaper = document.getElementById('paper-button');

var output = document.getElementById('output');
var choiceButtons = document.getElementById('choice-buttons');

var modal = document.querySelector('.modal');

/* NASŁUCHIWACZE */

choiceButtons.addEventListener('click', function(event) {

   if(event.target.tagName === 'BUTTON') {
     var choice = event.target.dataset.move;
     console.log(choice);
     playerMove(choice);
   }
  
});

newGameButton.addEventListener('click', function(){
  newGame()
});

/* ZMIENNE GLOBALNE */

var params = {
  player: {
    choice: '',
    result: 0
  },
  computer: {
    choice: '',
    result: 0
  },
  wonRounds: 0,
  dispResult: ''
}

var roundResults = [];

/* FUNKCJE */

function newGame() {
    params.wonRounds = prompt('Enter the number of rounds');
    params.wonRounds = parseInt(params.wonRounds); 
  
    if(!isNaN(params.wonRounds)) {
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

function addRoundResult() {
  roundResults.push({ playerChoice: params.player.choice, computerChoice: params.computer.choice, score: params.player.result + ':' + params.computer.result }); 
  console.log(roundResults);
}

function playerMove(choice) {
  
  params.player.choice = choice;
  params.computer.choice = randMove();
  
  checkRoundWinner();
  addText('You  ' + params.dispResult + ': ' + 'You played  ' + params.player.choice + ', computer played  ' + params.computer.choice);
  
  addRoundResult();
  checkEndGame();
  
};

function refreshScore() {
  document.getElementById('playerResult').innerHTML = params.player.result;
  document.getElementById('computerResult').innerHTML = params.computer.result;
}

function resetGame() {
  params.wonRounds = 0;
  params.player.result = 0;
  params.computer.result = 0;
  choiceButtons.classList.add('hide');
  newGameButton.classList.remove('hide');
  addText('');
  refreshScore();
}

function showFinalModal(winner) {
  modal.querySelector('.modal__result').innerText = winner;
  
  var tbody = '<tbody>';
  
  roundResults.forEach(function(round) {
    tbody += `
       <tr>
         <td>${round.playerChoice}</td>
         <td>${round.computerChoice}</td>
         <td>${round.score}</td>
       </tr>`;
  });
  
  tbody += '</tbody>';
  modal.querySelector('.modal__table').innerHTML = tbody;
  
  modal.classList.remove('hide');
}

function checkEndGame() {
  
  if(params.player.result === params.wonRounds) {
    showFinalModal('You win!');
    resetGame();
  }
  else if(params.computer.result === params.wonRounds) {
    showFinalModal('You lose...');
    resetGame();
  }
}

function checkRoundWinner() {
  
  if((params.player.choice === 'PAPER' && params.computer.choice === 'ROCK') 
     || (params.player.choice === 'SCISSORS' && params.computer.choice === 'PAPER') 
     || (params.player.choice === 'ROCK' && params.computer.choice === 'SCISSORS')) {   
    params.dispResult = 'WIN';
    params.player.result++;
  }
  else if(params.player.choice === params.computer.choice) {
    params.dispResult = 'TIED';
  } 
  else {
    params.dispResult = 'LOSE';
    params.computer.result++;
  }
  refreshScore();
}
