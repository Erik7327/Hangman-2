// shows the letter or _ for game

function Letter(char) {
    this.visible = !/[a-z]/i.test(char);
    this.char = char;
}

//shows character or underscore
Letter.prototype.toString = function() {
    if (this.visible === true) {
        return this.char;
    }
    return "_";
};

Letter.prototype.getSolution = function() {
    return this.char;
};

//users guess
Letter.prototype.guess = function(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }
    return false;
};

module.exports = Letter;