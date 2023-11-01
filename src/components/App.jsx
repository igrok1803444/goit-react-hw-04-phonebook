import { nanoid } from 'nanoid';
import { Component } from 'react';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],

      filter: '',
    };
  }
  addContact = contact => {
    const { name } = contact;
    if (this.state.contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          ...contact,
          id: nanoid(),
        },
      ],
    }));
  };
  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => {
      if (filter.trim() === '') {
        return contacts;
      }
      return contact.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
  };
  handlefilter = ({ target }) => {
    this.setState({ filter: target.value });
  };
  contactDelete = contactId => {
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts.filter(contact => contact.id !== contactId),
      ],
    }));
  };

  setLocalStorage = contacts => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };
  componentDidMount() {
    this.setState({
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    });
  }
  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts)
      this.setLocalStorage(this.state.contacts);
  }
  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <AddContactForm addFunction={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} handleFunction={this.handlefilter} />
        <ContactsList
          contacts={this.filterContacts()}
          deleteHandler={this.contactDelete}
        />
      </div>
    );
  }
}
// localStorage.clear();
