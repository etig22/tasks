let grid;
let cols;
let rows;
let resolution = 10;

// Set canvas
function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

// 2D grid function
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// Game of Life evolution
function draw() {
  background(0);

  // Draw cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1)  {
        fill(255);
        stroke(0);
        rect(x, y, resolution-1, resolution-1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let state = grid[i][j];

      // Count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i , j)

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0 ;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

//Count function
function countNeighbors(grid, x, y) {
  let sum = 0;

  // Wrap around
  for (let i = -1; i < 2; i++ ) {
    for (let j = -1; j < 2; j++ ) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
