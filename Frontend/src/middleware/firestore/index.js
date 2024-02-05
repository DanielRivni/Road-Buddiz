import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Create
export const createFirestoreDocument = async (collectionPath, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionPath), data);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Read
export const readFirestoreDocument = async (collectionPath, documentId) => {
  try {
    const docRef = doc(db, collectionPath, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
};

// Read - RealTime
export const listenToFirestoreDocument = async (
  collectionPath,
  documentId,
  callback
) => {
  try {
    const subscription = onSnapshot(
      doc(db, collectionPath, documentId),
      callback
    );
    return subscription;
  } catch (error) {
    console.error(error);
  }
};

// Update
export const updateFirestoreDocument = async (
  collectionPath,
  documentId,
  data
) => {
  try {
    await setDoc(doc(db, collectionPath, documentId), data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Delete
export const deleteFirestoreDocument = async (collectionPath, documentId) => {
  try {
    await deleteDoc(doc(db, collectionPath, documentId));
  } catch (error) {
    console.error(error);
  }
};

// Query
export const getDocumentsByQuery = async (collectionPath, queryObj) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(
      collectionRef,
      where(queryObj.fieldName, queryObj.operation, queryObj.value)
    );
    const querySnapshot = await getDocs(q);
    const docsData = [];
    querySnapshot.forEach((doc) => {
      docsData.push(doc.data());
    });
    return docsData;
  } catch (error) {
    console.error("getDocumentsByQuery Failed", error);
  }
};

// Query - Real-Time
export const listenToDocumentsByQueryRealTime = (
  collectionPath,
  queryObj,
  callback
) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const q = query(
      collectionRef,
      where(queryObj.fieldName, queryObj.operation, queryObj.value)
    );
    onSnapshot(q, (querySnapshot) => {
      const docsData = [];
      querySnapshot.forEach((doc) => {
        docsData.push(doc.data());
      });
      callback(docsData);
    });
  } catch (error) {
    console.error("listenToDocumentsByQueryRealTime Failed", error);
  }
};
