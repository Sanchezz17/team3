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
        const colorName = event.target.className.split('-')[0].split('color')[1];
        // оптимистичный рендеринг
        // отправить запрос на бэк
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
            row.push(<td onClick={this.makeMove} className={styles[`color${this.state.field[width * rowNumber + i]}`]}/>)
        }
        return <tr>{row}</tr>;
    };

    render() {
        return (
            <div className={styles.root}>{this.renderField()}</div>
        );
    }
}
