import React from 'react';
import styles from './styles.css'

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // todo: заменить потом на props
            width: props.width || 5,
            height: props.height || 5,
            field: props.field || [
                0, 1, 2, 3, 4,
                1, 2, 3, 4, 5,
                6, 7, 1, 2, 3,
                0, 1, 2, 3, 4,
                7, 6, 5, 4, 11
            ],
            dominantArea: [0]
        };
    }

    makeMove = (event) => {
        const {field, width} = this.state; // todo: заменить на props
        const dominantArea = this.state.dominantArea;
        const newColor = field[event.target.cellIndex + event.target.parentNode.rowIndex * width];
        // оптимистичный рендеринг todo: после реализации сервера убрать
        const newField = field.slice();
        const newDominantArea = dominantArea.slice();
        for (const idx of newDominantArea) {
            newField[idx] = newColor;
        }
        const queue = dominantArea.slice();
        while (queue.length) {
            const currentIdx = queue.shift();
            for (const idx of this.getAdjacentCells(currentIdx)) {
                if (field[idx] === newColor && !newDominantArea.includes(idx)) {
                    newDominantArea.push(idx);
                    newField[idx] = newColor;
                    queue.push(idx);
                }
            }
        }
        this.setState({field: newField, dominantArea: newDominantArea});
        // отправить запрос на бэк
    };

    getAdjacentCells = (idx) => {
        const {width, height} = this.props;
        return [
            idx - 1,
            idx + 1,
            idx - width,
            idx + width
        ]
            .filter(i => i >= 0 && i < width * height);
    };

    renderField = () => {
        const {height} = this.props;
        const rows = [];
        for (let i = 0; i < height; i++) {
            rows.push(this.renderRow(i));
        }
        return <table className={styles.field}>{rows}</table>
    };

    renderRow = (rowNumber) => {
        const {width} = this.props;
        const row = [];
        for (let i = 0; i < width; i++) {
            const colorName = this.state.field[width * rowNumber + i]; //todo: после реализации сервера заменить на this.props.field[width * rowNumber + i]
            row.push(<td onClick={this.makeMove} className={styles[`color${colorName}`]}/>)
        }
        return <tr>{row}</tr>;
    };

    render() {
        return (
            <div className={styles.root}>{this.renderField()}</div>
        );
    }
}
