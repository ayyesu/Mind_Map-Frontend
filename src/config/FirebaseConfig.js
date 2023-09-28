// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCENcsAmzmqxx848O0FEXBKdqgnJ8tURLg',
    authDomain: 'mindmap-8e984.firebaseapp.com',
    projectId: 'mindmap-8e984',
    storageBucket: 'mindmap-8e984.appspot.com',
    messagingSenderId: '481520162627',
    appId: '1:481520162627:web:7447b7478cfff5548601f6',
    measurementId: 'G-E14WSH0FV6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
