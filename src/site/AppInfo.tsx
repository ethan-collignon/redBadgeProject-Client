import React, { Component } from "react";
import Navigation from './Navbar'
import Auth from './Auth'
// import Camping from './Camping'

type State = {
    sessionToken: string,
    user: any
    userId: number
}

class AppInfo extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: '',
            user: {},
            userId: 0,
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

    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: '' })
    }

    landingPage = () => (
        <Navigation userId={this.state.userId} />
    )

    viewConductor = () => {
        return this.state.sessionToken !== '' ? this.landingPage() : <Auth updateToken={this.updateToken} setUser={this.setUser} />;
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