import {
  getDocumentsByQuery,
  listenToDocumentsByQueryRealTime,
  createFirestoreDocument,
  listenToDocumentsByRealTime,
  updateDocumentField,
  readFirestoreDocument
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

const generateHandleNewRequestSnapshot = (callback) => {
  return async (requests) => {
    const formattedRequests = [];
    for (const request of requests) {
      try {
        let volData = {};
        if (request.volUid) {
          const volDoc = await readFirestoreDocument("users", request.volUid);
          if (volDoc) {
            volData = {
              firstName: volDoc.firstName,
              lastName: volDoc.lastName,
              // Add more fields as needed
            };
          }
        }
        const volName = volData.firstName + " " + volData.lastName;
        const formattedRequest = {
          ...request,
          date: formatDate(request.date.toDate()),
          volName: volName,
          // Include additional volunteer data
          volData: volData,
        };
        formattedRequests.push(formattedRequest);
      } catch (error) {
        console.error("Error getting volunteer data:", error);
      }
    }
    if (callback) {
      callback(formattedRequests);
    }
  };
};



export const listenToRelevantRequests = async (uid, userType, callback) => {
  try {
    const handleNewRequestSnapshot = generateHandleNewRequestSnapshot(callback);
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

const generateHandleAllRequestSnapshots = (callback) => {
  return (requests) => {
    const formattedRequests = requests.map(({ id, data }) => {
      data.date = formatDate(data.date.toDate());
      return { id, data };
    });
    if (callback) {
      callback(formattedRequests);
    }
  };
}

export const listenToAllRequests = async (callback) => {
  try {
    const handleNewRequestSnapshot = generateHandleAllRequestSnapshots(callback);
    listenToDocumentsByRealTime("requests", handleNewRequestSnapshot);
  } catch (error) {
    console.error("Error at listenToAllRequests", error);
  }
}

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

export const assignRequest = async (requestId, volUid) => {
  try {
    const update = {
      status: "בטיפול",
      volUid: volUid,
    };
    await updateDocumentField("requests", requestId, update);
  } catch (error) {
    console.error("Error at updateRequest", error);
  }
};

export const cancelRequestAssignment = async (requestId) => {
  try {
    const update = {
      status: "מחכה לסיוע",
      volUid: "",
    };
    await updateDocumentField("requests", requestId, update);
  } catch (error) {
    console.error("Error at resignRequest", error);
  }
};

export const uploadRequest = async (uid, desc, extraDetails, task) => {
  try {
    const request = {
      clientUid: uid,
      status: "מחכה לסיוע",
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
