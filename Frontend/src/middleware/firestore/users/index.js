import {updateFirestoreDocument} from '../index.js';

export const addUserToFirestore = async (user, uid) => {
  try {
    await updateFirestoreDocument("users", uid, user);
    console.log('User Added Successfully!', user)
  } catch (error) {
    console.log(error);
  }
};