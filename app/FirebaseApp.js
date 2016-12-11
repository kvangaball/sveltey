const config = {
    apiKey: "AIzaSyBFx6s5DDMhDzrfsYF8GnbZ-BCfFhT0UyA",
    authDomain: "slaeck-35944.firebaseapp.com",
    databaseURL: "https://slaeck-35944.firebaseio.com",
    storageBucket: "slaeck-35944.appspot.com",
    messagingSenderId: "533570292396"
  };

const firebaseApp = firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();

const brukere = firebase.database().ref('users/');
const meldinger = firebase.database().ref('chat/');

firebase.auth().onAuthStateChanged(function(user) {
  if(!user){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      console.log("autentisert")
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      brukere.set({name: user.displayName});

      // ...
    }).catch(function(error) {

      console.log("feil", error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  } else {
    console.log("wuu", user);
    brukere.set({name: user.displayName});
  }
})

export default {
  meldinger,
  brukere
};
