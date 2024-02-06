
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDIcyZW4NTpP-bM3CBRAJjtBVY8Aw_UBdY",
  authDomain: "prokemia-file-upload-b636f.firebaseapp.com",
  projectId: "prokemia-file-upload-b636f",
  storageBucket: "prokemia-file-upload-b636f.appspot.com",
  messagingSenderId: "278536712651",
  appId: "1:278536712651:web:e578bb429ab160e288464e",
  measurementId: "G-HRLG03JNGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)