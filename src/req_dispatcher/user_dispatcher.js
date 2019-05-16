import axios from 'axios';
import ErrorHandler from '../utils/error_handler.js'
import * as ConfigManager from '../config/const.js';
import JWTHeader from '../login_tool/JWTHeader'
export default class UserDispatcher {
    getUser(userID, obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'user/' + userID)
        .then(
            response =>
            obj.setState({
                id: response.data.message.id,
                firstName: response.data.message.firstName,
                lastName: response.data.message.lastName,
                jobTitle: response.data.message.jobTitle,
                PictureUrl: response.data.message.PictureUrl,
                skills: response.data.message.skills,
                bio: response.data.message.bio,
                currentID: response.data.details.currentID,
                otherSkills: response.data.details.otherSkills,
                endorseSkills: response.data.details.endorseSkills
            })
        )
        .catch(
            function (error) {
                new ErrorHandler().handelError(error);
            }
        )
    }

    getUsers(obj) {
        axios.get(
            {
                method: 'get',
                url: ConfigManager.SERVER_ADDRESS + 'user',
                headers:{
                    jwtHeader: JWTHeader.jwtHeader
                }
            })
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

    searchUser(obj, name) {
        axios.get(
            {
                method: 'get',
                url: ConfigManager.SERVER_ADDRESS + 'user?name=' + name,
                headers:{
                    jwtHeader: JWTHeader.jwtHeader
                }
            })
        .then(
            response =>
            obj.setState ({
                users: response.data
            })
        )
        .catch(
            function(error) {
                new ErrorHandler().handelError(error);
            }
        )
    }

    endorseUser(userId, currentUserID, skillName) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'addEndorse' + '?userId=' + userId + '&currentUserId=' + currentUserID + '&skillName=' + skillName,
            headers:{
                jwtHeader: JWTHeader.jwtHeader
            }
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
            url: ConfigManager.SERVER_ADDRESS + 'addSkillUser' + '?user=' + userId + '&skill=' + skillName,
            headers:{
                jwtHeader: JWTHeader.jwtHeader
            }
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
            url: ConfigManager.SERVER_ADDRESS + 'deleteSkillUser' + '?user=' + currentUserID + '&skill=' + skillName,
            headers:{
                jwtHeader: JWTHeader.jwtHeader
            }
        })
        .then(function (response) {
            // alert(response);
            window.location.reload();
        })
        .catch(function (error) {
            new ErrorHandler().handelError(error);
        })
    }

    addUser(name, familyName, username, password, jobTitle, profileLink, bio) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'addUserRequestServlet' + '?name=' + name +
            '&familyName=' + familyName+ '&username=' + username + '&jobTitle=' + jobTitle +
            '&profileLink=' + profileLink + '&bio=' + bio + '&pass=' + password
        })
        .then(function (response) {
            // alert(response);
            window.location.reload();
        })
        .catch(function (error) {
            new ErrorHandler().handelError(error);
        })
    }

    loginUser(username, password) {
        axios({
            method: 'post',
            url: ConfigManager.SERVER_ADDRESS + 'loginUserRequestServlet' + '?username=' + username +
            '&password=' + password
        })
        .then(function (response) {
            JWTHeader.jwtHeader = response.data.details;
            // alert(JWTHeader.jwtHeader);
            // window.location.reload();
        })
        .catch(function (error) {
            new ErrorHandler().handelError(error);
        })
    }

}
