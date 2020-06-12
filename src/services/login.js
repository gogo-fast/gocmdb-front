import axios from 'axios';
import {
    apiUrl
} from "../utils/constants";


function svcLogin(loginData) {
    return axios.post(
        `${apiUrl}/login`,
        loginData
    )
}

export {
    svcLogin
}
