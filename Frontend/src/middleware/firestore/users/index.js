import { updateFirestoreDocument, getDocumentsByQuery } from "../index.js";


export const addUserToFirestore = async (user, uid) => {
  try {
    const newUserDoc = await updateFirestoreDocument("users", uid, user);
    return !!newUserDoc;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetTerms = async () => {
  try {
    const termsOfUseDoc = await getDocumentsByQuery("Legal", {
      fieldName: "name",
      operation: "==",
      value: "TermsOfUse",
    });

    if (termsOfUseDoc.length === 0) {
      console.error("No terms found for task:", task);
      return null;
    }

    const { TermsOfUse } = termsOfUseDoc[0];

    if (!TermsOfUse) {
      console.error("Terms data is incomplete:", termsOfUseDoc[0]);
      return null;
    }

    return TermsOfUse;
  } catch (error) {
    console.error("Error at GetGuide:", error);
    return null;
  }
};

