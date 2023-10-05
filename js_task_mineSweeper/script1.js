
function isInsideMap(row,col,map) {
  return row >= 0 && row < map.length && col >= 0 && col < map.length;
}

function createMap(size) {
  const map = [];
  for (let i = 0; i < size; i++) {
    map[i] = [];
    for (let j = 0; j < size; j++) {
      map[i][j] = {
        isMine: false,
        isShowed: false,
        isFlagged: false, 
        adjacentMinesNumber: 0
      };
    }
  }
  return map;
}

function checkWin(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      const cell = map[i][j];
      if (!cell.isMine && !cell.isShowed) {
        return false;
      }
    }
  }
  return true;
}

function placeMines(map,minesNumber) {
  while(minesNumber > 0) {
    const row = Math.floor(Math.random() * map.length);
    const col = Math.floor(Math.random() * map.length);
    if (!map[row][col].isMine) {
      map[row][col].isMine = true;
      minesNumber--;
    }
  }
}

function calculateAdjacentMines(map) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (!map[i][j].isMine) {
        let count = 0;
        for (let AdjacentPostionX = -1; AdjacentPostionX <= 1; AdjacentPostionX++) {
          for (let AdjacentPostionY = -1; AdjacentPostionY <= 1; AdjacentPostionY++) {
            const newRow = i + AdjacentPostionX;
            const newCol = j + AdjacentPostionY;
            if (isInsideMap(newRow,newCol,map) && map[newRow][newCol].isMine) {
              count++;
            }
          }
        }
        map[i][j].adjacentMinesNumber = count;
      }
    }
  }
}

function renderMap(map) {
  const mapElement = document.querySelector('.map');
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('row-num', i);
      cell.setAttribute('col-num', j);

      /*
          cell.addEventListener('click', function(event) {
            handleCellClick(event, map);
          });
          cell.addEventListener('contextmenu', function(event) {
            handleCellRightClick(event, map);
          });
      */
      cell.addEventListener('click', (event) => handleCellClick(event, map));
      cell.addEventListener('contextmenu', (event) => handleCellRightClick(event, map));
      mapElement.appendChild(cell);
    }
  }
}

function handleCellRightClick(event, map) {
  event.preventDefault(); 
  const row = parseInt(event.target.getAttribute('row-num'));
  const col = parseInt(event.target.getAttribute('col-num'));  
  console.log(row + "   "+col);
  console.log(event);
  const cell = map[row][col];
  if (cell.isShowed) {
    return;
  }

  cell.isFlagged = !cell.isFlagged;
  if (cell.isFlagged) {
    event.target.classList.add('fa-solid', 'fa-flag', 'flag-style');
  } else {
    event.target.classList.remove('fa-solid', 'fa-flag', 'flag-style');
  }
}



function handleCellClick(event, map) {
  const row = parseInt(event.target.getAttribute('row-num'));
  const col = parseInt(event.target.getAttribute('col-num'));  
  const cell = map[row][col];
  if (cell.isShowed) {
    return;
  }

  cell.isShowed = true;
  event.target.classList.add('revealed');
  if (cell.isMine) {
    event.target.classList.add('fa-solid', 'fa-flag', 'flag-style');
    revealAllCells(map);
    showPopUp('You lost!');
  } else {
    event.target.textContent = cell.adjacentMinesNumber || '';
    if (cell.adjacentMinesNumber === 0) {
      revealAdjacentCells(row, col, map);
    }
    if (checkWin(map)) {
      showPopUp('You Won!');
    }
  }
}


function showPopUp(message) {
  const PopUp = document.querySelector('#pop-up');
  const closeBtn = document.querySelector('.close-button');
  const PopUpText = document.querySelector('#pop-up-text');

  PopUpText.textContent = message;
  PopUp.style.display = 'block';

  closeBtn.onclick = function() {
    PopUp.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == PopUp) {
      PopUp.style.display = 'none';
    }
  }
}


function revealAllCells(map) {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => { // iterate over NodeList 
    const row = parseInt(cell.getAttribute('row-num'));
    const col = parseInt(cell.getAttribute('col-num'));
    const cellData = map[row][col];
    if (cellData.isMine) {
      cell.classList.add('fa-solid', 'fa-flag', 'flag-style');
    } else {
      cell.textContent = cellData.adjacentMinesNumber || '';
    }
    cell.classList.add('revealed');
  });
}


function revealAdjacentCells(row, col, map) {
  for (let AdjacentPostionX = -1; AdjacentPostionX <= 1; AdjacentPostionX++) {
    for (let AdjacentPostionY = -1; AdjacentPostionY <= 1; AdjacentPostionY++) {
      const newRow = row + AdjacentPostionX;
      const newCol = col + AdjacentPostionY;
      if (
        isInsideMap(newRow,newCol,map) &&
        !map[newRow][newCol].isMine &&
        !map[newRow][newCol].isShowed
      ) {
        /*
          const cells = Array.from(document.querySelectorAll('.cell'));
          const cell = cells.find(c => c.getAttribute('row-num') == newRow && c.getAttribute('col-num') == newCol);
        */
        const cell = document.querySelector(
          `.cell[row-num="${newRow}"][col-num="${newCol}"]`
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
  const mapSize = 10;
  const minesNumber = 1;
  const map = createMap(mapSize);
  placeMines(map,minesNumber);
  calculateAdjacentMines(map);
  renderMap(map);
}

initGame();
