'use strict'

function initAlien() {
    // ALIENS.movementSpeed = 1000
    const { alienMap } = GAME
    alienMap.liveAliens = []
    alienMap.deadAliens = []
    alienMap.dirPos = { i: 0, j: 1 }
    alienMap.isFreeze = false
    alienMap.topRowIdx = 1
    alienMap.bottomRowIdx = 3
    alienMap.colIdxStart = 3
    alienMap.colIdxEnd = 10
}

function createAliens(rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    const { board, gameEls, alienMap } = GAME
    const { liveAliens } = alienMap
    for (let i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (let j = colIdxStart; j <= colIdxEnd; j++) {
            const newAlien = board[i][j]
            newAlien.gameEl = gameEls.alien
            newAlien.isHit = false
            newAlien.pos = { i, j }
            liveAliens.push(newAlien)
            GAME.aliensCount++
        }
    }
    console.log('liveAliens:', liveAliens)
}

function alienHit(pos) {
    const { i, j } = pos
    const { board, gameEls } = GAME
    const { liveAliens,deadAliens } = GAME.alienMap
    const cell = board[i][j]
    cell.isHit = true
    endShoot()
    blinkCell(pos, gameEls.explode, 780)
    playAudio('explode')
    const alienIdx = liveAliens.findIndex(alien => alien.isHit)
    deadAliens.push(liveAliens.splice(alienIdx,1))
    setScore(10)
    if(!liveAliens.length){
        console.log('win:', liveAliens)
    }
}