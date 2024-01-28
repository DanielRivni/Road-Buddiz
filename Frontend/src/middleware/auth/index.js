import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export async function craeteNewUserWithEmailAndPassword(email,password) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        return userCredentials
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;    
        console.error(errorCode,errorMessage);
    }
}

export async function signInUserWithEmailAndPassword(email,password) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode,errorMessage);
    }
}