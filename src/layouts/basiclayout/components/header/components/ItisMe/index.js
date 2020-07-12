import styles from "./index.less";
import loadLocalStory from "../../../../../../utils/loadLocalStory";


class Me extends React.Component {

    render() {
        let currentUser = loadLocalStory('user');
        let userName = 'Guest';
        if (currentUser && ("userName" in currentUser)) {
            userName = currentUser.userName
        }
        return (
            <span className={styles['dropDown']}>
                <span className={styles['userName']}>{userName}</span>
            </span>
        )
    }
}

export default Me;
