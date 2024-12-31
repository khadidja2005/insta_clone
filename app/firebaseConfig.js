// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore, initializeFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey : "" , 
  authDomain : "" , 
  projectId : "" , 
  storageBucket : "" , 
  messagingSenderId : "" , 
  appId : "" , 
  measurementId : "" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);
const db = initializeFirestore(app , { experimentalAutoDetectLongPolling: true ,useFetchStreams: false,});
const storage = getStorage(app);
export { app, auth , db , storage };
