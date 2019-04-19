"use strict";
import React from 'react'
import Footer from '../components/partails/Footer.js';
import JoboonjaNavBar from '../components/partails/JoboonjaNavBar.js';

require("bootstrap");

export default class NotFound404 extends React.Component {

    render() {

        return (
            <React.Fragment>
                <div id="main-div">
                    <JoboonjaNavBar currentUserLink={"#"}></JoboonjaNavBar>

                    <h1>404 not found!</h1>

                    <Footer></Footer>
                </div>
            </React.Fragment>
        );
    }
}
