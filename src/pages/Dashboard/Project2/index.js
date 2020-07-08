import Dashboard from "../index";
import Websocket from 'react-websocket';
import styles from './index.less'

const Project = (props) => {

    return (
        <div className={styles.normal}>
            <Dashboard>
                <p>this is dashboard of project 2</p>
            </Dashboard>
        </div>
    );

};


export default Project
