import Firebase from 'firebase'

/* Firebase configuration */
var config = {
    apiKey: "AIzaSyD9x7Be3e1So1bhvNFMfpq5XG6MDr81OLk",
    authDomain: "lungnoduledetection.firebaseapp.com",
    databaseURL: "https://lungnoduledetection.firebaseio.com",
    projectId: "lungnoduledetection",
    storageBucket: "lungnoduledetection.appspot.com",
    messagingSenderId: "791144749857"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export { firebaseApp, db };