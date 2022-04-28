let size = 16;
let color = '#333333'


const grid = document.getElementById('grid')
const clearBtn = document.getElementById('clearBtn')
const sizeSlider = document.getElementById('sizeSlider')
const sizeDisplay = document.getElementById('sizeDisplay')

clearBtn.onclick = () => reload()
sizeSlider.onmousemove = (e) => updateSizeDisplay(e.target.value)
sizeSlider.onchange = (e) => changeBoardSize(e.target.value)

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
    e.target.style.backgroundColor = color;
}

window.onload = () => {
    setBoard(size);
}