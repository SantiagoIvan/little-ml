import firebase from "firebase";
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCGXbYyPV10awqWz4sIvLElch1YkmOQASk",
    authDomain: "test-react-native-f4322.firebaseapp.com",
    projectId: "test-react-native-f4322",
    storageBucket: "test-react-native-f4322.appspot.com",
    messagingSenderId: "368808142696",
    appId: "1:368808142696:web:12efd2183ed12a2608d8dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db
