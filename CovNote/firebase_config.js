import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAojFYjrFz3FcuYVfubL_eSSZDMeLD1_nE",
    authDomain: "restaurant-app-lab7.firebaseapp.com",
    databaseURL: "https://restaurant-app-lab7.firebaseio.com",
    projectId: "restaurant-app-lab7",
    storageBucket: "restaurant-app-lab7.appspot.com",
    messagingSenderId: "671432942618",
    appId: "1:671432942618:web:af424357f63ac629a09da3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();