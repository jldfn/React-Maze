

function generateAMazeWithPrim(height, width){
    let start = {y : 0, x : 0}
    let finish = {y : height - 1, x : width - 1}
    let sq = []
    for(let i = 0; i < height; i++){
        let row = []
        for(let j=0; j< width;j++){
            row.push(1)                     //filling grid with walls
        }
        sq.push(row)
    }
    let cellList = []
    cellList.push({y:start.y+1, x : start.x})
    cellList.push({y:start.y, x : start.x+1})
    sq[start.y][start.x] = 0                            //0 is white 1 is black
    while( cellList.length > 0 ){
        let cellNumber = Math.floor(Math.random()*cellList.length)
        let currentCell={}
        Object.assign(currentCell, cellList[cellNumber])
        let unvisitedNeighbours = []
        let neighboursCount = 0
        if(currentCell.y + 1 < height){
            neighboursCount++
            if(sq[ currentCell.y + 1 ][ currentCell.x ] > 0) {
                unvisitedNeighbours.push({y: currentCell.y + 1, x: currentCell.x})
            }
        }
        if(currentCell.y - 1 >= 0){
            neighboursCount++
            if(sq[ currentCell.y - 1 ][ currentCell.x ] > 0) {
                unvisitedNeighbours.push({y: currentCell.y - 1, x: currentCell.x})
            }
        }
        if(currentCell.x + 1 < width ){
            neighboursCount++
            if(sq[ currentCell.y ][ currentCell.x + 1 ] > 0) {
                unvisitedNeighbours.push({y: currentCell.y, x: currentCell.x + 1})
            }
        }
        if(currentCell.x - 1 >= 0 ){
            neighboursCount++
            if(sq[ currentCell.y ][ currentCell.x - 1 ] > 0) {
                unvisitedNeighbours.push({y: currentCell.y, x: currentCell.x - 1})
            }
        }
        if( neighboursCount - unvisitedNeighbours.length < 2 ){
            sq[currentCell.y][currentCell.x] = 0
            cellList = cellList.concat(unvisitedNeighbours)
        }
        cellList.splice(cellNumber,1)
    }
    return sq
}

let generateMazeWithPrim = (height, width)=>generateAMazeWithPrim(height, width)
export default generateMazeWithPrim