import { initializeApp, FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const errorCodes: Record<string, string> = {
  'auth/invalid-email': 'invalidEmail',
  'auth/user-not-found': 'notFound',
  'auth/wrong-password': 'wrongPassword',
  'auth/missing-password': 'missingPassword',
  'auth/user-disabled': 'userDisabled',
  'auth/too-many-requests': 'manyRequests',
  'auth/email-already-in-use': 'inUse',
};

const signInWithEmailAndPasswordWithErrorHandling = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user, error: null };
  } catch (error) {
    const firebaseError = error as FirebaseError;
    return { user: null, error: errorCodes[firebaseError.code] };
  }
};

const createUserWithEmailAndPasswordWithErrorHandling = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if (user !== null && auth.currentUser) {
      return await updateProfile(auth.currentUser, {
        displayName,
      })
        .then(() => {
          return { user, error: null };
        })
        .catch(() => {
          return {
            user: null,
            error: {
              name: false,
              email: false,
              password: [],
              common: `Something went wrong with updating profile`,
            },
          };
        });
    }
  } catch (error) {
    const firebaseError = error as FirebaseError;

    if (firebaseError.code === 'auth/invalid-email') {
      return {
        user: null,
        error: {
          name: false,
          email: true,
          password: [],
          common: ``,
        },
      };
    }

    return {
      user: null,
      error: {
        name: false,
        email: false,
        password: [],
        common: errorCodes[firebaseError.code],
      },
    };
  }

  return {
    user: null,
    error: {
      name: false,
      email: false,
      password: [],
      common: '',
    },
  };
};

export {
  createUserWithEmailAndPasswordWithErrorHandling,
  signInWithEmailAndPasswordWithErrorHandling,
  auth,
  app,
};
