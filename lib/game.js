var inquirer = require("inquirer");
var chalk = require("chalk");
var Word = require("./Word");
var words = require("./words");

//controlls game 

function Game() {
    var self = this;

    // sets guesses to ten
    this.play = function() {
        this.guessesLeft = 10;
        this.nextWord();
    };

    //makes new word from array
    this.nextWord = function() {
        var randWord = words[Math.floor(Math.random() * words.length)];
        this.currentWord = new Word(randWord);
        console.log('\n' + this.currentWord + '\n');
        this.makeGuess();
    };

    // prompts user for guess 
    this.makeGuess = function() {
        this.askForLetter().then(function() {
            //user loses ask to play again
            if (self.guessesLeft < 1) {
                console.log(
                    "No guesses left! Word was: \"" + self.currentWord.getSolution() + "\"\n"
                );
                self.askToPlayAgain();

                //if user won reset game and on to next word
            } else if (self.currentWord.guessedCorrectly()) {
                console.log("You won! Here's the next word!");
                self.guessesLeft = 10;
                self.nextWord();

                // makes another guess
            } else {
                self.makeGuess();
            }
        });
    };

    // when running out of guesses asks if you want to play again
    this.askToPlayAgain = function() {
        inquirer
            .prompt([{
                type: "confirm",
                name: "choice",
                message: "Play Again?"
            }])
            .then(function(val) {
                //choice to play again or not.
                if (val.choice) {
                    self.play();
                } else {
                    self.quit();
                }
            });
    };

    // Prompts the user to select a letter
    this.askForLetter = function() {
        return inquirer
            .prompt([{
                type: "input",
                name: "choice",
                message: "Guess a letter!",
                validate: function(val) {
                    //user must select a letter
                    return /[a-z]/gi.test(val);
                }
            }])
            .then(function(val) {
                //if guesses correct, log correct
                var didGuessCorrectly = self.currentWord.guessLetter(val.choice);
                if (didGuessCorrectly) {
                    console.log(chalk.green("\nCORRECT!!!\n"));

                    // alerts incorect and how many guesses remain 
                } else {
                    self.guessesLeft--;
                    console.log(chalk.red("\nINCORRECT!!!\n"));
                    console.log(self.guessesLeft + " guesses remaining!!!\n");
                }
            });
    };
    //quits game
    this.quit = function() {
        console.log("\nGoodbye!");
        process.exit(0);
    };
}

module.exports = Game;