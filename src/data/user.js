const mongoCollections = require("../../config/mongoCollections");
const firebase = require("../../config/firebase");
const users = mongoCollections.users;
async function getUserByEmail(email) {
  try {
    if (!email || typeof email != "string") {
      throw "email not vaild";
    }
    let userCollection = await users();
    let user = await userCollection.findOne({ email: email });
    return user;
  } catch (e) {
    throw e;
  }
}

const createUserWithEmail = async (email, password) => {
  try {
    const user = await firebase.createUserWithEmailAndPassword(email, password);
    if (user && user.user) {
      const userCollection = await users();
      const saveUser = { uid: user.user.uid, email: user.user.email };
      await userCollection.insertOne(saveUser);
      return await getUserByEmail(user.user.email);
    } else {
      throw new Error("Invalid user");
    }
  } catch (e) {
    throw e;
  }
};

const authenticateUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase.authenticateUserWithEmailAndPassword(
      email,
      password
    );
    if (user && user.user) {
      const userCollection = await users();
      const saveUser = { uid: user.user.uid, email: user.user.email };
      await userCollection.insertOne(saveUser);
      return await getUserByEmail(user.user.email);
    } else {
      throw new Error("Invalid user");
    }
  } catch (e) {
    throw e;
  }
};
module.exports = {
  getUserByEmail,
  createUserWithEmail,
  authenticateUserWithEmailAndPassword
};
