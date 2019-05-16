import axios from 'axios';
import ErrorHandler from '../utils/error_handler.js'
import * as ConfigManager from '../config/const.js';
import JWTHeader from '../login_tool/JWTHeader'
export default class ProjectDispatcher {

    getProjects(obj) {
        const headers = {
          'jwtHeader': localStorage.getItem('jwtToken')
        };
        axios.get(ConfigManager.SERVER_ADDRESS + 'project', {headers})
        .then(
            response =>
            obj.setState ({
                currentID: response.data.details.currentID,
                projects: response.data.message,
            })
        )
        .catch(
            function(error) {
                new ErrorHandler().handelError(error);
            }
        )
    }

    searchProjects(obj) {
        const headers = {
          'jwtHeader': localStorage.getItem('jwtToken')
        };
        axios.get(ConfigManager.SERVER_ADDRESS + 'project?name=' + obj.state.projectName, {headers})
        .then(
            response =>
            obj.setState ({
                currentID: response.data.details.currentID,
                projects: response.data.message,
            })
        )
        .catch(
            function(error) {
                new ErrorHandler().handelError(error);
            }
        )
    }

    getProject(procjetID, obj) {
        const headers = {
          'jwtHeader': localStorage.getItem('jwtToken')
        };
        axios.get(ConfigManager.SERVER_ADDRESS + 'project/' + procjetID, {headers})
            .then(function (response) {
                obj.setState({
                    id: response.data.message.id,
                    title: response.data.message.title,
                    description: response.data.message.description,
                    imageUrl: response.data.message.imageUrl,
                    budget: response.data.message.budget,
                    skills: response.data.message.skills,
                    deadline: response.data.message.deadline,
                    winner: response.data.message.winner,
                    hasBided: response.data.details.hasBided,
                    currentID: response.data.details.currentID
                });
            }
            )
            .catch(
                function (error) {
                    new ErrorHandler().handelError(error);
                }
            )
    }

    sendAmountBid(projectId, bidMount) {
        const headers = {
          'jwtHeader': localStorage.getItem('jwtToken')
        };
        axios.post(ConfigManager.SERVER_ADDRESS + 'bid' + '?bidAmount=' + bidMount + '&projectId=' + projectId, null, {headers})
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                new ErrorHandler().handelError(error);
            })
    }
}
