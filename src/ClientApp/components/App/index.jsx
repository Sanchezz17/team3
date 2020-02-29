import React from 'react';
import styles from './styles.css';
import Field from '../Field';
import MainMenu from '../MainMenu';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameStarted: true,
            id: null,
            width: null,
            height: null,
            field: null,
            score: 0,
            time: 0
        };
    }

    componentDidMount() {
        fetch("https://gamehack03.azurewebsites.net/games", {
            method: "POST",
            body: JSON.stringify(
                {mode: 0}
            )
        })
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                width: data.w,
                height: data.h,
                field: data.field
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
                    ]
                });
                console.error(e);
            });
    }

    helpMove = (event) => {
        const key = event.key.toLowerCase();
        if (key === "h" || key === "р") {
            // toDo fetch to backend
        }
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
                {!this.state.gameStarted && <MainMenu/>}
                {this.state.gameStarted &&
                <Field field={this.state.field} width={this.state.width} height={this.state.height}/>}
            </div>
        );
    }
}
