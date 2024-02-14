import {
  getDocumentsByQuery,
  listenToDocumentsByQueryRealTime,
  createFirestoreDocument,
} from "../index.js";

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear().toString().substr(-2);
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  return `${day}/${month}/${year}`;
}

export const getRelevantRequests = async (uid, userType) => {
  try {
    const requests = await getDocumentsByQuery("requests", {
      fieldName: userType === 1 ? "volUid" : "clientUid",
      operation: "==",
      value: uid,
    });
    requests.map((request) => {
      request.date = formatDate(request.date.toDate());
      return request;
    });
    return requests;
  } catch (error) {
    console.error("Error at getRelevantRequests", error);
  }
};

const generateHandleNewRequestSnapshotFunction = (callback) => {
  return (requests) => {
    const formattedRequests = requests.map((request) => {
      request.date = formatDate(request.date.toDate());
      return request;
    });
    if (callback) {
      callback(formattedRequests);
    }
  };
};

export const listenToRelevantRequests = async (uid, userType, callback = null) => {
  try {
    const handleNewRequestSnapshot = generateHandleNewRequestSnapshotFunction(callback);
    listenToDocumentsByQueryRealTime(
      "requests",
      {
        fieldName: userType === 1 ? "volUid" : "clientUid",
        operation: "==",
        value: uid,
      },
      handleNewRequestSnapshot
    );
  } catch (error) {
    console.error("Error at listenToRelevantRequests", error);
  }
};

export const GetGuide = async (task) => {
  try {
    const guideDoc = await getDocumentsByQuery("guides", {
      fieldName: "task",
      operation: "==",
      value: task,
    });
    if (guideDoc.length === 0) {
      console.error("No guide found for task: ", task);
      return [];
    }
    return guideDoc[0].steps;
  } catch (error) {
    console.error("Error at GetGuideDoc", error);
  }
};

export const uploadRequest = async (uid, desc, extraDetails, task) => {
  try {
    const request = {
      clientUid: uid,
      status: "open",
      date: new Date(),
      description: desc,
      extraDetails: extraDetails,
      task: task,
      volUid: "",
    };
    await createFirestoreDocument("requests", request);
    return true;
  } catch (error) {
    console.error("Error at uploadRequest", error);
    return false;
  }
}
