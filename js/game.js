'use strict'

const WALL = '🧱'
const FOOD = '🔸'
const EMPTY = ' '
const SUPER_FOOD = '🍭'
const CHERRY = '🍒'

var totalScore

var gCheryInterval

const gGame = {
    score: 0,
    isOn: false
}
var gBoard = []

function init() {
    totalScore = 0
    console.log('hello')
    hideModal()
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCheryInterval = setInterval(addCharry, 15000)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[8][1] = board[1][8] = board[8][8] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    // console.log('Game Over')
    gGame.isOn = false
    showModal()
}

function showModal() {
    if (gGame.isOn) {
        var elWin = document.querySelector('.restart h1')
        elWin.innerText = 'You Won!'
        clearInterval(gGhostsInterval)
        gGame.isOn = false
        playSound(`win`)
    } else {
        var elLose = document.querySelector('.restart h1')
        elLose.innerText = 'Game Over!'
        playSound(`gameover`)
    }
    var elRestart = document.querySelector('.restart')
    elRestart.classList.remove('hidden')
    clearInterval(gCheryInterval)
}

function hideModal() {
    var elRestart = document.querySelector('.restart')
    elRestart.classList.add('hidden')
}

function addCharry() {
    var emptyCell = findEmptyPos()
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}