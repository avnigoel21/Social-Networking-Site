import React, { Component } from 'react'
import {signin , authenticate} from "../auth/index"
import { Redirect } from "react-router-dom"

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    


    clickSubmit = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email,
            password
        };

        //console.log(user);
        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false })
            }
            else {
                //authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true })
                })
            }
        });
    };


    signinForm = (email , password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={this.clickSubmit} type="submit" className="btn btn-primary" >
                Submit
            </button>
        </form>
    );


    render() {
        const { email, password, error, redirectToReferer, loading } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div className='container'>
                <h2>SIGN IN</h2>
                <div className='alert alert-danger'
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? <div className='"jumbotron text-centre'>
                    <h2>Loading...</h2>
                </div> : ("")}
                
                {this.signinForm(email, password)}

            </div>
        );
    }
}

export default Signin;