import React from 'react';
import styles from './styles.css';
import Field from '../Field';
import Button from "@skbkontur/react-ui/Button";
import Gapped from "@skbkontur/react-ui/Gapped";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinished: null,
            gameStarted: false,
            difficulty: 0,
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

    startGame = (difficulty) => {
        fetch("/api/games", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({difficulty})
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isFinished: data.isFinished,
                    gameId: data.gameId,
                    width: data.width,
                    height: data.height,
                    field: data.field,
                    gameStarted: true,
                });
            })
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
            <div className={styles.root}>
                <div className={styles.score}>
                    Ваш счет: {this.state.score}
                </div>
                <div className={styles.score}>
                    Время: {this.state.time}
                </div>
                {!this.state.gameStarted
                && <div>
                    <Gapped vertical={true} gap={10}>
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
                        <Button use='pay' size='large' onClick={() => {
                            this.startGame(0)
                        }}>Следить за игрой</Button>
                    </Gapped>
                </div>}
                {this.state.gameStarted &&
                <Field gameId={this.state.gameId} field={this.state.field} width={this.state.width}
                       height={this.state.height} isFinished={this.state.isFinished}
                        onChange={(value) => {this.setState({score: value})}}/>}
            </div>
        );
    }
}
