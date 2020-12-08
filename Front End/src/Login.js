import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import firebase from './firebase';
import { useEffect } from "react";
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true
  });
  
  // handle button click of login form
  const handleLogin = () => {
    
    firebase.auth()
            .signInWithEmailAndPassword(username.value, password.value)
            .then(response => {setAuthState(true); this.props.history.push('/dashboard');
			})
            .catch(error => {
               // console.log(error.message)
               setError(JSON.stringify(error.message))
                
                //console.log(typeof myerror);
                
                
            });
			
			
		
	
//	setError(null);
//    setLoading(true);
//    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
//      setLoading(false);
//      setUserSession(response.data.token, response.data.user);
//      props.history.push('/dashboard');
//    }).catch(error => {
//      setLoading(false);
//      if (error.response.status === 401) setError(error.response.data.message);
//      else setError("Something went wrong. Please try again later.");
//    });
  }
 
  return (
  
		<div class="contact-form center">
		<div class="container-fluid">
		<div class="row">
		<div class="col-lg-12 text-center">                       
		<h3>Login</h3>
		<input class="form-control" type="text" {...username} autoComplete="new-password"  placeholder="Username"/><br /> <br />      
        <input class="form-control" type="password" {...password} autoComplete="new-password" placeholder="Password"/><br />     	
		{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />	  
		<input type="button" class="site-btn col-lg-6 btn-info" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br /><br />
		<a href="/adduser" class="site-btn btn-info col-lg-6">Register New User</a>
    </div>
	</div>
	</div>
	</div>
	
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
    //console.log(e.target.value)
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;