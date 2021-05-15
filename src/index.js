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
var firebaseConfig = {
    apiKey: "AIzaSyAydLau2b78bAhoJEI_YDjc7WmXEITUbHw",
    authDomain: "chatnotes-f3d5c.firebaseapp.com",
    projectId: "chatnotes-f3d5c",
    storageBucket: "chatnotes-f3d5c.appspot.com",
    messagingSenderId: "1071373976676",
    appId: "1:1071373976676:web:cc493c11b80a3f3dcd8b71",
    measurementId: "G-E8F43VSWNK"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
firebase.default.analytics();


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
