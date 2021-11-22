import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from './Auth';
// import CampingReview from './CampingReviews';


const Navigation = () => {
    return (
        <div className='navigationBar'>
            <div className='navigationBar-styling'>
                <ul>
                    <Navbar className='navbar'>
                        <BrowserRouter>
                            {/* <li><Link to='./CampingReview'></Link>Campsites</li> */}
                            Campsites
                            {/* <li><Link></Link>Eateries</li> */}
                            Eateries
                            {/* <li><Link></Link>Admin</li> */}
                            Admin
                        </BrowserRouter>
                        <button>Logout</button>
                    </Navbar>
                </ul>

            </div>
            <div className='navigation-route'>
                <Routes>
                   {/* <Route exact path='/CampingReviews'><CampingReview/></Route> */}
                   {/* <Route exact path='/resources'><Resources /></Route> */}
                   {/* <Route exact path='/'><Home /></Route> */}
               </Routes>
            </div>
        </div>
    );
};

export default Navigation