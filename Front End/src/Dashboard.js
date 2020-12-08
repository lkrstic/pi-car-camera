import React from 'react';
import { Component } from "react";
import { useEffect, useState } from "react";
import PropTypes from "react"
import { getUser, removeUserSession } from './Utils/Common';
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
 
function Dashboard(props) {
  const owner = useFormInput('');
  const plate = useFormInput('');
  const user = getUser();
  const [error, setError] = useState(null);
  const [error_1, setError_1] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const [cars, setCars] = useState([]);
  const [authorize, setAuthorize] = useState([])
  const [order , setOrder] = useState("Timestamp")
  const [showAuthForm, setShowAuthForm] = useState(false);
 
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    //{ http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=30b317c25db0463c99fd191178074008}
    useEffect(() => {
		props.history.push('/dashboard')
        
      GetCars();

    }, [order])
 
 
      //Welcome {user.name}!<br /><br />//
	  function GetCars() {
		  console.log("executed", order)
       
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: order })
        };
		
		//reset cars, more aesthetic loading.
		setCars([]);
		
        trackPromise(fetch('https://my-python-project.azurewebsites.net/image/show', requestOptions)
            .then(response => response.json())
            
            .then(
                (result) => {
                    var data_Array = [];
                    for (var image in result) {
                        data_Array.push(result [image])
                    }

                    
                console.log(data_Array);  
                setCars(data_Array)
                   
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                console.log(error)
                },
                //--console.log(news)
            ));

            fetch('https://my-python-project.azurewebsites.net/authorize/show', requestOptions)
            .then(response => response.json())
            
            .then(
                (result) => {
                    var new_Array = [];
                     for (var authorize in result) {
                         new_Array.push(result[authorize].plate)
                     }

                    
                 console.log(new_Array);  
                 setAuthorize(new_Array);
                   
                },

                (error) => {
                  console.log(error)
                  },

            )


  }
  
	  function handleSort(e) {
      console.log(e.target.value)
      setOrder(e.target.value)
  }
  
     function showAuthorizationForm(plateNumber) {
		 setShowAuthForm(true)
		 plate.setValue(plateNumber)
	 }
     function closeAuthForm() {
		 setShowAuthForm(false)
	 }
	 
     async function submitAuth() {		 
	 
	 
		 const requestOpt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownership: owner.value,
								   plate: plate.value})
        };
        const response = await trackPromise(fetch('https://my-python-project.azurewebsites.net/authorize/save', requestOpt));

		 setShowAuthForm(false);	
		 GetCars();
		 DisplayUserAuthorized();
	 }
	 
	 
     function DisplayUserAuthorized(authSuccessful) {
		 
		 
		 
	 }
  
  return (	  
    <div>
		<h3 class="center-nav col-lg-2" >DASHBOARD</h3> <br />
		
			<label class="label" for="sortBy">Sort By:</label>
			<select class="form-control" id = "sortBy" onChange={handleSort}>
               <option value = "Timestamp">Date (newest first)</option> 
               <option value = "Timestamp_up">Date (oldest first)</option>                           
               <option value = "Plate">Plate</option>
             </select><br /><br />			
			 
			 <div id="authorizationForm" class="authForm center text-center contact-form" style={{display: showAuthForm ? "block" : 'none'}}>									  
					Owner: <input class="form-control" name="ownerAuth" {...owner} type="text" name="owner" value={owner.value} placeholder="Owner"/>
					<br />
					Plate: <input class="form-control" name="plateAuth" {...plate} type="text" name="plate" value={plate.value} placeholder="Plate"/>
					<br />
					<input type="button" class="site-btn col-lg-6" onClick={submitAuth} value = "Make Authorized"/><br /><br />
					<input type="button" class="col-lg-6 btn btn-danger" onClick={closeAuthForm} value = "Cancel"/><br /><br />
					<span>Plate #:"{plate.value}"</span><br /><span>Owner: "{owner.value}"</span>
				</div>
			  
			  
			 
	  <div class="row">

	  
				{
				  cars.map((item, i) => {

            if(authorize.includes(item.plate) == false )
            { 
            var showAuthorize = true
            }

            else{
            var  showAuthorize = false
            }

					  
					//Create date objects to be used with output
					  var createdAtDate = new Date(item.createdAt);
					  var updatedAtDate = new Date(item.updatedAt);
					  
					  //Date Options
					  var options = {
									  hour: 'numeric',
									  minute: 'numeric',
									  hour12: true
									};
					  
					   return (
						  <React.Fragment>

				
						    <div class="col-lg-4 col-md-6 col-sm-6" key={i}>
								<a style={{color:"black"}} href='javascript:void();'>
									<div  style={ showAuthorize ? {background: '#FFBFBF'} : {background: '#B2F1B7'}} class="services-item">
										<img class="carimage" src={`data:image/png;base64,${item.image}`}/>
										<div>Plate: {item.plate}</div>
										<div>Make: {item.make}</div>
										<div>Created: {createdAtDate.getMonth()+1}/{createdAtDate.getDate()}/{createdAtDate.getFullYear()} {createdAtDate.toLocaleString('en-US', options)}</div>
										<div>Updated: {updatedAtDate.getMonth()+1}/{updatedAtDate.getDate()}/{updatedAtDate.getFullYear()} {updatedAtDate.toLocaleString('en-US', options)}</div>
									  {showAuthorize && <button type="button" class="btn btn-light" onClick={() => showAuthorizationForm(item.plate)}>Authorize</button>}
									</div>
								</a>
							</div>
							
						   </React.Fragment>
						);
						
					})
				}
				
			</div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
    console.log(e.target.value)
  }
  
  return {
    value,
	setValue,
    onChange: handleChange
  }
}
 
export default Dashboard;