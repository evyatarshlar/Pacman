'use strict'

const PACMAN = '😜'
var gPacman

// Assets
const PACMANUP_IMG = '<img src="img/pacmanup.png">'
const PACMANDOWN_IMG = '<img src="img/pacmandown.png">'
const PACMANLEFT_IMG = '<img src="img/pacmanleft.png">'
const PACMANRIGHT_IMG = '<img src="img/pacmanright.png">'

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        facing : PACMANUP_IMG,
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation[0].i][nextLocation[0].j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            killGhost(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) {
        playSound(`food`)
        updateScore(1)
        totalScore++
        // console.log('totalScore', totalScore)
        if (totalScore === 56) showModal()
    }
    if (nextCell === CHERRY) {
        updateScore(10)
        playSound(`superfood`)
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        playSound(`superfood`)
        gPacman.isSuper = true
        weakGhosts()
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000)
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation[0]
    gPacman.facing = nextLocation[1].facing
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, gPacman.facing)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = [{
        i: gPacman.location.i,
        j: gPacman.location.j,
    },
      {  facing : gPacman.facing
    }]
    // console.log('nextLocation', nextLocation)
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation[0].i--
            nextLocation[1].facing = PACMANUP_IMG
            break;
        case 'ArrowDown':
            nextLocation[0].i++
            nextLocation[1].facing = PACMANDOWN_IMG
            break;
        case 'ArrowLeft':
            nextLocation[0].j--
            nextLocation[1].facing = PACMANLEFT_IMG
            break;
        case 'ArrowRight':
            nextLocation[0].j++
            nextLocation[1].facing = PACMANRIGHT_IMG
            break;

        default:
            return null;
    }
    return nextLocation
}