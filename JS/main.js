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
  if (num < 1 || num > 100 || isNaN(num)) {
    $('#headers h3').text("That is an invalid guess.")
    return $('#headers h1').text();
  } else {
    return this.checkGuess(num)
  }
}

Game.prototype.checkGuess = function(num) {
  var past = this.pastGuesses
  var win = this.winningNumber

  if (num === win) {
    $('#submit').prop("disabled", true);
    $('#hint').prop("disabled", true);
    $('#headers h2').text("Click Reset button")
    $('#headers h3').text("Nice Job!")
    return "You Win!"
  } else {
    if (past.indexOf(num) > -1) {
      $('#headers h3').text("You have already guessed that number.")
      return $('#headers h1').text();
    } else {
      past.push(num)
      $('#ulBox').find('li').each(function(idx) {
        if (idx === past.length - 1) {
          $(this).text(num)
        }
      })
      if (past.length === 5) {
        $('#submit').prop("disabled", true);
        $('#hint').prop("disabled", true);
        $('#headers h2').text("Click Reset button")
        $('#headers h3').text("Try Again!")
        return "You Lose."
      } else {
        if (this.difference() < 10) {
          $('#headers h3').text("You're burning up!")
          return $('#headers h1').text();
        } else if (this.difference() < 25) {
          $('#headers h3').text("You're lukewarm.")
          return $('#headers h1').text();
        } else if (this.difference() < 50) {
          $('#headers h3').text("You're a bit chilly.")
          return $('#headers h1').text();
        } else {
          $('#headers h3').text("You're ice cold!")
          return $('#headers h1').text();
        }
      }
    }
  }
}

Game.prototype.provideHint = function() {
  var arr = [];
  for (var i = 0; i < 2; i++) {
    arr.push(generateWinningNumber())
  }
  arr.push(this.winningNumber)
  shuffle.call(this, arr)
  return arr
}

function newGame() {
  return new Game
}

window.onload = function() {
  return newGame();
}

function makeGuess(game) {

  var input = $('#inputview').val()
  $('#inputview').val('')
  var output = game.playersGuessSubmission(parseInt(input));
  $('#headers h1').text(output)

  if (document.getElementById("submit").disabled === true) {
    $('#inputview').keypress(function(event) {
      if (event.which === 13) {
          location.reload()
      }
    })
  }

  $('#hint').on('click', function(event){
    var hint = game.provideHint();

    $('#headers h3').text("One of these is the winning number: " + hint[0] + " " + hint[1] + " " + hint[2])
  })


  $('#reset').on('click',function(event){
    location.reload()
  })

}

$(document).ready(function() {
  var game = newGame();

  $('#submit').on('click', function(event) {
    makeGuess(game)
  })

    $('#inputview').keypress(function(event) {
      if (event.which === 13) {
        makeGuess(game)
      }
    })

});
