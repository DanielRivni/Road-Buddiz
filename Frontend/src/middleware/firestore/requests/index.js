import {
  getDocumentsByQuery,
  listenToDocumentsByQueryRealTime,
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
    const formatedRequests = requests.map((request) => {
      request.date = formatDate(request.date.toDate());
      return request;
    });
    callback(formatedRequests);
  };
};

export const listenToRelevantRequests = async (uid, userType, callback) => {
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
    console.error("Error at getRelevantRequests", error);
  }
};
