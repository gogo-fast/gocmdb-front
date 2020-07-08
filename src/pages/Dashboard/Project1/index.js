import Dashboard from "../index";
import Cpu from "./components/CPU";
import styles from './index.less'


const Project = (props) => (
    <div className={styles.normal}>
        <Dashboard>
            <Cpu />
        </Dashboard>
    </div>

);


export default Project


