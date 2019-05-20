import React from 'react'
import * as ConfigManager from '../../../config/const';

export default class UserCard extends React.Component {
    render() {
        const { id, firstName, lastName, jobTitle, PictureUrl } = this.props.user;
        var hasImage = true;
        if (PictureUrl == null) {
            hasImage = false;
        }
        return (
            <a href={ConfigManager.CLIENT_ADDRESS + "/user/" + id}>
                <div className="bg-white rounded-corners shadow d-flex flex-row align-items-center mb-1">
                    <img src={(hasImage) ? PictureUrl : '../assets/pictures/profile/noImage.png'}
                        className="home-sidebard-img m-2 rounded-corners" />
                    <div className="d-flex flex-column justify-content-center">
                        <p className="iranSans text-body mb-0">{firstName + " " + lastName}</p>
                        <p className="iranSans text-muted mb-0 mt-1">{jobTitle}</p>
                    </div>
                </div>
            </a>
        );
    }   
}
