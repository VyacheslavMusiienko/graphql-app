/* eslint-disable no-console */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDsasp82Al1XgLNDxjx7qvxwizm_XeVx4A',
  authDomain: 'graphql-qpp.firebaseapp.com',
  projectId: 'graphql-qpp',
  storageBucket: 'graphql-qpp.appspot.com',
  messagingSenderId: '969843464291',
  appId: '1:969843464291:web:a9870e59c0ea5e941ac056',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
