const gameOptions = [
  {
    type: 'rock',
    losesTo: 'paper',
    emoji: '🪨',
  },
  {
    type: 'paper',
    losesTo: 'scissors',
    emoji: '📄',
  },
  {
    type: 'scissors',
    losesTo: 'rock',
    emoji: '✂️',
  },
]

//!Buttons Specificities
var playerSelection

const rockEl = document.querySelectorAll('.rock')
for (let i = 0; i < rockEl.length; i++) {
  let button = rockEl[i]
  button.addEventListener('click', function () {
    playerSelection = gameOptions[0]
    console.log('You chose: ' + playerSelection.type + playerSelection.emoji)
  })
}

const paperEl = document.querySelectorAll('.paper')
for (let i = 0; i < paperEl.length; i++) {
  let button = paperEl[i]
  button.addEventListener('click', function () {
    playerSelection = gameOptions[1]
    console.log('You chose: ' + playerSelection.type + playerSelection.emoji)
  })
}

const scissorsEl = document.querySelectorAll('.scissors')
for (let i = 0; i < scissorsEl.length; i++) {
  let button = scissorsEl[i]
  button.addEventListener('click', function () {
    playerSelection = gameOptions[2]
    console.log('You chose: ' + playerSelection.type + playerSelection.emoji)
  })
}

//!Starting a round
var computerSelection
var chosenOptionEmoji = document.querySelectorAll('.chosenOptionEmoji')
const gameButtons = document.querySelectorAll('.gameButton')

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * gameOptions.length)
  computerSelection = gameOptions[randomIndex].type
  const consoleEmoji = gameOptions[randomIndex].emoji
  console.log('Computer chose: ' + computerSelection + consoleEmoji)
  chosenOptionEmoji[0].innerText = consoleEmoji
}

function disappearFunction() {
  document.getElementById('chooseOneBtn').classList.add('noDisplay')
}

function reappearFunction() {
  document.getElementById('restartGameBtn').classList.remove('noDisplay')
}

function highlight(scoreEl) {
  var orig = scoreEl.style.color
  scoreEl.style.color = '#f0ac0f'
  setTimeout(function () {
    scoreEl.style.color = orig
  }, 400)
}

var computerScoreEl = document.getElementById('computerScore')
var userScoreEl = document.getElementById('userScore')

let userScore = 0
let computerScore = 0

var defeatSound = new Audio('assets/audios/wronganswer-37702.mp3')
var victorySound = new Audio('assets/audios/correct-choice-43861.mp3')

for (let i = 0; i < gameButtons.length; i++) {
  let button = gameButtons[i]

  button.addEventListener('click', function () {
    getComputerChoice()
    disappearFunction()
    reappearFunction()

    if (playerSelection.type === computerSelection) {
      console.log('%cdraw huhu', 'color: #4399dd; font-size: 25px')

      highlight(computerScoreEl)
      highlight(userScoreEl)
      defeatSound.play()
    } else if (playerSelection.losesTo === computerSelection) {
      console.log(
        '%cyou lose 😔',
        'color: #e44535; font-size: 25px; font-weight: bold'
      )

      highlight(computerScoreEl)
      defeatSound.play()

      computerScore += 1
      computerScoreEl.innerText = computerScore
    } else {
      console.log(
        '%cyou win! whoop whoop',
        'color: #6eb179; font-size: 25px; font-weight: bold'
      )

      highlight(userScoreEl)

      userScore += 1
      userScoreEl.innerText = userScore
      victorySound.play()
    }

    for (let i = 0; i < chosenOptionEmoji.length; i++) {
      let emoji = chosenOptionEmoji[i]
      emoji.classList.remove('noDisplay')
    }
    chosenOptionEmoji[1].innerText = playerSelection.emoji
  })
}
