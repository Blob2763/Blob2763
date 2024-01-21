const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// setup canvas
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// config
let cellsPerRow = 250;
let cellWidth = canvas.width / cellsPerRow;
let cellsPerColumn = Math.ceil(canvas.height / cellWidth);

const colours = ['#ffffff', '#F7B39F', '#FC7753'];
const states = colours.length
const possibleNeighbourhoods = states ** 3;

const possibleRules = states ** possibleNeighbourhoods - 1;

let ruleNumber = Math.floor(Math.random() * possibleRules + 1);

generatePattern(ruleNumber);

function generatePattern(ruleNumber) {
    let rule = ruleNumber.toString(states).padStart(possibleNeighbourhoods, '0');
    
    // start row
    let currentRow = []
    for (let i = 0; i < cellsPerRow; i++) {
        currentRow.push(0);
    }
    currentRow[Math.floor(cellsPerRow / 2)] = 2

    let y = 0

    // rendering
    function renderCurrentRow() {
        for (let i = 0; i < cellsPerRow; i++) {
            const cell = currentRow[i];
            const colour = colours[cell];
            ctx.fillStyle = colour;
            ctx.fillRect(i * cellWidth, y * cellWidth, cellWidth, cellWidth);
        }
    }

    renderCurrentRow();

    for (let i = 0; i < cellsPerColumn; i++) {
        y++;
        let nextRow = []
        nextRow.push(0);
        for (let idx = 1; idx < cellsPerRow - 1; idx++) {
            const left = currentRow[idx - 1];
            const cell = currentRow[idx];
            const right = currentRow[idx + 1];

            nextRow.push(calculateCell([left, cell, right]));
        }
        nextRow.push(0);

        currentRow = nextRow;

        renderCurrentRow();
    }

    function calculateCell(neighbourhood) {
        const neighbourhoodId = possibleNeighbourhoods - 1 - parseInt(neighbourhood.join(''), states);

        return parseInt(rule[neighbourhoodId]);
    }
}

const ruleInput = document.getElementById('rule-input');
ruleInput.value = ruleNumber

ruleInput.addEventListener('input', function () {
    ruleNumber = ruleInput.value;
    generatePattern(ruleNumber);
});

const zoomInput = document.getElementById('zoom');
zoomInput.addEventListener('input', function () {
    cellsPerRow = zoomInput.value;
    cellWidth = canvas.width / cellsPerRow;
    cellsPerColumn = Math.ceil(canvas.height / cellWidth);

    generatePattern(ruleNumber);
});