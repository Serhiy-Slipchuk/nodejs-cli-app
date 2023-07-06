const fs = require("fs").promises;
const { readFile } = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const listContacts = await fs.readFile(contactsPath);
    return JSON.parse(listContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    } else {
      const deletedContact = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      return deletedContact;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const currentContactsList = await listContacts();
    const newContact = {
      id: nanoid(21),
      name,
      email,
      phone,
    };
    const newContactsList = [...currentContactsList, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
