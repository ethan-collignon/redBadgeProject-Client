import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./auth.css";
import APIURL from '../helpers/environment'

interface Authentication {
    sessionToken: string | null,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: boolean,
    role: string,
    id: number
}

// interface User {
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string,
//     login: boolean,
//     role: string,
//     id: number,
// }

type Props = {
    updateToken: (newToken: string) => void
    // setUser: (user: User) => void
    updateRole: (role: string) => void
}

class Auth extends Component<Props, Authentication> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sessionToken: localStorage.getItem('token')!,
            id: 0,
            login: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'user'
        }
        this.title = this.title.bind(this)
        this.loginToggle = this.loginToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    title = () => {
        return !this.state.login ? "Signup" : "Login"

    }

    loginToggle = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        this.setState({
            login: !this.state.login,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'user',
            id: 0
        })
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let reqBody = this.state.login ?
            {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                },
            } : {
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                },
            };
        let url = this.state.login
            ? `${APIURL}/user/login`
            : `${APIURL}/user/register`;
        console.log(reqBody);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    login: data.user.login,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email,
                    password: data.user.password,
                    role: data.user.role,
                    id: data.user.id
                });
                this.props.updateToken(data.sessionToken);
                // this.props.setUser(data.user);
                this.props.updateRole(data.user.role)
            })
    };
    render() {
        return (
            <div style={{ paddingTop: '75px' }}>
                {this.state.login ?
                    (
                        <div className="login-form">
                            <Form onSubmit={this.handleSubmit}>
                                <h1>{this.title()}</h1>
                                <br />
                                <FormGroup>
                                    <Input placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} required type="email" id="email" value={this.state.email}></Input>
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <Input placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} required type="password" id="password" value={this.state.password}></Input>
                                </FormGroup>
                                <br />
                                <Button type="submit" className="btn-lg btn-dark btn-block">Submit</Button>
                                <br />
                                <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>New User? Click here to create an account.</u></b></p>
                            </Form>
                        </div>
                    ) : (
                        <div className="signup-form">
                            <Form onSubmit={this.handleSubmit}>
                                <h1>{this.title()}</h1>
                                <br />
                                <FormGroup>
                                    <Input placeholder='First Name' onChange={(e) => this.setState({ firstName: e.target.value })} required type="text" id="firstName" value={this.state.firstName}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder='Last Name' onChange={(e) => this.setState({ lastName: e.target.value })} required type="text" id="lastName" value={this.state.lastName}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder='Email' onChange={(e) => this.setState({ email: e.target.value })} required type="email" id="email" value={this.state.email}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder='Password' onChange={(e) => this.setState({ password: e.target.value })} required type="password" id="password" value={this.state.password}></Input>
                                </FormGroup>
                                <Button type="submit" className="btn-lg btn-dark btn-block">Submit</Button>
                                <br />
                                <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Already have an account? Sign in!</u></b></p>
                            </Form>
                        </div>
                    )}
            </div>
        )
    }
}
export default Auth