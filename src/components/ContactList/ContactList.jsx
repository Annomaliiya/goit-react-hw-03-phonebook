import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, deleteFunction }) => {
    const renderContacts = contacts.map(({id, name, number}) => (
        <li key={name} className={styles.contactsListItem}>{name} {number}
        <button onClick={() => deleteFunction(id)} className={styles.btnDelete} >X</button>
        </li>
        
        ))

    return ( 
        <ul className={styles.contactsList}>
            {renderContacts }</ul>)
}
export default ContactList;

const contactShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape(contactShape)).isRequired
}