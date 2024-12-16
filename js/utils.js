'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function playSound(sorc) {
    const sound = new Audio(`sound/${sorc}.mp3`)
    sound.play()
}

function findEmptyPos() {
    var emptyPoss = [] // [{i:0,j:0} , {i:0,j:1}]

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j]
            if (cell === EMPTY) {
                var pos = { i: i, j: j }
                // console.log('pos:', pos)
                emptyPoss.push(pos)
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyPoss.length)
    var emptyPos = emptyPoss[randIdx]
    if (emptyPos) {
        return emptyPos
    } else {
        return null
    }
}

function drawNum2() {
    var idx = getRandomIntInclusive(0, gNums2.length)
    var num = gNums2[idx]

    gNums2.splice(idx, 1)
    return num
}

function updateNeighboring() {
    var negCount = 0

    for (var i = gGamerPos.i - 1; i <= gGamerPos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = gGamerPos.j - 1; j <= gGamerPos.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === gGamerPos.i && j === gGamerPos.j) continue

            if (gBoard[i][j].gameElement === BALL) negCount++
        }
    }
    document.querySelector('.neighboring').innerHTML = '' + negCount
    return negCount
}
