import Chat from './Chat.html';

const config = {
    apiKey: "AIzaSyBFx6s5DDMhDzrfsYF8GnbZ-BCfFhT0UyA",
    authDomain: "slaeck-35944.firebaseapp.com",
    databaseURL: "https://slaeck-35944.firebaseio.com",
    storageBucket: "slaeck-35944.appspot.com",
    messagingSenderId: "533570292396"
  };
const firebaseApp = firebase.initializeApp(config);
// FirebaseUI config.

var uiConfig = {
  signInSuccessUrl: 'https://kvangaball.github.io/sveltey/index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            
            const chat = new Chat({
              target: document.querySelector( '#root' ),
              data: {
                firebase: window.firebaseApp
              }
            });

            return true;
          }
        },
  // Terms of service url.
  tosUrl: 'https://kvangaball.github.io/sveltey/index.html'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
