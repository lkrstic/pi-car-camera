import React, { useState } from 'react';
import axios from 'axios';
import firebase from './firebase'
 
function AddUser(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // handle click event of Register Button
  const handleRegisterUser = () => {
    firebase.auth()
    .createUserWithEmailAndPassword(username.value, password.value)
    .then(() => props.history.push('/dashboard'))
    .catch(error => {
      setError(JSON.stringify(error.message))
      
  })
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
    <div>
	  <div class="contact-form center">
		<div class="container-fluid">
		<div class="row">
		<div class="col-lg-12 text-center">  <h3>ADD USER</h3>
		<input class="form-control"  type="text" {...username} autoComplete="new-username" placeholder="New Username"/><br /> <br />      
        <input class="form-control" type="password" {...password} autoComplete="new-password" placeholder="New Password"/>     <br />  <br />  
		<input type="button" class="site-btn col-lg-6 btn-info" onClick={handleRegisterUser} value="Register User" /><br /> <br /> 
		<a href="/" class="site-btn btn-info col-lg-6">Go Back</a>
    <div> {error && <><small style={{ color: 'red' }}>{error}</small><br /></>} </div>
    </div>
	</div>
	</div>
	</div>
	  
	  {/*<br />
	<span>Just for Testing:</span>
	  <br />
	<span>Username entered: {username.value}</span>
	  <br />
  <span>Password entered: {password.value}</span>
    */}
    </div>
	
  );
}
 
 const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default AddUser;