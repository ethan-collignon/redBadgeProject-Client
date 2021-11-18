import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

type Authentication = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: boolean,
}

class Auth extends Component<{}, Authentication> {
    constructor(props: {}) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            login: true,
        }
        this.title = this.title.bind(this)
        this.loginToggle = this.loginToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.SigninFields = this.SigninFields.bind(this)
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
            password: ''
        })
    }

    SigninFields = () => !this.state.login ?
        (
            <div>
                <Form>
                <h1>{this.title()}</h1>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input onChange={(e) => this.setState({ firstName: e.target.value })} type="text" id="firstName" value={this.state.firstName}></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input onChange={(e) => this.setState({ lastName: e.target.value })} type="text" id="lastName" value={this.state.lastName}></Input>
                </FormGroup>
                <Button type="submit" onClick={this.handleSubmit} className="btn-lg btn-dark btn-block">Submit</Button>
            <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Login/Signup</u></b></p>
            </Form>
            </div>
        ) : <Form className="login-form">
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
            <p onClick={this.loginToggle} style={{ cursor: "pointer" }}><b><u>Login/Signup</u></b></p>
        </Form>;


    handleSubmit = (e: any) => {
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
                    lasName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                },
            };
        let url = this.state.login
            ? `http://localhost:3000/user/login`
            : `http://localhost:3000/user/register`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => response.json())
            // .then((json) => this.props.updateLocalStorage(json.sessionToken))
            .catch((err) => console.log(err));
    };
    render() {
        return (
            <div>
                <div className="page">
                    <this.SigninFields/>
                </div>
            </div>
        );
    }
}
export default Auth