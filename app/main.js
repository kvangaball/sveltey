import Chat from './Chat.html';

var config = {
    apiKey: "AIzaSyBFx6s5DDMhDzrfsYF8GnbZ-BCfFhT0UyA",
    authDomain: "slaeck-35944.firebaseapp.com",
    databaseURL: "https://slaeck-35944.firebaseio.com",
    storageBucket: "slaeck-35944.appspot.com",
    messagingSenderId: "533570292396"
  };
const firebaseApp = firebase.initializeApp(config);

var chat = new Chat({
  target: document.querySelector( '#root' ),
  data: {
    firebase: firebaseApp
  }
});
