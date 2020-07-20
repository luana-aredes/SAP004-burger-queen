import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAcklJJ5num1Ro7EMKokEh2s27gI2O0iBw",
  authDomain: "burger-queen-f7f70.firebaseapp.com",
  databaseURL: "https://burger-queen-f7f70.firebaseio.com",
  projectId: "burger-queen-f7f70",
  storageBucket: "burger-queen-f7f70.appspot.com",
  messagingSenderId: "743729747535",
  appId: "1:743729747535:web:dd4ccf9050ffcdd302fc3a"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;