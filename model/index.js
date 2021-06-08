const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const getData = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};
const listContacts = async () => {
  return await getData();
};

const getContactById = async (contactId) => {
  const data = await getData();
  const result = data.find((el) => String(el.id) === String(contactId));
  return result;
};

const removeContact = async (contactId) => {
  const data = await getData();
  const idx = data.findIndex((el) => String(el.id) === String(contactId));
  if (idx !== -1) {
    const result = data.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(data));
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
  };
  const data = await getData();
  data.push(record);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return record;
};

const updateContact = async (contactId, body) => {
  const data = await getData();
  const result = data.find((el) => String(el.id) === String(contactId));
  if (result) {
    Object.assign(result, body);
    fs.writeFile(contactsPath, JSON.stringify(data));
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
