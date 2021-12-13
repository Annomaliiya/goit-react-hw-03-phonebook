
import { Component } from 'react';

import { nanoid } from 'nanoid';

import Section from './components/Section';
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter"

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filterInputId = nanoid();

  componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const newContactsList = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContactsList !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContactsList));
    }
  }

  changeContact = (name, number) => {
    if (this.state.contacts.find((contact) => {
      return contact.name.toLowerCase() === name.toLowerCase();
    })) {
      alert(name + " is already in contacts.");
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number
    };
    this.setState(prevState => {
      return (
        { contacts: [...prevState.contacts, newContact] }
      );
    })
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFiltered = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizeFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizeName = name.toLowerCase();
      const result = normalizeName.includes(normalizeFilter);
      return result;
    })

    return filteredContacts;
  }

  render() {
    const { getFiltered } = this;
    const contacts = getFiltered();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm contacts={this.state.contacts} handleChange={this.handleChange} changeContact={this.changeContact} />
        </Section>
        <Section title='Contacts'>
          <Filter filter={this.state.filter} handleChange={this.handleChange} filterInputId={this.filterInputId} />
          <ContactList contacts={contacts} deleteFunction={this.deleteContact}
          />

        </Section>
      </>
    )
  };
}

export default App;
