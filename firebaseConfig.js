import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCVMiiEci8yVa-g40_by6Lf5s89BqL57jQ',
    authDomain: 'amigos-383614.firebaseapp.com',
    databaseURL: 'https://amigos-383614.firebaseio.com',
    projectId: 'amigos-383614',
    storageBucket: 'amigos-383614.appspot.com',
    messagingSenderId: '811603037043',
    appId: '1:811603037043:android:0756c38f512e5820531306',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
