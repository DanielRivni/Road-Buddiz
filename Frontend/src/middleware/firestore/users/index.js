import { updateFirestoreDocument } from "../index.js";

export const addUserToFirestore = async (user, uid) => {
  try {
    const newUserDoc = await updateFirestoreDocument("users", uid, user);
    return !!newUserDoc;
  } catch (error) {
    console.log(error);
    return false;
  }
};

