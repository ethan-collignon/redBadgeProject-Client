import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

type Authentication = {
    sessionToken: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: boolean,
    role: string,
    id: number
}

type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: boolean,
    role: string,
    id: number
}

type Props = {
    updateToken: (newToken: string) => void
    setUser: (user: User) => void
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

    loginToggle = (e: any) => {
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

    handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(this.state.firstName);

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
            ? `http://localhost:3000/user/login`
            : `http://localhost:3000/user/register`;
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
                this.props.setUser(data.user)
            })
    };
    render() {
        return (
            <div>
                {this.state.login ?
                    (
                        <div>
                            <Form>
                                <h1>{this.title()}</h1>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input onChange={(e) => this.setState({ email: e.target.value })} type="text" id="email" value={this.state.email}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input onChange={(e) => this.setState({ password: e.target.value })} type="password" id="password" value={this.state.password}></Input>
                                </FormGroup>
                                <Button type="submit" onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Submit</Button>
                                <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>New User? Click here to create an account.</u></b></p>
                            </Form>
                        </div>
                    ) : (
                        <Form className="login-form">
                            <h1>{this.title()}</h1>
                            <FormGroup>
                                <Label>First Name</Label>
                                <Input onChange={(e) => this.setState({ firstName: e.target.value })} type="text" id="firstName" value={this.state.firstName}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input onChange={(e) => this.setState({ lastName: e.target.value })} type="text" id="lastName" value={this.state.lastName}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input onChange={(e) => this.setState({ email: e.target.value })} type="email" id="email" value={this.state.email}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input onChange={(e) => this.setState({ password: e.target.value })} type="password" id="password" value={this.state.password}></Input>
                            </FormGroup>

                            <Button type="submit" onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Submit</Button>
                            <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Already have an account? Sign in!</u></b></p>
                        </Form>
                    )}
            </div>
        )
    }
}
export default Auth