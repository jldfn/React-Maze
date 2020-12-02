import React from "react"
export class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color : props.color,
            isBlack : props.color === "black",
            value : props.value
        }
    }

    handleClick(){
        this.props.onClick()
        this.setState({ color: this.state.isBlack ? "white" : "black",
            isBlack : !this.state.isBlack})
    }

    handleMouseMovement(){
        let paintState = this.props.onEnter()
        if(paintState.isMouseDown){
            this.setState({isBlack : paintState.paintColorIsBlack,
            color : paintState.paintColorIsBlack ? "black": "white"})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.color!==this.props.color && this.props.color!==this.state.color){
            this.setState({color:this.props.color, value : this.props.value})
        }
        if(prevProps.value!==this.props.value && this.props.value!==this.state.value){
            this.setState({ value : this.props.value})
        }
    }

    render() {
        let value = this.state.value
        if( value<=0 ){
            value = ""
        }
        return (
            <button onMouseEnter={()=>this.handleMouseMovement()}
                    onMouseLeave={()=>this.handleMouseMovement()}
                    onClick={() => this.handleClick()}
                    style={{backgroundColor: this.state.color}}>
                {value}
            </button>
        );
    }
}