const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
const highscore = document.getElementById('highscore')
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let scores = 0
let speed = 0.8
let timerId = 0

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < 100; i++) {
        //create element
        const square = document.createElement('div')
            //add styling to the element
        square.classList.add('square')
            //put the element into our grid
        grid.appendChild(square)
            //push it into a new squares array    
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame(params) {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
        //remove apple
    squares[appleIndex].classList.remove('apple')
        // re-add declared variables
    clearInterval(timerId)
    currentSnake = [2, 1, 0]

    scores = 0
        //re-add new score to browser
    score.textContent = scores

    direction = 1
    interval = 1000
    generateApples()
        //readd the classof snakes to our new current snakes
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, interval)

}

function move() {
    if (
        (currentSnake[0] + width >= 100 && direction === 10) || //if snake has hit bottom
        (currentSnake[0] % width === 9 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -10) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId)


    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
        //remove styling from last element
    squares[tail].classList.remove('snake')
        //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
        //add styling so we can see it

    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
            //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        console.log(tail)
            //grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
            //generate a new apple
        generateApples()
            //add one to the score
        scores++
        score.textContent = scores

        //speed up our snake
        clearInterval(timerId)
        interval = interval * speed
        timerId = setInterval(move, interval)

    }
    squares[currentSnake[0]].classList.add('snake')
}


function generateApples() {
    do {
        //generate a random apple
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
generateApples()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)