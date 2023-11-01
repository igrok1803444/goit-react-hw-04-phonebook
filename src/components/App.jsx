import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const { name } = contact;
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    setContacts([...contacts, { ...contact, id: nanoid() }]);
  };
  const filterContacts = () => {
    return contacts.filter(contact => {
      if (filter.trim() === '') {
        return contacts;
      }
      return contact.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
  };
  const handlefilter = ({ target }) => {
    setFilter(target.value);
  };
  const contactDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const setLocalStorage = contacts => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('contacts'))) {
      if (JSON.parse(localStorage.getItem('contacts')).length > 0) {
        setContacts(JSON.parse(localStorage.getItem('contacts')));
      }
    }
  }, []);

  useEffect(() => {
    setLocalStorage(contacts);
  }, [contacts]);
  return (
    <div>
      <h1>Phonebook</h1>
      <AddContactForm addFunction={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} handleFunction={handlefilter} />
      <ContactsList contacts={filterContacts()} deleteHandler={contactDelete} />
    </div>
  );
};
