import React from 'react';
import styles from './styles.css'

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width || 5,
            height: props.height || 5,
            field: props.field || [
                0, 1, 2, 3, 4,
                1, 2, 3, 4, 5,
                6, 7, 1, 2, 3,
                0, 1, 2, 3, 4,
                7, 6, 5, 4, 11
            ]
        };
    }

    makeMove = (event) => {
        const {field} = this.state;
        const newColor = parseInt(event.target.className.split('-')[0].split('color')[1]);
        // оптимистичный рендеринг
        const leftCornerColor = this.state.field[0];
        const newField = field.slice();
        newField[0] = newColor;
        const cellsToRepaint = [];
        const queue = [0];
        while (queue.length) {
            const currentIdx = queue.shift();
            for (const idx of this.getAdjacentCells(currentIdx)) {
                if ((field[idx] === newColor || field[idx] === leftCornerColor) && !cellsToRepaint.includes(idx)) {
                    cellsToRepaint.push(idx);
                    newField[idx] = newColor;
                    queue.push(idx);
                }
            }
        }
        this.setState({field: newField});
        // отправить запрос на бэк
    };

    getAdjacentCells = (idx) => {
        const {width, height} = this.state;
        return [
            idx - 1,
            idx + 1,
            idx - width,
            idx + width
        ]
            .filter(i => i >= 0 && i < width * height);
    };

    renderField = () => {
        const {height} = this.state;
        const rows = [];
        for (let i = 0; i < height; i++) {
            rows.push(this.renderRow(i));
        }
        return <table className={styles.field}>{rows}</table>
    };

    renderRow = (rowNumber) => {
        const {width} = this.state;
        const row = [];
        for (let i = 0; i < width; i++) {
            row.push(<td onClick={this.makeMove}
                         className={styles[`color${this.state.field[width * rowNumber + i]}`]}/>)
        }
        return <tr>{row}</tr>;
    };

    render() {
        return (
            <div className={styles.root}>{this.renderField()}</div>
        );
    }
}
