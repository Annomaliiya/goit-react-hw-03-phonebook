import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from "react";
import styles from "./ContactForm.module.css"

class ContactForm extends Component { 
    state = {
        name: '',
        number: ''
    }

    handleChange = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    nameInputId = nanoid();
    numberInputId = nanoid();
    
    
    addContact = (event) => {
        event.preventDefault();
        if (this.props.contacts.find((contact) => {
         return contact.name.toLowerCase() === this.state.name.toLowerCase();
        })) {
             alert(this.state.name + " is already in contacts.");
             return;
        }
        const newContact = {
            id: nanoid(),
            name: this.state.name,
            number: this.state.number
        };
        this.props.changeContact(newContact);
    

    this.setState({ name: "", number: "" });
  };

    render() {
        return <>
        
            <form onSubmit={this.addContact}>
                <label className={styles.label} htmlFor={this.nameInputId}>Name
                    <input className={styles.input}
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        id={this.nameInputId}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        required
                    /></label>
                <label className={styles.label} htmlFor={this.numberInputId}>Number
                    <input className={styles.input}
                        type="tel"
                        value={this.state.number}
                        onChange={this.handleChange}
                        id={this.numberInputId}
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        required
                    /></label>
                <button className={styles.btnAdd} type="submit">Add contact</button>
            </form>
        </>;
    }
};


export default ContactForm;

ContactForm.propTypes = {
    handleChange: PropTypes.func.isRequired
}