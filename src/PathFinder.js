import React from 'react'
import {Square} from "./Square";
import Table from "./Table";
import Switch from '@material-ui/core/Switch';
import TextField from "@material-ui/core/TextField";
import './PathFinder.css'
import findPath from "./findPath";
import {Button} from "@material-ui/core";
import generateMazeWithPrim from "./generateMazeWithPrim";


class PathFinder extends React.Component{

    constructor(props) {
        super(props);
        let steps
        let sq
        // for(let i=0; i<props.height; i++){
        //     let row = []
        //     for(let j=0; j< props.width;j++){
        //         row.push(0)
        //     }
        //     sq.push(row)
        // }
        sq = generateMazeWithPrim(props.height, props.width)
        steps = sq.map(function(arr) {
            return arr.slice().fill(0);
        });
        this.state = {
            path:[],
            stepSquare : steps,
            width : props.width,
            height : props.height,
            squares : sq,
            paintColorIsBlack : true,
            isMouseDown : false
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.width !== nextState.width) return true
        if(this.state.height !== nextState.height) return true
        if(this.state.paintColorIsBlack!==nextState.paintColorIsBlack) return true
        for(let i = 0; i < this.state.height; i++){
            for(let j = 0; j < this.state.width; j++){
                if(this.state.stepSquare[i][j]!==nextState.stepSquare[i][j]) return true
            }
        }
        return false
    }

    handleMouseDown(){
        this.setState({isMouseDown : true})
    }

    handleMouseUp(){
        this.setState({isMouseDown : false})
    }

    handleSquareClick(y, x){
        const newState = this.state.squares.slice();
        newState[y][x] = (newState[y][x] > 0) ? 0 : 1;
        const newSteps = this.state.stepSquare.slice();
        newSteps[y][x] = 0;
        this.setState({squares : newState, stepSquare:newSteps});
    }

    handleMovementOverSquare(y, x){
        if(this.state.isMouseDown){
            const newState = this.state.squares.slice();
            const newSteps = this.state.stepSquare.slice();
            newState[y][x] = this.state.paintColorIsBlack ? 1 : 0;
            newSteps[y][x] = 0;
            this.setState({squares : newState, stepSquare:newSteps});
        }
        return {isMouseDown : this.state.isMouseDown, paintColorIsBlack : this.state.paintColorIsBlack }
    }

    renderSquare(y, x, step){
        let color
        if(this.state.squares[y][x]>0){
            color = "black"
        } else {
            color = "white"
        }
        if(step>0){
            color = "green"
        }
        return(
            <Square value = {step}
                    color = {color}
                    onEnter = {()=>this.handleMovementOverSquare(y, x)}
                    onClick = {()=>{this.handleSquareClick(y, x)}}/>
        )
    }

    changePaintColor(){
        this.setState({paintColorIsBlack : !this.state.paintColorIsBlack})
    }

    changeHeight(event){
        this.setState({height : event.target.value})
    }

    changeWidth(event){
        this.setState({width : event.target.value})
    }

    createPath(){

        let pathData=findPath(this.state.squares, this.state.height, this.state.width)
        let st = this.state.stepSquare.map(function(arr) {
            return arr.slice().fill(0);
        });
        let counter=0;
        if(pathData.path===0){
            alert("no path")
            return
        }
        for (const square of pathData.path){
            st[square.y][square.x]=pathData.length-counter
            counter++
        }
        this.setState({stepSquare:st})
    }

    render() {
        return(
            <div className={"pathFinder"} onMouseDown={()=>this.handleMouseDown()}
                 onMouseUp={()=>this.handleMouseUp()}>
                <TextField id="standard-basic" label="Height"
                           value={this.state.height}
                           onChange={(event)=>this.changeHeight(event)}
                />
                <TextField id="standard-basic"
                           label="Width"
                           value={this.state.width}
                           onChange={(event)=>this.changeWidth(event)}/>
                White <Switch
                    checked={this.state.paintColorIsBlack}
                    onChange={()=>this.changePaintColor()}
                    color={"primary"}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> Black
                <Button onClick={()=>this.createPath()}>Find</Button>
                <Table height={this.state.height} width={this.state.width}
                       renderSquare={(y, x)=>this.renderSquare(y,x,this.state.stepSquare[y][x])}/>

            </div>
        )
    }

}

export default PathFinder