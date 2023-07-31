import { initializeApp } from 'firebase/app';

import { getAnalytics } from "firebase/analytics";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBVL--mWCJkcg_pEX99smeNsyz6eOUI9o0",
    authDomain: "quiltro-44098.firebaseapp.com",
    projectId: "quiltro-44098",
    storageBucket: "quiltro-44098.appspot.com",
    messagingSenderId: "1001073219155",
    appId: "1:1001073219155:web:e488be8d50bd308a18d8a6",
    measurementId: "G-YB5KMHVM76"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
