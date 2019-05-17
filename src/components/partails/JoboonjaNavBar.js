import React from 'react'
import * as ConfigManager from '../../config/const.js';

export default class JoboonjaNavBar extends React.Component {

    logout() {
        localStorage.removeItem("jwtToken");
    }

    render() {
        return (
            <nav className="sticky-top navbar-light shadow-sm pt-1">
    			<div className="d-flex flex-row container">
    				<div className="justify-content-start">
    					<a className="" href={ConfigManager.CLIENT_ADDRESS}>
    						<img src="../assets/logo/logo v1.png" className="navbar-item" alt=""/>
    					</a>
    				</div>
    				<div className="justify-content-end d-inline-flex align-items-center ml-auto">
    					<a className="nav-link iranSans text-body" href={this.props.currentUserLink}>
    						حساب کاربری
    					</a>
    					<a className="nav-link iranSans text-body" href="#" onClick={this.logout}>
    						خروج
    					</a>
    				</div>

    			</div>
    		</nav>
        );
    }
}
