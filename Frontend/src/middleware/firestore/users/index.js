import { updateFirestoreDocument, readFirestoreDocument } from "../index.js";

export const addUserToFirestore = async (user, uid) => {
  try {
    const newUserDoc = await updateFirestoreDocument("users", uid, user);
    return !!newUserDoc;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserRole = async (uid) => {
  try {
    const userMetaData = await getUserMetaData(uid);
    if (userMetaData) {
      return userMetaData.userType;
    } else {
      console.error("Failed Getting User Role, userMetaData:", userMetaData);
    }
  } catch (error) {
    console.error("Failed Getting User Role:", error);
  }
};

const getUserMetaData = async (uid) => {
  try {
    let loggedInUserMetaData = JSON.parse(
      localStorage.getItem("loggedInUser") || null
    );
    if (loggedInUserMetaData) return loggedInUserMetaData;
    loggedInUserMetaData = await readFirestoreDocument("/users/", uid);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUserMetaData));
    return loggedInUserMetaData;
  } catch (error) {
    console.error("Failed at getUserMetaData", error);
  }
};
