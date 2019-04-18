import axios from 'axios';
import ErrorHandler from '../utils/error_handler.js'
import * as ConfigManager from '../config/const.js';

export default class UserDispatcher {
    getUser(userID, obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'user/' + userID)
            .then(
                response =>
                    obj.setState({
                        id: JSON.parse(response.data.message).id,
                        firstName: JSON.parse(response.data.message).firstName,
                        lastName: JSON.parse(response.data.message).lastName,
                        jobTitle: JSON.parse(response.data.message).jobTitle,
                        PictureUrl: JSON.parse(response.data.message).PictureUrl,
                        skills: JSON.parse(response.data.message).skills,
                        bio: JSON.parse(response.data.message).bio,
                        currentID: JSON.parse(response.data.details).currentID,
                        otherSkills: JSON.parse(response.data.details).otherSkills,
                        endorseSkills: JSON.parse(response.data.details).endorseSkills
                    })
            )
            .catch(
                function (error) {
                    new ErrorHandler().handelError(error);
                }
            )
    }

    getUsers(obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'user')
            .then(
                response =>
                    obj.setState({
                        users: response.data
                    })
            ).catch(
                function (error) {
                    new ErrorHandler().handelError(error);
                }
            )
    }

    endorseUser(userId, currentUserID, skillName) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'addEndorse' + '?userId=' + userId + '&currentUserId=' + currentUserID + '&skillName=' + skillName
        })
            .then(function (response) {
                // alert(response);
                window.location.reload();
            })
            .catch(function (error) {
                new ErrorHandler().handelError(error);
            })
    }

    addSkill(userId, skillName) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'addSkillUser' + '?user=' + userId + '&skill=' + skillName
        })
            .then(function (response) {
                // alert(response);
                window.location.reload();
            })
            .catch(function (error) {
                new ErrorHandler().handelError(error);
            })
    }

    deleteSkill(currentUserID, skillName) {
        axios({
            method: 'delete',
            url: ConfigManager.SERVER_ADDRESS + 'deleteSkillUser' + '?user=' + currentUserID + '&skill=' + skillName
        })
            .then(function (response) {
                // alert(response);
                window.location.reload();
            })
            .catch(function (error) {
                new ErrorHandler().handelError(error);
            })
    }

}
