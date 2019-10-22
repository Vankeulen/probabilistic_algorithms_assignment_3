
function createBoard(board) {
    let b = [];

    if (board === undefined) {
        // Create a new 8-by-8 board
        for (let i = 0; i < 8; i++) {
            b.push([0, 0, 0, 0, 0, 0, 0, 0]);
        }
    } else {
        for (let y = 0; y < 8; y++) {
            let row = [];
            for (let x = 0; x < 8; x++) {
                row.push(board[y][x]);
            }
            b.push(row);
        }
    }

    return b;
}

function canPlaceQueen(board, x, y) {
    for (let xx = 0; xx < 8; xx++) {
        if (board[y][xx] !== 0) {
            return false;
        }
    }
    for (let yy = 0; yy < 8; yy++) {
        if (board[yy][x] !== 0) {
            return false;
        }
    }
    for (let i = 0; i < 8; i++) {
        let x1 = x - i;
        let x2 = x + i;
        let y1 = y - i;
        let y2 = y + i;

        // Check for queens in leftward diagonals
        if (x1 >= 0) {
            // Left/up
            if (y1 >= 0) {
                if (board[y1][x1] !== 0) {
                    return false;
                }
            }
            // Left/down
            if (y2 < 8) {
                if (board[y2][x1] !== 0) {
                    return false;
                }
            }
        }
        // Check for queens in rightward diagonals
        if (x2 < 8) {
            // Right/up
            if (y1 >= 0) {
                if (board[y1][x2] !== 0) {
                    return false;
                }
            }
            // Right/down
            if (y2 < 8) {
                if (board[y2][x2] !== 0) {
                    return false;
                }
            }
        }

    }
    return true;
}

function printBoard(board) {
    for (let i = 0; i < 8; i++) {
        console.log(board[i]);
    }
}

function solveBoard(board, remainingQueens) {
    if (remainingQueens === 0) {
        return board;
    }
    // Create a copy of board with queen placed at (x,y)
    let copy = createBoard(board);
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (canPlaceQueen(board, x, y)) {
                // Set position to 1 to place queen
                copy[y][x] = 1;

                // See if there is a solution
                let solution = solveBoard(copy, remainingQueens - 1)
                if (solution !== null) {
                    // And return it if we find it
                    return solution;
                }
                // Unset that queen for the next iteration
                copy[y][x] = 0;
            }
        }
    }

    return null;
}

function placeQueensRandomly(k) {
    // Create an empty
    let board = createBoard();
    if (k < 0) { k = 0; }
    if (k > 8) { k = 8; }

    let placed = 0;
    let safety = 0;

    while (placed < k) {
        let x = Math.floor(Math.random() * 8)
        let y = Math.floor(Math.random() * 8)

        if (canPlaceQueen(board, x, y)) {
            board[y][x] = 1;
            placed++;
            safety = 0;
        } else {
            safety++;
            if (safety > 8 * 8 * 4) {
                // Reset board to empty
                placed = 0;
                safety = 0;
                board = createBoard();
            }
        }
    }

    return board;
}


let times = [];
for (let k = 0; k < + 9; k++) {
    // Get a number of trials to run
    // bias number of trials to be higher for a larger k
    let trials = Math.floor(Math.pow(10, 1 + k * .5));
    // Cap number of trials at 10k
    if (trials > 10000) { trials = 10000; }

    // Start with a zero for the total time
    let totalTime = 0;

    console.log(`Starting ${trials} trials for ${k} random queens`)

    for (let i = 0; i < trials; i++) {
        // Get start timestamp
        let start = new Date().getTime();

        while (true) {
            // Place k queens randomly
            let board = placeQueensRandomly(k);

            // Backtrack the other 8-k queens
            let solution = solveBoard(board, 8 - k);

            if (solution !== null) {
                break;
            }
        }

        // Get end timestamp as soon as loop exits...
        let end = new Date().getTime();

        let diff = end - start;
        totalTime += diff;
    }
    let average = totalTime / trials;
    times.push(average);

}
for (let k = 0; k < 8; k++) {
    console.log(`Average trial for k=${k}: ${times[k]}ms`)
}