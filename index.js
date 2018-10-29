const Word = require("./Word.js");
const inquirer = require("inquirer");

const words = [
  "ppp", "beyondlove", "drunkinla",
  "levitation", "DARLING", "spacesong",
  "dive", "lemonglow", "thehours",
  "lazuli", "commongirl", "masterofnone",
  "gila"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

function init() {
  pickedWords = [];
  console.log("------------------------------------------");
  console.log("--------------  --  ----------------------");
  console.log("-------------  ----  ---------------------");
  console.log("--------------  --  ----------------------");
  console.log("---------------- -------------------------");
  console.log("Hi! This is a Beach House word guess game.");
  console.log("------------------------------------------");
  console.log("Words are songs by Beach House, no spaces.");
  console.log("------------------------------------------");

  playGame();
}

function playGame() {
  pickedWord = "";
  guesses = 15;
  if(pickedWords.length < words.length) {
    pickedWord = getWord();
  } else {
    // WIN CONDITION
    console.log("Victoria and Alex would be so proud. Nice!");
    continuePrompt();
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

function getWord() {
  let rand = Math.floor(Math.random() * words.length);
  let randomWord = words[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function makeGuess() {
  let checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: word.update() + 
              "\nGuess a letter!" +
              "\nGuesses Left: " + guesses
    }
  ])
  .then(data => {
    word.letters.forEach(letter => {
      letter.checkLetter(data.guessedLetter);
      checker.push(letter.getCharacter());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      guesses--;
      if(guesses === 0) {
        console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
        continuePrompt();
      } else {
        makeGuess();
      }
    } else {
      console.log("CONGRATS! YOU GOT THE WORD!");
      console.log(word.update());
      playGame();
    }
  });
}

function continuePrompt() {
  inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "Would you like to play again?",
        choices: ["Yes", "No"]
      }
    ])
  .then(data => {
      if(data.continue === "Yes") {
        init();
      } else {
        console.log("Thanks for playing!");
      }
  });
}

init();