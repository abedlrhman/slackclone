import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC4n_za5wugybmRLt6Ix_cbcZTIT--QN2w",
  authDomain: "clack-clone-261ae.firebaseapp.com",
  projectId: "clack-clone-261ae",
  storageBucket: "clack-clone-261ae.appspot.com",
  messagingSenderId: "498898223490",
  appId: "1:498898223490:web:23834a2604449663ad8f9b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, db, provider}