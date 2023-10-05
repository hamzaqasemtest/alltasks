const mapSize = 10;
const minesNumber = 10;




function createMap() {
  const map = [];
  for (let i = 0; i < mapSize; i++) {
    map[i] = [];
    for (let j = 0; j < mapSize; j++) {
      map[i][j] = {
        isMine: false,
        isShowed: false,
        adjacentMinesNumber: 0
      };
    }
  }
  return map;
}


function placeMines(map) {
  let minesPlaced = 0;
  while (minesPlaced < minesNumber) {
    const row = Math.floor(Math.random() * mapSize);
    const col = Math.floor(Math.random() * mapSize);
    if (!map[row][col].isMine) {
      map[row][col].isMine = true;
      minesPlaced++;
    }
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if(map[i][j].isMine == true){
        console.log(i+"          "+j)
      }
    }
  }
  
}


function calculateAdjacentMines(map) {
  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      if (!map[i][j].isMine) {
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const newRow = i + dx;
            const newCol = j + dy;
            if (
              newRow >= 0 &&
              newRow < mapSize &&
              newCol >= 0 &&
              newCol < mapSize &&
              map[newRow][newCol].isMine
            ) {
              count++;
            }
          }
        }
        map[i][j].adjacentMinesNumber = count;
      }
    }
  }
}


function renderBoard(map) {
  const boardElement = document.querySelector('.board');
  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', (event) => handleCellClick(event, map));
      boardElement.appendChild(cell);
    }
  }
}


function handleCellClick(event, map) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const cell = map[row][col];

  if (cell.isShowed) {
    return;
  }

  cell.isShowed = true;
  event.target.classList.add('revealed');
  if (cell.isMine) {
    event.target.textContent = '<i class="fa-solid fa-bomb" style="color: #fa0000;"></i>';
    alert('Game Over!');
    revealAllCells(map);
  } else {
    event.target.textContent = cell.adjacentMinesNumber || '';
    if (cell.adjacentMinesNumber === 0) {
      revealAdjacentCells(row, col, map);
    }
  }
}


function revealAllCells(map) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    const cellData = map[row][col];
    if (cellData.isMine) {
      cell.textContent = '<i class="fa-solid fa-bomb" style="color: #fa0000;"></i>';
    } else {
      cell.textContent = cellData.adjacentMinesNumber || '';
    }
    cell.classList.add('revealed');
  });
}


function revealAdjacentCells(row, col, map) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (
          newRow >= 0 &&
          newRow < mapSize &&
          newCol >= 0 &&
          newCol < mapSize &&
          !map[newRow][newCol].isMine &&
          !map[newRow][newCol].isShowed
        ) {
          const cell = document.querySelector(
            `.cell[data-row="${newRow}"][data-col="${newCol}"]`
          );
          cell.textContent = map[newRow][newCol].adjacentMinesNumber || '';
          cell.classList.add('revealed');
          map[newRow][newCol].isShowed = true;
  
          if (map[newRow][newCol].adjacentMinesNumber === 0) {
            revealAdjacentCells(newRow, newCol, map);
          }
        }
      }
    }
  }


function initGame() {
  const map = createMap();
  placeMines(map);
  calculateAdjacentMines(map);
  renderBoard(map);
}

initGame();
