import React from 'react';
import { Link } from 'react-router-dom';

// Renders "Signup" "Signin" in case no user is logged else
// Renders a welcome message to the user and "Signout"
const Header = (props) => {

    const { context } = props;
    const authUser = context.authenticatedUser;
    
    return (
        <div className="header">
            <div className="bounds">
                <Link className="header--logo" to="/">Courses</Link>
                <nav>
                    {authUser ? (
                    <React.Fragment>
                        <span>Welcome, {authUser.firstName}!</span>
                        <Link to="/signout" onClick={() => {if(window.confirm(`Goodby, ${authUser.firstName} !`)){context.actions.signout()};}}>Sign Out</Link>
                    </React.Fragment>
                    ) : (
                    <React.Fragment>
                        <Link className="signup" to="/signup">Sign Up</Link>
                        <Link className="signin" to="/signin">Sign In</Link>
                    </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Header;