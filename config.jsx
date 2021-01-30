import * as firebase from 'firebase'

export const firebaseConfig = {
    apiKey: "AIzaSyA9uSGSjf7EuQ3d1DwKcC7lrq15aZ3dT18",
    authDomain: "buzzerapp-637a5.firebaseapp.com",
    databaseURL: "https://buzzerapp-637a5.firebaseio.com",
    projectId: "buzzerapp-637a5",
    storageBucket: "buzzerapp-637a5.appspot.com",
    messagingSenderId: "236156389437",
    appId: "1:236156389437:web:4489197664a99ecae98254"
  };
firebase.initializeApp(firebaseConfig);
export default firebase
   
