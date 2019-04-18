import axios from 'axios';
import ErrorHandler from '../utils/error_handler.js'
import * as ConfigManager from '../config/const.js';

export default class ProjectDispatcher {

    getProjects(obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'project')
        .then(
            response =>
            obj.setState ({
                currentID: JSON.parse(response.data.details).currentID,
                projects: JSON.parse(response.data.message),
            })
        )
        .catch(
            function(error) {
                new ErrorHandler().handelError(error);
            }
        )
    }

    getProject(procjetID, obj) {
        axios.get(ConfigManager.SERVER_ADDRESS + 'project/' + procjetID)
            .then(function (response) {

                obj.setState({
                    id: JSON.parse(response.data.message).id,
                    title: JSON.parse(response.data.message).title,
                    description: JSON.parse(response.data.message).description,
                    imageUrl: JSON.parse(response.data.message).imageUrl,
                    budget: JSON.parse(response.data.message).budget,
                    skills: JSON.parse(response.data.message).skills,
                    deadline: JSON.parse(response.data.message).deadline,
                    winner: JSON.parse(response.data.message).winner,
                    hasBided: JSON.parse(response.data.details).hasBided,
                    currentID: JSON.parse(response.data.details).currentID
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
        axios({
            method: 'post',
            url:  ConfigManager.SERVER_ADDRESS + 'bid' + '?bidAmount=' + bidMount + '&projectId=' + projectId
        })
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                new ErrorHandler().handelError(error);
            })
    }
}
