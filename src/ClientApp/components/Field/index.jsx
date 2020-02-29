import React from 'react';
import styles from './styles.css'
import Button from "@skbkontur/react-ui/Button";

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // todo: заменить потом на props
            onChange: props.onChange,
            gameId: props.gameId,
            isFinished: props.isFinished,
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

    helpMove = (event) => {
        const key = event.key.toLowerCase();
        if (key === "h" || key === "р") {
            const mainColor = this.state.field[0];
            this.makeMove(this.state.field.findIndex((value, index) => value !== mainColor))
        }
    };

    onClickMove = (event) => {
        this.makeMove(event.target.cellIndex + event.target.parentNode.rowIndex * width);
    };

    makeMove = (idx) => {
        const {field, width} = this.state; // todo: заменить на props
        const newColor = field[idx];
        fetch(`api/games/${this.props.gameId}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({color: newColor})
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    field: response.field,
                    isFinished: response.isFinished
                });
                this.state.onChange(response.score);
            })
    };


    getAdjacentCells = (idx) => {
        const {width, height} = this.props;
        const result = [idx - width, idx + width];
        if (idx % width !== 0) {
            result.push(idx - 1);
        }
        if (idx % width !== (width - 1)) {
            result.push(idx + 1);
        }
        return result
            .filter(i => i >= 0 && i < width * height);
    };

    renderField = () => {
        const {height} = this.props;
        const rows = [];
        for (let i = 0; i < height; i++) {
            rows.push(this.renderRow(i));
        }
        return <table tabIndex="0" onKeyDown={this.helpMove} className={styles.field}>{rows}</table>
    };

    renderRow = (rowNumber) => {
        const {width} = this.props;
        const row = [];
        for (let i = 0; i < width; i++) {
            const colorName = this.state.field[width * rowNumber + i]; //todo: после реализации сервера заменить на this.props.field[width * rowNumber + i]
            row.push(<td onClick={this.onClickMove} className={styles[`color${colorName}`]}/>)
        }
        return <tr>{row}</tr>;
    };

    callEndGame = () => {
        return (
            <div>
                <h1>Игра окончена</h1>
                <Button use='pay' size='large'>Сохранить результат</Button>
            </div>
        );
    };

    render() {
        return (
            <div className={styles.root}>
                {this.state.isFinished && this.callEndGame()}
                {!this.state.isFinished && this.renderField()}
            </div>
        );
    }
}
