import React from 'react';
import styles from './styles.css'

export default class Field extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <table className={styles.field}>
                    <tr>
                        <td className={styles.color1}/>

                        <td className={styles.color2}/>
                        <td className={styles.color3}/>
                        <td className={styles.color4}/>
                        <td className={styles.color5}/>
                    </tr>
                    <tr>
                        <td className={styles.color2}/>

                        <td className={styles.color3}/>
                        <td className={styles.color5}/>
                        <td className={styles.color4}/>
                        <td className={styles.color2}/>
                    </tr>
                    <tr>
                        <td className={styles.color1}/>

                        <td className={styles.color4}/>
                        <td className={styles.color3}/>
                        <td className={styles.color4}/>
                        <td className={styles.color5}/>
                    </tr>
                    <tr>
                        <td className={styles.color4}/>

                        <td className={styles.color3}/>
                        <td className={styles.color3}/>
                        <td className={styles.color5}/>
                        <td className={styles.color1}/>
                    </tr>
                    <tr>
                        <td className={styles.color1}/>

                        <td className={styles.color2}/>
                        <td className={styles.color4}/>
                        <td className={styles.color4}/>
                        <td className={styles.color5}/>
                    </tr>
                </table>
            </div>
        );
    }
}
