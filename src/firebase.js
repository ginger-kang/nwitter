import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC9iAQtaGeZn0Ie9GqEOEkeROfgq0iI7Gk",
    authDomain: "nwitter-bea0d.firebaseapp.com",
    databaseURL: "https://nwitter-bea0d.firebaseio.com",
    projectId: "nwitter-bea0d",
    storageBucket: "nwitter-bea0d.appspot.com",
    messagingSenderId: "460242249194",
    appId: "1:460242249194:web:b30c240c0156cf8642be93"
};

export default firebase.initializeApp(firebaseConfig);