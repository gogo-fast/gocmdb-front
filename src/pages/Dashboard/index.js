import React, {Component} from 'react';
import DashboardPageHeader from "./components/DashboardPageHeader";
import InstanceCount from "./components/Counts";


import styles from './index.less';


class Dashboard extends Component {

    render() {
        return (
            <div>
                <DashboardPageHeader/>
                <div className={styles['dashboard-container']}>
                    <InstanceCount/>
                </div>
            </div>


        )
    }
}


export default Dashboard;



