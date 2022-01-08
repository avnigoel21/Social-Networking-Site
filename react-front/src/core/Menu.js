import React from 'react';
import { isAuthenticated, signout } from "../auth/index"
import { Link, withRouter } from "react-router-dom"

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
};


const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item text-dark">
                <Link
                    className='nav-link text-dark'
                    style={isActive(history, "/")}
                    to="/">Home</Link>
            </li>

            <li className="nav-item text-dark">
                <Link
                    className='nav-link text-dark'
                    style={isActive(history, "/users")}
                    to="/users">Users</Link>
            </li>


            {!isAuthenticated() && (
                <>
                    <li className="nav-item text-dark">
                        <Link className='nav-link text-dark'
                            style={isActive(history, "/signin")}
                            to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item text-dark">
                        <Link className='nav-link'
                            style={isActive(history, "/signup")}
                            to="/signup">Sign Up</Link>
                    </li>
                </>

            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item text-dark">
                        <a className='nav-link text-dark'
                            style={
                                (isActive(history, "/signup"),
                                    { cursor: "pointer", color: "#fff" })
                            }
                            onClick={() => signout(() => history.push("/"))}
                        >
                            Sign Out</a>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className='nav-link text-dark' 
                            to={`/user/${isAuthenticated().user._id}`} 
                            style={isActive(history , `user/${isAuthenticated().user._id}`)}>
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>
                </>
            )}
        </ul>
    </div>
)

export default withRouter(Menu);