import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Navbar, NavItem, Nav } from 'reactstrap';
import Camping from './Camping';
import React, { Component } from 'react';
import Eatery from './Eatery';
import Admin from './Admin';

type Props = {
    role: string
    userId: number
    clearToken: () => void
    updateToken: (newToken: string) => void
}

type State = {
 sessionToken: string | null
 redirect: boolean | any
 role: string
}

class Navigation extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            sessionToken: localStorage.getItem("token"),
            role: '',
            // user: JSON.parse(localStorage.getItem('user')!),
            redirect: false
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (
            <>
                <Navbar >
                    <Router>
                        <div>
                            <Nav className= 'navbar navbar-expand' style={{backgroundColor: "#472E01", height: "45px", width: "1400px", justifyItems: "center", borderRadius:'4px'}} >
                                <NavItem >
                                    <Link to='/Home'></Link>
                                </NavItem>
                                <NavItem>
                                    <Link style={{paddingRight: '35px', paddingTop: '0px', color: '#BDBCBC', fontFamily: "'Amatic SC', cursive;'"}} to='/Camping'>Campsites</Link>
                                </NavItem>
                                <NavItem>
                                    <Link style={{paddingRight: '20px', color: '#BDBCBC'}} to='/Eatery'>Eateries</Link>
                                </NavItem>
                                <NavItem>
                                    <a style={{paddingRight: '8px', color: '#BDBCBC'}} rel="noreferrer" target="_blank" href="https://www.mountainproject.com">Mountain Project</a> 
                                </NavItem>
                                {this.props.role === 'admin' ?
                                    <NavItem >
                                        <Link style={{paddingRight: '25px', color: '#BDBCBC', paddingLeft: '25px'}} to='/Admin'>Admin</Link>
                                    </NavItem> : null
                                }
                                <NavItem className="form-inline my-2 my-lg-0" style={{paddingLeft: '935px'}}>
                                    <Button style={{fontSize: '10px'}} onClick={() => this.props.clearToken()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                                        <path d="M7.5 1v7h1V1h-1z" />
                                        <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                    </svg></Button>
                                </NavItem>
                            </Nav>
                            <Routes>
                                <Route path='/' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='camping' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='eatery' element={<Eatery sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='MP' element={<Navigate to="https://www.mountainproject.com/" />}>
                                </Route>
                                <Route path='admin' element={<Admin sessionToken={this.state.sessionToken} role={this.state.role} />} >
                                </Route>
                            </Routes>
                        </div>
                    </Router>
                </Navbar>
            </>
        );
    }
};

export default Navigation