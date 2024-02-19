import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const auth = getAuth();

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

export async function craeteNewUserWithEmailAndPassword(email, password) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
}

export async function signInUserWithEmailAndPassword(email, password) {
  try {
    // Set local persistence
    await setPersistence(auth, browserLocalPersistence);

    // Sign in the user with email and password
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Return the user credentials

    // Return the user credentials
    return userCredentials;
  } catch (error) {
    // Handle errors
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
}
