import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as firebase from "firebase";
import {UnstyledComponent} from './test';

const firebase=require('firebase');
//const firebase=require('firebase/app');
require('firebase/firestore');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9c329N6GV5SBJuh0GEuSRpW5DRX3YJ7g",
    authDomain: "evernote-clone-9a1da.firebaseapp.com",
    projectId: "evernote-clone-9a1da",
    storageBucket: "evernote-clone-9a1da.appspot.com",
    messagingSenderId: "349396339997",
    appId: "1:349396339997:web:b54a0cf2090391ad85a5f4",
    measurementId: "G-V56Z7SG3ZV"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
firebase.default.initializeApp(firebaseConfig);
//firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
