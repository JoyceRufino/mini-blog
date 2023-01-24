import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCqL8hU2BqlXR6GgWMXvs9aZz7p6b7d1bw",
  authDomain: "miniblog-3f0fb.firebaseapp.com",
  projectId: "miniblog-3f0fb",
  storageBucket: "miniblog-3f0fb.appspot.com",
  messagingSenderId: "16855802501",
  appId: "1:16855802501:web:63daa0fa92f52419ecbfec"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };