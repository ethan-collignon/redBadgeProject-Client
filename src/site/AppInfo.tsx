import React, { Component } from "react";
import Navigation from './Navbar';
import Auth from './Auth';
import {Route, Navigate} from "react-router-dom"


type State = {
    sessionToken: string,
    user: any
    userId: number
    role: string
}

class AppInfo extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: '',
            user: {},
            userId: 0,
            role: ''
        }
        this.updateToken = this.updateToken.bind(this);
        this.setUser = this.setUser.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }

    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({ sessionToken: newToken })
    }

    setUser(user: any) {
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({ user: user })
    }

    updateRole = (role: string) => {
        localStorage.setItem("role", role)
        this.setState({role: role});
    };

    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: '', role: '' });
        window.location.href = '/'
    }

    landingPage = () => (
        <Navigation userId={this.state.userId} role={this.state.role}  clearToken={this.clearToken} updateToken={this.updateToken}/>
    )

    viewConductor = () => {
        return this.state.sessionToken !== '' ? this.landingPage() : <Auth updateToken={this.updateToken} setUser={this.setUser} updateRole={this.updateRole}/>;
    };

    render() {
        return (
            <div>
                <div className="page">
                    {this.viewConductor()}
                </div>
            </div>
        );
    }
}

export default AppInfo