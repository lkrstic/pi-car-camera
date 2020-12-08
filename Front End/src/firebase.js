import firebase from 'firebase'



const firebaseConfig = {
    apiKey: 'AIzaSyDEn_x7X3K_6hkkPUXDKDTMn14CVs0oh8o',
    authDomain: 'my-car-detection-798e8.firebaseapp.com',
    databaseURL: 'https://my-car-detection-798e8.firebaseio.com',
    projectId: 'my-car-detection-798e8',
    storageBucket: 'my-car-detection-798e8.appspot.com',
    messagingSenderId: "737026208819",
    appId: "1:737026208819:web:972bea5098c81255c5df46",
    measurementId: "G-Q1TV0WN6LK",
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase