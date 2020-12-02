import React from 'react'
import './Table.css'

class Table extends React.PureComponent {

    render() {
        let rows = []
        for(let i=0; i<this.props.height; i++){
            let columns = []
            for(let j=0; j< this.props.width; j++){
                columns.push(<td>{this.props.renderSquare(i, j)}</td>)
            }
            rows.push(<tr>{columns}</tr>)
        }
        return (
            <table className={"labTable"}
                   cellSpacing={0} cellPadding={0} >
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

export default Table