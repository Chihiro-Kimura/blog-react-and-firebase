import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC_nY-kZoRrRhe5alHAEwaVWbAvRtCLrgQ',
  authDomain: 'blog-ca9ff.firebaseapp.com',
  projectId: 'blog-ca9ff',
  storageBucket: 'blog-ca9ff.firebasestorage.app',
  messagingSenderId: '1011815101209',
  appId: '1:1011815101209:web:34947893437e5ab6350b88',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
