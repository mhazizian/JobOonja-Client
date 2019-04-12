import React from 'react'

export default class JoboonjaNavBar extends React.Component {
    render() {
        return (
            <nav className="sticky-top navbar-light shadow-sm pt-1">
    			<div className="d-flex flex-row container">
    				<div className="justify-content-start">
    					<a className="" href="http://localhost:3000">
    						<img src="../assets/logo/logo v1.png" className="navbar-item" alt=""/>
    					</a>
    				</div>
    				<div className="justify-content-end d-inline-flex align-items-center ml-auto">
    					<a className="nav-link iranSans text-body" href={this.props.currentUserLink}>
    						حساب کاربری
    					</a>
    					<a className="nav-link iranSans text-body" href="#">
    						خروج
    					</a>
    				</div>

    			</div>
    		</nav>
        );
    }
}
