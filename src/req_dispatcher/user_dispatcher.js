import axios from 'axios';
import * as ConfigManager from '../config/const.js';

export default class UserDispatcher {

    gerUsers(obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'user')
        .then(
            response =>
            obj.setState ({
                users: response.data
            })
        )
        .catch(
            function(error) {
                console.log(error.stack);
            }
        )
    }

    endorseUser(userId, currentUserID,  skillName) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'addEndorse' + '?userId=' + userId + '&currentUserId=' + currentUserID + '&skillName=' + skillName
        })
        .then(function(response) {
            // alert(response);
            window.location.reload();
        })
        .catch(function(response) {
            // alert(response);
        })
    }

}
