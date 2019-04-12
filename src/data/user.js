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

async function getUserByUID(uid) {
  try {
    if (!uid || typeof uid != "string") {
      throw "email not vaild";
    }
    let userCollection = await users();
    let user = await userCollection.findOne({ uid: uid });
    return user;
  } catch (e) {
    throw e;
  }
}

const createUserWithEmail = async (email, password, isAdult) => {
  try {
    const user = await firebase.createUserWithEmailAndPassword(email, password);
    if (user && user.user) {
      const userCollection = await users();
      const saveUser = {
        uid: user.user.uid,
        email: user.user.email,
        color: getRandomColor(),
        isAdult: isAdult,
        family: null
      };
      await userCollection.insertOne(saveUser);
      return await getUserByEmail(user.user.email);
    } else {
      throw new Error("Invalid user");
    }
  } catch (e) {
    throw e;
  }
};

const addFamily = async (uid, family) => {
  await userCollection.findOneAndUpdate(
    { uid: uid },
    {
      $set: {
        family: family
      }
    }
  );
  return await getUserByUID(uid);
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

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

module.exports = {
  getUserByEmail,
  createUserWithEmail,
  authenticateUserWithEmailAndPassword,
  getUserByUID,
  addFamily
};
