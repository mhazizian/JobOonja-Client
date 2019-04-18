import axios from 'axios';
import * as ConfigManager from '../config/const.js';

export default class UserDispatcher {
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

