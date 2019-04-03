const firebase = require("firebase");
const initializeFirebase = () => {
  const config = {
    apiKey: "AIzaSyDQDvaPWIgGGcUdNJeQNFT4vo5aN8zuaEQ",
    authDomain: "familycalendar-c0831.firebaseapp.com",
    databaseURL: "https://familycalendar-c0831.firebaseio.com",
    projectId: "familycalendar-c0831",
    storageBucket: "familycalendar-c0831.appspot.com",
    messagingSenderId: "5751021013"
  };
  firebase.initializeApp(config);
};

const authenticateUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (user) {
      return user;
    } else {
      throw "Invalid User";
    }
  } catch (error) {
    throw error;
  }
};

const createUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  initializeFirebase,
  createUserWithEmailAndPassword,
  authenticateUserWithEmailAndPassword
};
