const mongoCollections = require("../../config/mongoCollections");
const family = mongoCollections.family;
const userData = require("./user");
const createFamilyWithNameAndCode = async (code, name, creater) => {
  try {
    const familyCollection = await family();
    const members = [creater];
    const mongofamily = { code: code, name: name, members: members };
    await familyCollection.insertOne(mongofamily);
    return await getFamilyWithCode(code);
  } catch (e) {
    throw e;
  }
};

const getFamilyWithCode = async code => {
  try {
    if (!code || typeof code != "string") {
      throw "Code not vaild";
    }
    const familyCollection = await family();
    const existingFamily = await familyCollection.findOne({ code: code });
    return existingFamily;
  } catch (e) {
    throw e;
  }
};

const joinFamily = async (code, user) => {
  try {
    if (!code || typeof code != "string") {
      throw "Code not vaild";
    }
    const existingFamily = await getFamilyWithCode(code);
    let members = existingFamily.members;
    const isMember = members.includes(member => member.uid === user.uid);
    if (isMember) {
      throw new Error("you are already a member of this family");
    } else {
      members.push(user);
      existingFamily.members = members;
      return existingFamily;
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createFamilyWithNameAndCode,
  getFamilyWithCode,
  joinFamily
};
