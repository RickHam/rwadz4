document.addEventListener("DOMContentLoaded", () => {
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const SIZE = 10;
const CELL = 40;
const OFFSET = 50;

const EMPTY = "empty";
const SHIP = "ship";
const SEA = "sea";

const boardState = Array.from({length: SIZE}, () => Array(SIZE).fill(EMPTY))
drawBoard();

function drawBoard(){
    ctx.clearRect(0,0,canvas.width, canvas.height) //canvase očisti se


    //Nacrtaj gridove
    for(let i = 0; i<=SIZE; i++){
        //Prvo nacrtaj horizontalne linije
        ctx.beginPath();
        ctx.moveTo(OFFSET,OFFSET + i*CELL); //lijevi kut
        ctx.lineTo(OFFSET + SIZE * CELL, OFFSET + i*CELL); //desni kut
        ctx.stroke();

        //vertikalne linije
        ctx.beginPath();
        ctx.moveTo(OFFSET+ i*CELL, OFFSET);
        ctx.lineTo(OFFSET+ i*CELL, OFFSET+ SIZE*CELL);
        ctx.stroke();
    }

    //Crtaj stanja ploče
    for(let red = 0; red < SIZE; red++)
    {
        for(let stupac = 0; stupac < SIZE; stupac++)
        {
            const stanje = boardState[stupac][red]; //Cudno je postavljen koordinatni sustav u canvasu
            const x = OFFSET + red * CELL;
            const y = OFFSET + stupac * CELL;

            if(stanje === SHIP)
            {
                ctx.fillStyle = "black";
                ctx.fillRect(x+1, y+1, CELL-2, CELL-2);
            }
            
            if(stanje === SEA)
            {
                ctx.fillStyle = "blue";
                ctx.fillRect(x+1, y+1, CELL-2, CELL-2);
            }
            if(stanje === EMPTY)
            {
                ctx.fillStyle = "yellow";
                ctx.fillRect(x+1, y+1, CELL-2, CELL-2);
            }
        }
    }
}



canvas.addEventListener("click", (event)=>{
    const pravokutnik = canvas.getBoundingClientRect();
    const x = event.clientX - pravokutnik.left;
    const y = event.clientY - pravokutnik.top;

    const cell = getCellFromClick(x, y);
    if(!cell) //kliknuo si van grida
        return;

    const {red, stupac} = cell;
    if(boardState[red][stupac] === EMPTY)
        boardState[red][stupac] = SHIP;
    else if(boardState[red][stupac] === SHIP)
        boardState[red][stupac] = SEA;
    else if(boardState[red][stupac] == SEA) 
    boardState[red][stupac] = EMPTY;

    drawBoard();
});

function getCellFromClick(x,y){
    let stupac = Math.floor((x - OFFSET)/ CELL); //floor se lijepo pobrine za lijepe brojeve.
    let red = Math.floor((y - OFFSET)/CELL);

    // provjera da klik nije izvan ploče
    if (red < 0 || red >= SIZE || stupac < 0 || stupac >= SIZE) 
        return null;
    return {red, stupac};
}
});


