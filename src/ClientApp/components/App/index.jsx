import React from 'react';
import styles from './styles.css';
import Field from '../Field';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            width: null,
            height: null,
            field: null,
            score: 0
        };
    }

    componentDidMount() {
        fetch("https://gamehack03.azurewebsites.net/games", {
            method: "POST",
            body: JSON.stringify(
                { mode: 0 }
            )})
            .then(response => response.json())
            .then(data => this.setState({
                id: data.id,
                width: data.w,
                height: data.h,
                field: data.field }))
            .catch(e => {
                this.setState({
                    id: -1,
                    width: 5,
                    height: 5,
                    field:  [
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


    render() {
        return (
            <div className={ styles.root }>
                <div className={ styles.score }>
                    Ваш счет: { this.state.score }
                </div>
                <Field field={this.state.field} width={this.state.width} height={this.state.height} />
            </div>
        );
    }
}
