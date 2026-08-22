const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetbtn');

const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDrawEl = document.getElementById('scoreDraw');

let scores = {
    X: 0,
    O: 0,
    draws: 0
};

let currentplayer = 'X';
let gamestate = ["", "", "", "", "", "", "", "", ""];
let gameactive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Top, middle, bottom rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Left, middle, right columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
];

function handleClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gamestate[index] !== "" || !gameactive) return;
    
    gamestate[index] = currentplayer;
    cell.innerText = currentplayer;
    cell.classList.add(currentplayer.toLowerCase());
    
    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        
        // Check if all three positions have the same non-empty value
        if (gamestate[a] !== "" && gamestate[a] === gamestate[b] && gamestate[a] === gamestate[c]) {
            roundWon = true;
            highlightWinner([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span style="color:var(--neon-${currentplayer === 'X' ? 'blue' : 'pink'})">${currentplayer}</span> WON!`;
        gameactive = false;

        scores[currentplayer]++;
        updateScoreboard();
        return;
    }

    if (!gamestate.includes("")) {
        statusText.innerText = "Game Draw!";
        gameactive = false;

        scores.draws++;
        updateScoreboard();
        return;
    }

    currentplayer = currentplayer === 'X' ? 'O' : 'X';
    statusText.innerHTML = `Player <span style="color:var(--neon-${currentplayer === 'X' ? 'blue' : 'pink'})">${currentplayer}</span>'s turn`;
}

function highlightWinner(indices) {
    indices.forEach(i => {
        if (cells[i]) {
            cells[i].classList.add('winner');
        }
    });
}

function resetgame() {
    currentplayer = 'X';
    gamestate = ["", "", "", "", "", "", "", "", ""];
    gameactive = true;
    statusText.innerHTML = `Player <span style="color:var(--neon-blue)">X</span>'s turn`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.className = "cell";
    });
}

function updateScoreboard() {
    scoreXEl.innerText = scores.X;
    scoreOEl.innerText = scores.O;
    scoreDrawEl.innerText = scores.draws;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetgame);