const cardsMass = [
  'img/6_BUB.jpg',
  'img/6_CH.jpg',
  'img/6_PICK.jpg',
  'img/6_TREF.jpg',
  'img/7_BUB.jpg',
  'img/7_CH.jpg',
  'img/7_PICK.jpg',
  'img/7_TREF.jpg',
  'img/8_BUB.jpg',
  'img/8_CH.jpg',
  'img/8_PICK.jpg',
  'img/8_TREF.jpg',
  'img/9_BUB.jpg',
  'img/9_CH.jpg',
  'img/9_PICK.jpg',
  'img/9_TREF.jpg',
  'img/10_BUB.jpg',
  'img/10_CH.jpg',
  'img/10_PICK.jpg',
  'img/10_TREF.jpg',
  'img/J_BUB.jpg',
  'img/J_CH.jpg',
  'img/J_PICK.jpg',
  'img/J_TREF.jpg',
  'img/Q_BUB.jpg',
  'img/Q_CH.jpg',
  'img/Q_PICK.jpg',
  'img/Q_TREF.jpg',
  'img/K_BUB.jpg',
  'img/K_CH.jpg',
  'img/K_PICK.jpg',
  'img/K_TREF.jpg',
  'img/A_BUB.jpg',
  'img/A_CH.jpg',
  'img/A_PICK.jpg',
  'img/A_TREF.jpg',
]

const winLoseText = document.querySelector('.win-lose')
const cardGif = document.getElementById('card_gif')
const gameZoneFirst = document.getElementById('game1')
const gameZoneSecond = document.getElementById('game2')
const scoreFirst = document.getElementById('score1')
const scoreSecond = document.getElementById('score2')
const more = document.getElementById('more')
const pas = document.getElementById('pas')
const btnStart = document.getElementById('start')
btnStart.addEventListener('click', start)
winLoseText.addEventListener('click', (e) => {
  e.target.classList.remove('lose')
  e.target.classList.remove('win')
  e.target.classList.remove('draw')
})

let randomCardsMass
let score1num = 0
let score2num = 0

scoreFirst.innerHTML = score1num
scoreSecond.innerHTML = score2num

function start() {
  gameZoneFirst.innerHTML = ''
  gameZoneSecond.innerHTML = ''
  score1num = 0
  score2num = 0
  scoreFirst.innerHTML = score1num
  scoreSecond.innerHTML = score2num
  more.disabled = false
  pas.disabled = false
  btnStart.disabled = true
  btnStart.removeEventListener('click', start)
  more.addEventListener('click', More)
  pas.addEventListener('click', Pas)
  randomCardsMass = shuffle(cardsMass.map((i) => i))
  generateCard(gameZoneFirst)
  cardGifAnim()
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
  return array
}

function cardGifAnim() {
  cardGif.src = 'img/take_card.gif'
  setTimeout(() => (cardGif.src = 'img/take_card.png'), 1000)
}

function More() {
  generateCard(gameZoneFirst)
  cardGifAnim()
}

function Pas() {
  more.disabled = true
  pas.disabled = true
  btnStart.disabled = false
  btnStart.addEventListener('click', start)
  botInterval = setInterval(() => {
    botPlay(botInterval)
  }, 1100)
}

function botPlay(interval) {
  console.log(score1num, score2num)
  if (score2num > score1num || score2num == score1num || score2num == 20) {
    clearInterval(interval)
    checkWinLose()
  } else if (score2num <= 19) {
    cardGifAnim()
    generateCard(gameZoneSecond)
  }
}

function generateCard(game) {
  counter(game)
  setTimeout(() => {
    let img = document.createElement('img')
    img.className = 'img-item'
    img.src = randomCardsMass[0]
    randomCardsMass.splice(0, 1)
    game.append(img)
  }, 1000)
}

function counter(game) {
  let num
  console.log(randomCardsMass[0])
  for (let i = 0; i < cardsMass.length; i++) {
    if (randomCardsMass[0] == cardsMass[i]) {
      if (i < 4) {
        num = 6
      } else if (i >= 4 && i < 8) {
        num = 7
      } else if (i >= 8 && i < 12) {
        num = 8
      } else if (i >= 12 && i < 16) {
        num = 9
      } else if (i >= 16 && i < 20) {
        num = 10
      } else if (i >= 20 && i < 24) {
        num = 2
      } else if (i >= 24 && i < 28) {
        num = 3
      } else if (i >= 28 && i < 32) {
        num = 4
      } else if (i >= 32 && i < 36) {
        num = 11
      }
    }
  }
  if (game === gameZoneFirst) {
    score1num += num
    setTimeout(() => {
      scoreFirst.innerHTML = score1num
      if (score1num > 21) {
        lose()
      }
    }, 1000)
  } else {
    score2num += num
    setTimeout(() => {
      scoreSecond.innerHTML = score2num
    }, 1000)
  }
}

function checkWinLose() {
  if (score1num <= 21 && score2num <= 21) {
    if (score1num > score2num) {
      win()
    } else if (score2num > score1num) {
      lose()
    } else if (score1num == score2num) {
      draw()
    }
  } else {
    if (score2num > 21) {
      win()
    } else if (score1num > 21) {
      lose()
    }
  }
}

function win() {
  winLoseText.innerHTML = 'Победа'
  winLoseText.classList.add('win')
}

function lose() {
  winLoseText.innerHTML = 'Поражение'
  winLoseText.classList.add('lose')
  more.disabled = true
  pas.disabled = true
  btnStart.disabled = false
  btnStart.addEventListener('click', start)
}

function draw() {
  winLoseText.innerHTML = 'Ничья'
  winLoseText.classList.add('draw')
}
