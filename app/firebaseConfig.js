// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore, initializeFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey : "AIzaSyAbikPYpsIPNq3NKEQd1zd30AF-mNP6-VI" , 
  authDomain : "instaclone-653b8.firebaseapp.com" , 
  projectId : "instaclone-653b8" , 
  storageBucket : "instaclone-653b8.appspot.com" , 
  messagingSenderId : "684080371421" , 
  appId : "1:684080371421:web:2f71bfd713d45a23e5ed34" , 
  measurementId : "G-K52VL9C1T4" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);
const db = initializeFirestore(app , { experimentalAutoDetectLongPolling: true ,useFetchStreams: false,});
const storage = getStorage(app);
export { app, auth , db , storage };