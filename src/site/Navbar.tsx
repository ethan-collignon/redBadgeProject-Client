import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from './Auth';
import Camping from './Camping';
import React, { Component } from 'react'


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
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'></Link>
                            </li>
                            <li>
                                <Link to='/Camping'>Campsites</Link>
                            </li>
                            <li>
                                {/* <Link to='/Eatery'>Eateries</Link> */}
                            </li>
                            <li>
                                {/* <Link to='/Admin'>Admin</Link> */}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        {/* <Route path='/' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId}/>} > 
                        </Route> */}

                        {/* <Route path='camping' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId}/>} > 
                        </Route> */}
                        {/* <Route path='/Eatery'>
                            <Eatery sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                        </Route> */}
                        {/* <Route path='/Admin'>
                            <Admin sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                        </Route> */}
                    </Routes>
                </div>
            </Router>
        );
    }
};

export default Navigation