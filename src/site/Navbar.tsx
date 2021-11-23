import { BrowserRouter, Link, Route, Routes, Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from './Auth';
import Camping from './Camping';
import React, {Component} from 'react'
import userEvent from '@testing-library/user-event';

    class Navigation extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                sessionToken: localStorage.getItem("token"),
                user: JSON.parse(localStorage.getItem('user')!)
            }
          
        }
        render() {
            return(
                
                <div className='navigationBar'>
                             <div className='navigationBar-styling'>
                                 <ul>
                                     <Navbar className='navbar'>
                                         {/* <BrowserRouter> */}
                                         
                                             {/* <li><Link to='./Camping'></Link>Campsites</li> */}
                                             Campsites
                                             {/* <li><Link></Link>Eateries</li> */}
                                             Eateries
                                             {/* <li><Link></Link>Admin</li> */}
                                             Admin
                                             
                                         {/* </BrowserRouter> */}
                                         <button>Logout</button>
                                     </Navbar>
                                 </ul>
                
                             </div>
                             <div className='navigation-route'>
                                 {/* <Routes> */}
                                 <Camping sessionToken={this.state.sessionToken} userId={this.state.user.id}/>
                                    {/* <Route exact path='/Camping'><Camping sessionToken={this.props.sessionToken}/></Route> */}
                                    {/* <Route exact path='/resources'><Resources /></Route> */}
                                    {/* <Route exact path='/'><Home /></Route> */}
                                {/* </Routes> */}
                             </div>
                         </div>
                       
            )
        }

// const Navigation = () => {
//     return (
//         <div className='navigationBar'>
//             <div className='navigationBar-styling'>
//                 <ul>
//                     <Navbar className='navbar'>
//                         <BrowserRouter>
//                         {/* <Router> */}
//                             <li><Link to='./Camping'></Link>Campsites</li>
//                             Campsites
//                             {/* <li><Link></Link>Eateries</li> */}
//                             Eateries
//                             {/* <li><Link></Link>Admin</li> */}
//                             Admin
//                             {/* </Router> */}
//                         </BrowserRouter>
//                         <button>Logout</button>
//                     </Navbar>
//                 </ul>

//             </div>
//             <div className='navigation-route'>
//                 <Routes>
//                    <Route exact path='/Camping'><Camping sessionToken={this.props.sessionToken}/></Route>
//                    {/* <Route exact path='/resources'><Resources /></Route> */}
//                    {/* <Route exact path='/'><Home /></Route> */}
//                </Routes>
//             </div>
//         </div>
//     );
};

export default Navigation