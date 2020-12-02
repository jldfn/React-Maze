

function findAPath(squares, y, x){
    let finished=false
    let squaresToCheck = [{y:0, x:0}]
    let steps = squares.map(function(arr) {
        return arr.slice().fill(0);
    });
    let path = [{y : y-1, x : x-1}]
    steps[0][0]=1

    while(!finished){
        for (const square of squaresToCheck){
            if(square.y+1 < y && steps[square.y+1][square.x] === 0 ){
                if(squares[square.y+1][square.x]>0){
                    steps[square.y+1][square.x]=-1
                }else{
                    squaresToCheck.push({y : square.y+1, x: square.x})
                    steps[square.y+1][square.x]=steps[square.y][square.x]+1
                }
            }
            if(square.y-1 >=0 && steps[square.y-1][square.x] === 0 ){
                if(squares[square.y-1][square.x]>0){
                    steps[square.y-1][square.x]=-1
                }else{
                    squaresToCheck.push({y : square.y-1, x: square.x})
                    steps[square.y-1][square.x]=steps[square.y][square.x]+1
                }
            }
            if(square.x+1 <x && steps[square.y][square.x+1] === 0 ){
                if(squares[square.y][square.x+1]>0){
                    steps[square.y][square.x+1]=-1
                }else{
                    squaresToCheck.push({y : square.y, x: square.x+1})
                    steps[square.y][square.x+1]=steps[square.y][square.x]+1
                }
            }
            if(square.x-1 >=0 && steps[square.y][square.x-1] === 0 ){
                if(squares[square.y][square.x-1]>0){
                    steps[square.y][square.x-1]=-1
                }else{
                    squaresToCheck.push({y : square.y, x: square.x-1})
                    steps[square.y][square.x-1]=steps[square.y][square.x]+1
                }
            }

            if(square.x===x-1 && square.y===y-1) {finished=true}

        }
        if(!finished){
            return {path:0}
        }
    }
    finished=false
    let currX = x-1
    let currY = y-1
    while(!finished){
        if(currY-1>=0 && steps[currY-1][currX]>0  && steps[currY-1][currX]<steps[currY][currX]) {
            path.push({y: currY - 1, x: currX})
            currY=currY-1
            continue
        }
        if(currX-1>=0 && steps[currY][currX-1]>0 && steps[currY][currX-1]<steps[currY][currX]) {
            path.push({y: currY, x: currX-1})
            currX=currX-1
            continue
        }
        if(currY+1<y && steps[currY+1][currX]>0  && steps[currY+1][currX]<steps[currY][currX]) {
            path.push({y: currY + 1, x: currX})
            currY=currY+1
            continue
        }
        if(currX+1<x && steps[currY][currX+1]>0  && steps[currY][currX+1]<steps[currY][currX]) {
            path.push({y: currY, x: currX+1})
            currX=currX+1
            continue
        }
        if(currX===0 && currY===0) finished=true
    }
    return {path:path, length: steps[y-1][x-1], steps:steps}
}
let findPath=(squares, y, x)=>findAPath(squares, y, x)
export default findPath