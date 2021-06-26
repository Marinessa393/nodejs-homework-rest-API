const User = require("./user");

const listContacts = async () => {
  const result = await User.find();
  return result;
};

const getContactById = async (contactId) => {
  const result = await User.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  const result = await User.findOneAndRemove(contactId);
  return result;
};

const addContact = async (body) => {
  const result = await User.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = User.findOneAndUpdate(contactId, { ...body }, { new: true });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
