// List of words to guess
var wordArray = ["ACDC",
                "AEROSMITH",
                "RADIOHEAD",
                "METALLICA",
                "NIRVANA",
                "PRINCE",
                "COLDPLAY",
                "TRAIN",
                "EMINEM",
                "BEYONCE"];

// Word to guess
var word = "";
// guesses remaining
var lives = 10;
// Number of wins
var wins = 0;
// Letters in the chosen word
var letters = [];
// guessed letters
var guessedLetters = [];
// matched letters
var matchedLetters = [];


// Functions

// Set the game up
function setup() {
    // Choose a word
    var wordIndex = Math.floor(Math.random() * 10);
    console.log(wordIndex, "Word Index");
    var word = wordArray[wordIndex];
    console.log(word, "Word");

    //Split word into letters
    letters = word.split("");

    //Writes the underlines to the screen and updates as the user guesses
    wordDisplay();

    //Updates the users total guesses
    totalGuesses();
}

//Runs when a user guesses
function onGuess(key) {

    if (lives === 0) {
        restartGame();
    } else {
        //incorrect guess
        incorrectGuess(key);

        //matched guess
        correctGuess(key);

        //Update display
        wordDisplay();

        //check for winner
        if (updateWins() === true) {
            restartGame();
        }
    }
}

function incorrectGuess(key) {

    if((guessedLetters.indexOf(key) === -1) && (letters.indexOf(key) === -1)) {
        //add to guessed letters array
        guessedLetters.push(key);

        //decrease lives
        lives--;

        document.querySelector("#lives").innerHTML = lives;
        document.querySelector("#guessed").innerHTML = guessedLetters.join(", ");
    }
}

function correctGuess(key) {

    for (var i = 0; i < letters.length; i++) {
        
        if ((key === letters[i]) && (matchedLetters.indexOf(key) === -1)) {
           
            matchedLetters.push(key);
        }
    }
}

function totalGuesses() {
    lives = letters.length + 6;

    document.querySelector("#lives").innerHTML = lives;
}

function wordDisplay() {
    var display = "";

    for (var i = 0; i < letters.length; i++) {
        
        if (matchedLetters.indexOf(letters[i]) !== -1) {
            display += letters[i];
        }
       
        else {
            display += "&nbsp;_&nbsp;";
        }
    }

    document.querySelector("#myword").innerHTML = display;
}

function restartGame() {
    document.querySelector("#guessed").innerHTML = "";
    word = null;
    letters = [];
    matchedLetters = [];
    guessedLetters = [];
    lives = 0;
    key = null;
    setup();
    onGuess();
}

function updateWins() {
    var win;

    if (matchedLetters.length === 0) {
        win = false;
    } else {
        win = true;
    }

    for (var i = 0; i < letters.length; i++) {
        if (matchedLetters.indexOf(letters[i]) === -1) {
            win = false;
        }
    }

    if (win) {

        wins++;

        document.querySelector("#wins").innerHTML = wins;

        return true;
    }

    return false;
}
            
setup();

document.onkeyup = function(event) {

    var key = event.key;

    letterGuessed = key.toUpperCase();
    
    onGuess(letterGuessed);
};