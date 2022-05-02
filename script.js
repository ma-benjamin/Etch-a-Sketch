let size = 16;
let color = '#333333'
let brush = 'brush'

function setCurrentColor(c) {
    color = c
}

function setCurrentBrush(b) {
    brush = b
}

function setCurrentSize(s) {
    size = s
}

const grid = document.getElementById('grid')
const brushBtn = document.getElementById('brushBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeSlider = document.getElementById('sizeSlider')
const sizeDisplay = document.getElementById('sizeDisplay')
const colorWheel = document.getElementById('colorWheel')

brushBtn.onclick = () => setCurrentBrush('brush')
eraserBtn.onclick = () => setCurrentBrush('eraser')
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
    if(brush === 'brush') {
        e.target.style.backgroundColor = color;
    } else if (brush === 'eraser') {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(b) {
    if (brush === 'brush') {
        brushBtn.classList.remove('active')
    } else if (brush === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (b === 'brush') {
        brushBtn.classList.remove('active')
    } else if (b === 'eraser') {
        eraserBtn.classList.remove('active')
    }
}

window.onload = () => {
    setBoard(size)
    activateButton(brush)
}