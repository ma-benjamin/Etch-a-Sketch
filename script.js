let size = 16;
let color = '#333333'
let brush = 'brush'

function setCurrentColor(c) {
    color = c
}

function setCurrentBrush(b) {
    selectButton(b)
    brush = b
}

function setCurrentSize(s) {
    size = s
}

const grid = document.getElementById('grid')
const brushBtn = document.getElementById('brushBtn')
const randomBtn = document.getElementById('randomBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeSlider = document.getElementById('sizeSlider')
const sizeDisplay = document.getElementById('sizeDisplay')
const colorWheel = document.getElementById('colorWheel')

brushBtn.onclick = () => setCurrentBrush('brush')
eraserBtn.onclick = () => setCurrentBrush('eraser')
randomBtn.onclick = () => setCurrentBrush('random')
clearBtn.onclick = () => reload()
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeBoardSize(e.target.value)
colorWheel.onchange = (e) => changeColor(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function updateSizeDisplay(s) {
    sizeDisplay.innerHTML = `${s} x ${s}`
}

function changeBoardSize(s) {
    size = s
    updateSizeDisplay(s)
    reload()
}

function reload() {
    clear()
    setBoard(size)
}

function clear() {
    grid.innerHTML = ''
}

function changeColor(c) {
    color = c;
}

function setBoard(s) {
    grid.style.gridTemplateColumns = `repeat(${s}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${s}, 1fr)`

    for (let i = 0; i < s * s; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('tile')
        gridElement.addEventListener('mouseover', paint)
        gridElement.addEventListener('mousedown', paint)
        grid.appendChild(gridElement)
    }
}

function paint(e) {
    if(e.type === 'mouseover' && !mouseDown) return
    if(brush === 'random') {
        var red = Math.floor(256 * Math.random())
        var green = Math.floor(256 * Math.random())
        var blue = Math.floor(256 * Math.random())
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
    } else if(brush === 'brush') {
        e.target.style.backgroundColor = color;
    } else if (brush === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function selectButton(b) {
    if (brush === 'brush') {
        brushBtn.classList.remove('active')
    } else if (brush === 'eraser') {
        eraserBtn.classList.remove('active')
    } else if (brush === 'random') {
        randomBtn.classList.remove('active')
    }

    if (b === 'brush') {
        brushBtn.classList.add('active')
    } else if (b === 'eraser') {
        eraserBtn.classList.add('active')
    } else if (b === 'random') {
        randomBtn.classList.add('active')
    }
}

window.onload = () => {
    setBoard(size)
    selectButton(brush)
}