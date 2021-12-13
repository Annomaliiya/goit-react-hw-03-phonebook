import PropTypes from 'prop-types';
import styles from './Filter.module.css';


const Filter = ({ filter, handleChange,filterInputId }) => {
  

  return (
      <>
        <label className={styles.label} htmlFor={filterInputId}>Find contacts by name
          <input className={styles.input}
            type="text"
            name="filter"
            value={filter}
            onChange={handleChange}
            id={filterInputId}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          /></label>
      </>)
}
export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange:PropTypes.func.isRequired
}