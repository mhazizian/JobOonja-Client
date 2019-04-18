import axios from 'axios';
import * as ConfigManager from '../config/const.js';

export default class ProjectDispatcher {
    getdata(args) {
        axios.get('http://172.30.49.41:8084/Proj_IE/project')
            .then(function (response) {
                // console.log("salam");
                // console.log(response);

                return response;
            }
                // .then(
                // response =>
                // args.setState ({
                //     currentID: JSON.parse(response.data.details).currentID,
                //     projects: JSON.parse(response.data.message),
                // })
            )
            .catch(
                function (error) {
                    console.log(error.stack);
                }
            )
        // axios.get('http://localhost:8080/Proj_IE/user')
        // .then(
        //     response =>
        //     this.setState ({
        //         users: response.data
        //     })
        // )
        // .catch(
        //     function(error) {
        //         console.log(error.stack);
        //     }
        // )
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
                    console.log(error.stack);
                }
            )
    }

    sendAmountBid(projectId, bidMount) {
        axios({
            method: 'post',
            url:  ConfigManager.SERVER_ADDRESS + 'bid' + '?bidAmount=' + bidMount + '&projectId=' + projectId
        })
            .then(function (response) {
                // alert(response);
                window.location.reload();
            })
            .catch(function (response) {
                // alert(response);
            })
    }
}
