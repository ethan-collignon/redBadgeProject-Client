import { BrowserRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import { Route, Link, Switch, BrowserRouter } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigationBar'>
            <div className='navigationBar-styling'>
                <ul>
                    <Navbar className='navbar'>
                        <BrowserRouter>
                            {/* <li><Link></Link>Campsites</li> */}
                            Campsites
                            {/* <li><Link></Link>Eateries</li> */}
                            Eateries
                            {/* <li><Link></Link>Admin</li> */}
                            Admin
                        </BrowserRouter>
                    </Navbar>
                </ul>
            </div>
            <div className='navigation-route'>
               {/* <Switch>
                   <Route exact path='/home'><Home /></Route>
                   <Route exact path='/resources'><Resources /></Route>
                   <Route exact path='/'><Home /></Route>
               </Switch> */}
           </div>
        </div>
    );
};

export default Navigation