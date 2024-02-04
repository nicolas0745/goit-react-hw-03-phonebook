import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import css from './App.module.css';

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

  handleSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements[0].value;
    const number = e.currentTarget.elements[1].value;
    if (
      this.state.contacts.some(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(name + 'is already in contacts');
      return;
    }

    this.setState(
      state => ({
        contacts: [
          ...state.contacts,
          {
            id: nanoid(),
            name,
            number,
          },
        ],
      }),
      () => {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    );
    e.currentTarget.reset();
  };

  handleChange = e => {
    const valueImput = e.currentTarget.value.trim();
    this.setState({ filter: valueImput });
  };

  handleClick = e => {
    const list = this.state.contacts.filter(
      contact => contact.id !== e.currentTarget.id
    );
    this.setState({ contacts: list }, () => {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    });
  };

  getList = () => {
    if (this.state.filter)
      return this.state.contacts.filter(contact =>
        contact.name
          .toLocaleLowerCase()
          .includes(this.state.filter.toLocaleLowerCase())
      );
    else return this.state.contacts;
  };

  componentDidMount = () => {
    const data = localStorage.getItem('contacts');
    if (data) {
      this.setState({ contacts: JSON.parse(data) });
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  render() {
    return (
      <div className={css.div_container}>
        <h1>Phonebook</h1>
        <ContactForm onHandlesubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter onHandleChange={this.handleChange} />
        <ContactList list={this.getList()} onHandleClick={this.handleClick} />
      </div>
    );
  }
}

export { App };
