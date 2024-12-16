'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '&#664;'
const CHERRY = '&copysr;'

var totalScore = 56
var gCheryInterval

const gGame = {
    score: 0,
    isOn: false
}
var gBoard = []

function init() {
    console.log('hello')
    hideModal('.win')
    hideModal('.lose')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCheryInterval = setInterval(addCharry,15000)
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
    board[1][1]= board[8][1]=board[1][8]=board[8][8]=SUPER_FOOD
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore= document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    showModal('.lose')
    gGame.isOn = false
}

function showModal(str) {
	var elWin = document.querySelector(str)
    if (str === '.win'){
        clearInterval(gGhostsInterval)
     gGame.isOn = false
    }
	elWin.classList.remove('hidden')
    clearInterval(gCheryInterval)
}

function hideModal(str) {
	var elWin = document.querySelector(str)
	elWin.classList.add('hidden')
}

function addCharry(){
	var emptyCell = findEmptyPos()
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}