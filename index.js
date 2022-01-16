const contactOparations = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactOparations.listContacts();
      console.table(contacts);
      break;

    case 'get':
      const getContact = await contactOparations.getContactById(id);
      if (!getContact) {
        throw new Error(`Contact not found`);
      }
      console.log(getContact);
      break;

    case 'add':
      const newContact = await contactOparations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContact = await contactOparations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
