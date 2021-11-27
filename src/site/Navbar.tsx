import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Navbar, NavItem, } from 'reactstrap';
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

class Navigation extends Component<Props, any> {
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
                                    <NavItem> 
                                            <Link to='/Home'></Link> 
                                    </NavItem>
                                    <NavItem>              
                                            <Link to='/Camping'>Campsites</Link>                     
                                    </NavItem>
                                    <NavItem>                          
                                            <Link to='/Eatery'>Eateries</Link>                               
                                    </NavItem>
                                    {this.props.role === 'admin' ? 
                                    <NavItem>                           
                                            <Link to='/Admin'>Admin</Link>                           
                                    </NavItem> : null
                                     }
                                    <NavItem>                             
                                            <Button onClick={() => this.props.clearToken()}>Logout</Button>                              
                                    </NavItem>                    
                            </nav>
                            <Routes>
                                <Route path='/' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='camping' element={<Camping sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='eatery' element={<Eatery sessionToken={this.state.sessionToken} updateLocalStorage={this.props.updateToken} clearToken={this.props.clearToken} userId={this.props.userId} />} >
                                </Route>
                                <Route path='admin' element={<Admin sessionToken={this.state.sessionToken} role={this.state.role}/>} >
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