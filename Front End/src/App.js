import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
 
import Login from './Login';
import Dashboard from './Dashboard';
import AddUser from './AddUser';
import firebase from './firebase';
 
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true
  });

useEffect(()=>firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setAuthState({
        authenticated: true,
        initializing: false
      });
    } else {
      setAuthState({
        authenticated: false,
        initializing: false
      });
    }
  }), [setAuthState]);
 
//    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
//      setUserSession(response.data.token, response.data.user);
//      setAuthLoading(false);
//    }).catch(error => {
//      removeUserSession();
//      setAuthLoading(false);
//    });
//  }, []);
 
//  if (authLoading && getToken()) {
//    return <div className="content">Checking Authentication...</div>
//  }


   // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();


		firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
  }
  
  return (
    <div className="App">
      <BrowserRouter>
	  
	  {!authentication.authenticated && <div class="col-lg-12 text-center"><h2 class="center-nav">Car Detection Web App</h2></div>}
	  {authentication.authenticated && 
	  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="container-fluid nav-item-new mr-auto center-nav">      
      <Nav.Link><NavLink activeClassName="active" to="/dashboard"style={ {color: 'green'}} >Dashboard</NavLink></Nav.Link>
      <Nav.Link><NavLink activeClassName="active" to="/adduser"style={ {color: 'green'}} >Add User</NavLink></Nav.Link>
      <Nav.Link><NavLink activeClassName="active" to="/login" style={ {color: 'green'}} onClick={handleLogout}>Logout</NavLink></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
}
	  
	  
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={authentication.authenticated ? Dashboard : Login} />
              <PublicRoute exact path="/login" component={authentication.authenticated ? Dashboard : Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} authenticated={authentication.authenticated}/>
              <PublicRoute exact path="/adduser" component={AddUser} authenticated={authentication.authenticated}/>
			  <Route path="*" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;