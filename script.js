/********************************************************** *
 * Title:   Color Game - script.js
 * Purpose: To provide the logic and interaction for the 
 *          Great Colour Guessing Game
 * Author:  Anthony McGrath - akm@anthonykyle.co.nz
 * ******************************************************** */

/********************************************************** *
 * Define Global Constants / Page Objects
 * ******************************************************** */
const squares       = document.querySelectorAll('.square');
const colorDisplay  = document.querySelector('#rgb');
const message       = document.querySelector('#message');
const header        = document.querySelector('header');
const reset         = document.querySelector('#reset');
const hard          = document.querySelector('#hard');
const easy          = document.querySelector('#easy');

/********************************************************** *
 * Define global variable for storing references
 * ******************************************************** */
let difficulty = 2;
let lastDifficulty = 0;
let pickedColor = "";

/********************************************************** *
 * Add Global Event Listeners
 * ******************************************************** */
function addEventListeners(){
  reset.addEventListener('click', startGame);
  hard.addEventListener('click', changeDifficulty);
  easy.addEventListener('click', changeDifficulty);
  squares.forEach(square => {
    square.addEventListener('click', clickSquare);
  })
}

/********************************************************** *
 * Game Functions
 * ******************************************************** */
function changeDifficulty(evt){                   // Function to change the difficulty of the game
  easy.classList.remove('selected');              
  hard.classList.remove('selected');              
  this.classList.add('selected');
  if(this.id === 'easy'){
    difficulty = 1;
  } else {
    difficulty = 2;
  } // if-else
  startGame();
} // changeDifficulty(evt)

function clickSquare(evt){                        // Function to process a square being clicked
  let squareColor = this.style.backgroundColor;
  if (squareColor === pickedColor){
    win();
  } else {
    this.classList.add('hidden');
    updateMessage("Try Again");
  } // if-else
} // clickSquare(evt)

function win(){                                   // Function for handling a win event.
  for (let i = 0; i < squares.length; i++){       // Change all squares + header to picked color
    if (colors[i]){
      squares[i].style.backgroundColor = pickedColor;
      squares[i].classList.remove('hidden');
    }
  } 
  updateMessage("Correct!");
  updateHeaderColor(pickedColor);
  updateReset(true);
} // win()

function updateMessage(msg){                      // Function to update the message text 
  message.style.opacity = '0';                    // with supplied string
  setTimeout(function(){
    message.textContent = msg;
    if (msg !== '') {
      message.style.opacity = '1';
    }
  }, 200); // setTimeout()
} // updateMessage(msg)

function updateReset(bool){                       // Function to toggle reset button text
  if (bool){
    reset.textContent = "Play Again?";
  } else {
    reset.textContent = "New Colors";
  } // if-else
} // updateReset(bool)

function updateHeaderColor(color){                // function to change the header backgroundColor
    header.style.backgroundColor = color;
} // updateHeaderColor(color)

function randomNumber(limit){                     // Function to generate a random number with 
  return Math.floor(Math.random() * Math.floor(Number(limit))); // the provided limit
} // randomNumber(limit)

function generateColor(){                         // Function to generate a random RGB code
  return "rgb(" + randomNumber(256) + ", " + randomNumber(256) + ", " + randomNumber(256) + ")";
} // generateColor()

function generateColorArray(){                    // Function to generate an array of colors
  colors.length = 0;
  for (let i = 0; i < (difficulty * 3); i++){
    colors.push(generateColor());
  } // for < dificulty * 3
} // generateColorArray()

function selectColor(){                           // Function to select a random color from generated colors
  pickedColor = colors[randomNumber(colors.length)];
  colorDisplay.textContent = pickedColor;
} // selectColor()

function refreshSquares(){                        // Function to change the colors of existing squares 
  for (let i = 0; i < squares.length; i++){       // if same difficulty
    if (colors[i]){
      squares[i].classList.remove('hidden');
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].classList.add('hidden');
    }
    
  } // for < squares.length
} // refreshSquares

function startGame(){                             // Function to start the game
  colors = [];
  updateReset();
  updateHeaderColor("rgba(64,9,96,1)");
  generateColorArray();
  selectColor();
  refreshSquares();
  updateMessage('');
} // startGame()

addEventListeners();
startGame();