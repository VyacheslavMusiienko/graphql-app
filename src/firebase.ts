// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDsasp82Al1XgLNDxjx7qvxwizm_XeVx4A',
  authDomain: 'graphql-qpp.firebaseapp.com',
  projectId: 'graphql-qpp',
  storageBucket: 'graphql-qpp.appspot.com',
  messagingSenderId: '969843464291',
  appId: '1:969843464291:web:a9870e59c0ea5e941ac056',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// eslint-disable-next-line max-len
const registerWithEmailAndPassword = (name: string, email: string, password: string) => {
  let res;
  try {
    res = createUserWithEmailAndPassword(auth, email, password);
    // const { user } = res;
    // await addDoc(collection(db, 'users'), {
    //   uid: user.uid,
    //   name,
    //   authProvider: 'local',
    //   email,
    // });
  } catch (err) {
    console.error(err);
  }

  return res;
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  logout,
};
