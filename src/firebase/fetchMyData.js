import { doc, getDoc } from "firebase/firestore";
import { database, usersCollectionName } from "./firebase.config";

export const fetchMyData = async (firebaseActiveUser, fieldName) => {
  if (database && usersCollectionName && firebaseActiveUser.uid) {
    try {
      const document = doc(database, usersCollectionName, firebaseActiveUser.uid);
      const documentResults = await getDoc(document);

      const dataSaved = documentResults.data();

      let data =[];
      if (Object.entries(dataSaved) && Object.entries(dataSaved).length > 0) {
        if (dataSaved[fieldName] && Object.entries(dataSaved).length > 0) {
          dataSaved[fieldName].map((el) => {

            data.push(el);
          });
          return data
        }
      }
    } catch (err) {
      console.log(err)
      throw err;
      //setLoading(false);
      //setMessage({ message: "Couldn't load data, please try later", severity: "error", open: true });
    }
  }
};

export const getFieldsFromCollection = async (documentName) => {
  try {
    const document = doc(database, usersCollectionName, documentName);
    //reference of document 'documentName'(uid from activeUser) within 'users' colection
    const documentResult = await getDoc(document);

    if (documentResult.exists()) {
      //if we found the uid within users collection

      const dataSaved = documentResult.data();

      let elements = [];
      Object.entries(dataSaved).sort().forEach((obj) => {
        if (obj[0] != "favorites" && obj[0] != "watchlist") {
      
          elements.push(obj);
        }
      });

      return elements;
    }
  } catch (err) {
    throw err;
  }
};
