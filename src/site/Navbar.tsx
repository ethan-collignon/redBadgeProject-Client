import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Navbar, NavItem, } from 'reactstrap';
// import Auth from './Auth';
import Camping from './Camping';
import React, { Component } from 'react';
// import AppInfo from './AppInfo'

class Navigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem('user')!)
        }
    }
    render() {
        return (
            <>
                <Navbar>
                    <Router>
                        <div>
                            <nav>
                                <ul>
                                    <NavItem> 
                                        <li>
                                            <Link to='/'></Link>
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            <Link to='/Camping'>Campsites</Link>
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            {/* <Link to='/Eatery'>Eateries</Link> */}
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            {/* <Link to='/Admin'>Admin</Link> */}
                                        </li>
                                    </NavItem>
                                    <NavItem>
                                        <li>
                                            <Button onClick={() => this.props.clearToken()}>Logout</Button>
                                            {/* Button not working */}
                                        </li>
                                    </NavItem>
                                </ul>
                            </nav>
                            <Routes>
                                <Route path='/' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='camping' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                {/* <Route path='/Eatery'>
                            <Eatery sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                        </Route> */}
                                {/* <Route path='/Admin'>
                            <Admin sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                        </Route> */}
                            </Routes>
                        </div>
                    </Router>
                </Navbar>
            </>
        );
    }
};

export default Navigation