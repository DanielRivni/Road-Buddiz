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
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Create
export const createFirestoreDocument = async (collectionPath, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionPath), data);
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

export const updateDocumentField = async (
  collectionPath,
  documentId,
  data
) => {
  try {
    // Check if document exists
    const documentSnapshot = await getDoc(doc(db, collectionPath, documentId));
    if (documentSnapshot.exists()) {
      // Document exists, update specific fields
      await updateDoc(doc(db, collectionPath, documentId), data);
    } else {
      // Throw error if document does not exist
      throw new Error("Trying to update document that does not exist");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Update Image
export const uploadImageUpdDoc = async (
  file,
  dirPath,
  collectionPath,
  documentId,
  name = "",
) => {
  try {
    const imagePath = await uploadImage(file, dirPath, name);
    if (imagePath) {
      const updatedData = {
        profileImg: imagePath,
        profileImgStorage: (name === "") ? dirPath + file.name : dirPath + name + "." + (file.name).split('.').pop()
      };
      const success = await updateDocumentField(collectionPath, documentId, updatedData);
      return success;
    } else {
      throw new Error("Failed to upload image or retrieve URL");
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const uploadImage = async (file, path, name) => {
  return new Promise((resolve, reject) => {
    const imgType = (file.name).split('.').pop();
    let storageRef;
    if (name === "") {
      storageRef = ref(storage, path + file.name);
    }
    else {
      storageRef = ref(storage, path + name + "." + imgType);
    }
    const uploadTask = uploadBytes(storageRef, file);

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

// Delete file
export const deleteFile = async (
  filePath
) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error(error);
    return false; // Failed to delete
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

export const listenToDocumentsByRealTime = (collectionPath, callback) => {
  try {
    const collectionRef = collection(db, collectionPath);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const docsData = [];
      querySnapshot.forEach((doc) => {
        // Include both document data and document ID
        const docWithDataAndId = {
          id: doc.id,
          data: doc.data()
        };
        docsData.push(docWithDataAndId);
      });
      callback(docsData);
    });
    // Return the unsubscribe function to allow the caller to stop listening to changes
    return unsubscribe;
  } catch (error) {
    console.error("listenToDocumentsByRealTime Failed", error);
  }
};

export const listenToDocumentsByQueryRealTimeWithId = (
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
        // Push an object containing both the data and the ID
        docsData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      callback(docsData);
    });
  } catch (error) {
    console.error("listenToDocumentsByQueryRealTime Failed", error);
  }
};


export const checkType1IdValidity = async (type1id) => {
  try {
    // Check if the provided Type1 ID exists in any document in the allowed IDs collection
    const allowedIdsDocs = await getDocs(collection(db, "AllowedType1Ids"));
    let isValidType1Id = false;

    allowedIdsDocs.forEach((doc) => {
      const allowedIds = doc.data().allowed_ids;
      console.log("Allowed IDs:", allowedIds); // Debug logging
      if (allowedIds && allowedIds.includes(type1id)) {
        isValidType1Id = true;
      }
    });

    console.log("Is Valid Type1 ID:", isValidType1Id); // Debug logging

    return isValidType1Id;
  } catch (error) {
    console.error("Error checking Type1 ID validity:", error);
    return false;
  }
};

export const checkType1IdAvailability = async (type1id) => {
  try {
    // Check if the Type1 ID is already in use by another user
    const userExists = await getDocumentsByQuery("users", {
      fieldName: "type1Id",
      operation: "==",
      value: type1id,
    });

    return userExists.length === 0;
  } catch (error) {
    console.error("Error checking Type1 ID availability:", error);
    return false;
  }
};