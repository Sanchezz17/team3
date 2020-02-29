import React from 'react';
import styles from './styles.css';
import Field from '../Field';
import Button from "@skbkontur/react-ui/Button";
import Gapped from "@skbkontur/react-ui/Gapped";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: false,
            mode: 0,
            id: null,
            width: null,
            height: null,
            field: null,
            score: 0,
            time: 0
        };
    }

    componentDidMount() {

    }

    helpMove = (event) => {
        const key = event.key.toLowerCase();
        if (key === "h" || key === "р") {
            // toDo fetch to backend
        }
    };

    startGame = (mode) => {
        fetch("https://gamehack03.azurewebsites.net/games", {
            method: "POST",
            body: JSON.stringify({mode})})
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                width: data.w,
                height: data.h,
                field: data.field,
                gameStarted: true,
            }))
            .catch(e => {
                this.setState({
                    id: -1,
                    width: 5,
                    height: 5,
                    field: [
                        0, 1, 2, 3, 4,
                        1, 2, 3, 4, 5,
                        6, 7, 1, 2, 3,
                        0, 1, 2, 3, 4,
                        7, 6, 5, 4, 3
                    ],
                    gameStarted: true,
                });
                console.error(e);
            });
    };

    render() {
        return (
            <div tabIndex="0" onKeyDown={this.helpMove} className={styles.root}>
                <div className={styles.score}>
                    Ваш счет: {this.state.score}
                </div>
                <div className={styles.score}>
                    Время: {this.state.time}
                </div>
                {!this.state.gameStarted
                && <div>
                    <Gapped vertical={10}>
                        <Button use='success' size='large' onClick={() => {
                            this.startGame(0)
                        }}>Новая игра (легкий)</Button>
                        <Button use='success' size='large' onClick={() => {
                            this.startGame(1)
                        }}>Новая игра (средний)</Button>
                        <Button use='success' size='large' onClick={() => {
                            this.startGame(2)
                        }}>Новая игра (сложный)</Button>
                        <Button use='primary' size='large' onClick={() => {
                        }}>Таблица лидеров</Button>
                    </Gapped>
                </div>}
                {this.state.gameStarted &&
                <Field field={this.state.field} width={this.state.width} height={this.state.height}/>}
            </div>
        );
    }
}
