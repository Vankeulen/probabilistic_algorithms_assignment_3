SIZE = 12;
START = 0;
TRIALS_START = 2;
TRIALS_POW = .11;
TRIALS_MAX = 10000;

console.log(`Queens problem of size=${SIZE}`)
function createBoard(board) {
    var b = [];
    
    if (board === undefined) {
        // Create a new SIZE-by-SIZE board
        for (let y = 0; y < SIZE; y++) {
            var row = []
            for (let x = 0; x < SIZE; x++) {
                row.push(0);
            }
            b.push(row);
        }
    } else {
        // Create a copy of the board parameter
        for (let y = 0; y < SIZE; y++) {
            var row = []
            for (let x = 0; x < SIZE; x++) {
                row.push(board[y][x]);
            }
            b.push(row);
        }

    }

    return b;
}

/** Get if a queen can be placed on a given board at the given (x,y) position */
function canPlaceQueen(board, x, y) {
    for (let xx = 0; xx < SIZE; xx++){
        if (board[y][xx] !== 0) {
            return false;
        }
    }
    for (let yy = 0; yy < SIZE; yy++){
        if (board[yy][x] !== 0) {
            return false;
        }
    }
    for (let i = 1; i < SIZE; i++) {
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
            if (y2 < SIZE) {
                if (board[y2][x1] !== 0) {
                    return false;
                }
            }
        }
        // Check for queens in rightward diagonals
        if (x2 < SIZE) {
            // Right/up
            if (y1 >= 0) {
                if (board[y1][x2] !== 0) {
                    return false;
                }
            }
            // Right/down
            if (y2 < SIZE) {
                if (board[y2][x2] !== 0) {
                    return false;
                }
            }
        }

    }


    return true;
}

function printBoard(board) {
    for (let i = 0; i < SIZE; i++) {
        console.log(board[i]);
    }
}

function solveBoard(board, remainingQueens) {
    if (remainingQueens === 0) {
        return board
    }
    // Create a copy of the board that we are given
    let copy = createBoard(board);

    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            if (canPlaceQueen(board, x, y)) {
                
                // Set position to 1 to place queen
                copy[y][x] = 1; 

                // See if there is a solution 
                let solution = solveBoard(copy, remainingQueens-1);
                if (solution !== null) {
                    // And return it if we find it
                    return solution
                }

                // Unset that queen for the next iteration
                copy[y][x] = 0;

            }

        }
    }

    return null
}

function placeQueensRandomly(k) {
    // create an empty board
    let board = createBoard();
    // Clamp k in range [0, SIZE]
    if (k < 0) { k = 0; }
    if (k > SIZE) { k = SIZE; }

    let placed = 0;
    let safety = 0;

    while (placed < k) {
        // Pick a random (x,y) position
        let x = Math.floor(Math.random() * SIZE)
        let y = Math.floor(Math.random() * SIZE)

        if (canPlaceQueen(board, x, y)) {
            board[y][x] = 1;
            placed++;
            safety = 0;
        } else {
            safety++;
            if (safety > SIZE*SIZE*4) {
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
for (let k = START; k <= SIZE; k++) {
    // get a number of trials to run
    // bias number of trials to be higher for a larger k
    let trials = Math.floor( Math.pow(TRIALS_START, 1 + k * TRIALS_POW) );
    // Cap number of trials at 10k
    if (trials > TRIALS_MAX) { trials = TRIALS_MAX; }

    // Start with a zero for the total time 
    let totalTime = 0;

    console.log(`Starting ${trials} trials for ${k} random queens`)
    
    for (let i = 0; i < trials; i++) {
        // Get start timestamp
        let start = new Date().getTime();

        while (true) {

            // Place k queens randomly
            let board = placeQueensRandomly(k);

            // Backtrack the other SIZE-k queens
            let solution = solveBoard(board, SIZE-k);
            
            if (solution !== null) {
                break;
            }
            //console.log(`Failed random board with ${k} queens`)
        }

        // Get end timestamp as soon as loop exits...
        let end = new Date().getTime();

        let diff = end - start;
        totalTime += diff;
    }

    let average = totalTime / trials;
    times.push(average);

}
for (let k = 0; k < times.length; k++) {
    console.log(`Average trial for k=${k+START}: ${times[k]}ms`)
}