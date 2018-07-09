function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
  var m = arr.length,
    t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i]
    arr[i] = t
  }
  return arr
}

function Game() {
  this.winningNumber = generateWinningNumber();
  this.playersGuess = null
  this.pastGuesses = []
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function() {
  if (this.playersGuess < this.winningNumber) {
    return true
  } else {
    return false
  }
}

Game.prototype.playersGuessSubmission = function(num) {
  this.playersGuess = num;
  if (num < 1 || num > 100 || typeof num != "number") {
    throw "That is an invalid guess."
  } else {
    return this.checkGuess(num)
  }
}

Game.prototype.checkGuess = function(num) {
  var past = this.pastGuesses
  var win = this.winningNumber

  if (num === win) {
    return "You Win!"
  } else {
    if (past.indexOf(num) > -1) {
      return "You have already guessed that number."
    } else {
      past.push(num)
      if (past.length === 5) {
        return "You Lose."
      } else {
        if (this.difference() < 10) return "You're burning up!"
        else if (this.difference() < 25) return "You're lukewarm."
        else if (this.difference() < 50) return "You're a bit chilly."
        else return "You're ice cold!"
      }
    }
  }
}

function newGame(){
  return new Game
}

Game.prototype.provideHint = function(){
  var arr = [];
  for(var i = 0; i < 2; i++){
    arr.push(generateWinningNumber())
  }
  arr.push(this.winningNumber)
  shuffle.call(this,arr)
  return arr
}
