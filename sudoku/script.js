var tempB = Array.from(document.getElementsByClassName("box"));
var fixedBoxes = Array.from(document.getElementsByClassName("box-i"));
var boxes = []; 
for(var i = 0; i < tempB.length; i += 9) {
    boxes.push(tempB.slice(i, i + 9));
}

var board = [[-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1],
             [-1,-1,-1,-1,-1,-1,-1,-1,-1]];

sudokuSolver(board);
let solvedBoard = copyBoard(board);
let solvable = true;
let count = 0;
let isUnique = true;
let selected = false;


while(count < 40 || (isUnique && solvable)){
  let r = Math.floor(Math.random() * 9);
  let c = Math.floor(Math.random() * 9);
  if(board[r][c] == -1) continue;
  board[r][c] = -1;
  let newBoard = copyBoard(board);
  solvable = sudokuSolver(newBoard);
  isUnique = areSame(solvedBoard, newBoard);
  count++;
  if(!isUnique) board[r][c] = solvedBoard[r][c];
}

for(let i = 0; i < 9; i++){
  for(let j = 0; j < 9; j++){
    if(board[i][j] != -1)
      boxes[i][j].innerText = board[i][j];
    else{
      boxes[i][j].style.backgroundColor = '#caee84';
      (function(r, c){
          boxes[i][j].onclick = function(){
            if(selected) boxes[selected[0]][selected[1]].style.backgroundColor = '#caee84';
            this.style.backgroundColor = '#f85f8f';
            selected = [r, c];
          }    
      })(i, j);
    }
  }
}

fixedBoxes.forEach(function(item){
  item.addEventListener('click', function(){
    if(selected){
      if(this.innerText == 'X'){
        board[selected[0]][selected[1]] = -1;
        boxes[selected[0]][selected[1]].innerText = '';
      }else{
        board[selected[0]][selected[1]] = Number(this.innerText);
        boxes[selected[0]][selected[1]].innerText = this.innerText;
        if(areSame(solvedBoard, board)){
          document.getElementById('msg').innerText = 'Well Done!!!!';
        }
      }
    }
  });
});

function shuffleArray(row){
  for (let i = row.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [row[i], row[j]] = [row[j], row[i]];
  }
}


function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}


function sudokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == -1) {
        let temp = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(temp);
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, temp[k-1])) {
            data[i][j] = temp[k-1];
          if (sudokuSolver(data)) {
           return true;
          } else {
           data[i][j] = -1;
          }
         }
       }
       return false;
     }
   }
 }
 return true;
}

function copyBoard(board){
  let newBoard = [];
  for (var i = 0; i < board.length; i++)
    newBoard[i] = board[i].slice();
  return newBoard;
}

function areSame(array1, array2) {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 === array2;
    }
    if (array1.length !== array2.length) {
        return false;
    }
    for (var i = 0, len = array1.length; i < len; i++) {
        if (!areSame(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}

function refreshPage(){
    window.location.href = window.location.href;
}