let game = [];
let score = 0;
const colors = ["red", "blue", "green", "yellow"];
let cellSwitch = false;
let firstCellColumn;
let firstCellRow;

const chooseColor = (cell) => {
    switch (cell) {
        case 0:
            return "red";
            break;
        case 1:
            return "blue";
            break;
        case 2:
            return "green";
            break;
        case 3:
            return "yellow";
            break;
    }
}

const generateGame = () => {
    for (let i = 0; i < 10; i++) {
        game[i] = [];
        for (let j = 0; j < 10; j++) {
            game[i][j] = Math.floor(Math.random() * colors.length);
            let cell = (`${i}${j}`);
            document.getElementById(`${i}${j}`).style.backgroundColor = colors[game[i][j]];
            document.getElementById(`${i}${j}`).addEventListener('click', () => candyClicked(i, j));
        }
    }
}

const candyClicked = (row, col) => {
    let switcher;
    if (cellSwitch == false) {
        firstCellRow = row;
        firstCellColumn = col;
        cellSwitch = true;
    }
    else {
        console.log(firstCellColumn, firstCellRow);
        console.log(row, col);
        switcher = document.getElementById(`${row}${col}`).style.backgroundColor;
        document.getElementById(`${row}${col}`).style.backgroundColor = document.getElementById(`${firstCellRow}${firstCellColumn}`).style.backgroundColor;
        document.getElementById(`${firstCellRow}${firstCellColumn}`).style.backgroundColor = switcher;
        [game[row][col], game[firstCellRow][firstCellColumn]] = [game[firstCellRow][firstCellColumn], game[row][col]];
        cellSwitch = false;
        gameLoop();
    }
}

const check = () => {
    let matched = false;

    // for 5 cells vertical
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 6; i++) {
            if (game[i][j] === game[i + 1][j] && game[i][j] === game[i + 2][j] && game[i][j] === game[i + 3][j] === game[i + 4][j]) {
                matched = true;
                game[i][j] = game[i + 1][j] = game[i + 2][j] = game[i + 3][j] = game[i + 4][j] = null; // Mark matched candies
                score += 1000;
            }
        }
    }
    // for 5 cells horizotal
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (game[i][j] === game[i][j + 1] && game[i][j] === game[i][j + 2] && game[i][j] === game[i][j + 3] === game[i][j + 4]) {
                matched = true;
                game[i][j] = game[i][j + 1] = game[i][j + 2] = game[i][j + 3] = game[i][j + 4] = null; // Mark matched candies
                score += 1000;
            }
        }
    }
    // for 4 cells vertical
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 7; i++) {
            if (game[i][j] === game[i + 1][j] && game[i][j] === game[i + 2][j] && game[i][j] === game[i + 3][j]) {
                matched = true;
                game[i][j] = game[i + 1][j] = game[i + 2][j] = game[i + 3][j] = null; // Mark matched candies
                score += 100;
            }
        }
    }

    // for 4 cells horizotal
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 7; j++) {
            if (game[i][j] === game[i][j + 1] && game[i][j] === game[i][j + 2] && game[i][j] === game[i][j + 3]) {
                matched = true;
                game[i][j] = game[i][j + 1] = game[i][j + 2] = game[i][j + 3] = null; // Mark matched candies
                score += 100;
            }
        }
        // for 3 cells vertical
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 8; i++) {
                if (game[i][j] === game[i + 1][j] && game[i][j] === game[i + 2][j]) {
                    matched = true;
                    game[i][j] = game[i + 1][j] = game[i + 2][j] = null; // Mark matched candies
                    score += 5
                }
            }
        }
        // fpr 3 cells horizontal
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 8; j++) {
                if (game[i][j] === game[i][j + 1] && game[i][j] === game[i][j + 2]) {
                    matched = true;
                    game[i][j] = game[i][j + 1] = game[i][j + 2] = null; // Mark matched candies
                    score += 5;
                }
            }
        }
        console.log(matched)
        return matched;
    }
}

const dropCandies = () => {
    for (let j = 0; j < 10; j++) {
        for (let i = 10 - 1; i >= 0; i--) {
            if (game[i][j] === null) {
                // Move above candies down
                for (let k = i; k > 0; k--) {
                    game[k][j] = game[k - 1][j];
                }
                // Generate a new candy at the top
                game[0][j] = Math.floor(Math.random() * colors.length);
            }
        }
    }
    renderGame();
};

const renderGame = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            document.getElementById(`${i}${j}`).style.backgroundColor = colors[game[i][j]];
        }
    }
};

const gameLoop = () => {
    if (check()) {
        setTimeout(() => {
            dropCandies(); // Drop candies after matches are cleared
            gameLoop(); // Keep checking for more matches after candies drop
        }, 200); // Delay for animation
    }
    document.getElementById("score").innerHTML = score;
    console.log(game)
};

generateGame();
gameLoop();