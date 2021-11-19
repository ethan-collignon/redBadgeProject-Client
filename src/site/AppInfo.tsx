import React, { Component } from "react";
import Navigation from './Navbar'
import Auth from './Auth'

type State = {
    sessionToken: string,
    user: {}
}

class AppInfo extends Component<{}, State> {
    constructor(props: {}) {
        super(props)
        this.state = {
            sessionToken: '',
            user: '',
        }
        this.updateToken = this.updateToken.bind(this);
        this.setUser = this.setUser.bind(this);
        this.clearToken = this.clearToken.bind(this);
    }

    updateToken(newToken: string) {
        localStorage.setItem('token', newToken);
        this.setState({ sessionToken: newToken })
    }

    setUser(userRole: string) {
        localStorage.setItem('userRole', userRole)
        this.setState({ user: userRole })
    }

    clearToken() {
        localStorage.clear();
        this.setState({ sessionToken: '' })
    }
    render() {
        return (
            <div>
                <div className="page">
                    <Navigation />
                    <Auth updateToken={this.updateToken} setUser={this.setUser} />
                </div>
            </div>
        );
    }
}

export default AppInfo