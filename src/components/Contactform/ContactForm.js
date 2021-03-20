import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import phonebookOperations from '../../redux/phonebook/phonebook-operations'
import styles from './ContactForm.module.css'
import shortid from 'shortid'
import './ContactForm.css'
import Notification from '../Notification/Notification'
import PropTypes from 'prop-types'

function ContactForm({ contacts, addContact }) {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [alert, setAlert] = useState(false)

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleNumber = (event) => {
        setNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkContact()) {
            return
        } else {
            const contact = {
                id: shortid.generate(),
                name: name,
                number: number,
            }
            addContact(contact)
            clearInput()
        }
    }
    const checkContact = () => {
        if (
            contacts.find((contact) => {
                return (
                    contact.name.toLowerCase() === name.toLowerCase() &&
                    contact.number.toLowerCase() === number.toLowerCase()
                )
            }) ||
            name == '' ||
            number == ''
        ) {
            setAlert(true)
            alertState()
            return true
        }
    }

    const clearInput = () => {
        setName('')
        setNumber('')
    }

    const alertState = () => {
        setTimeout(() => {
            setAlert(false)
        }, 2000)
    }

    return (
        <div className={styles.Container}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name <br />
                    <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleName}
                        className={styles.FormInput}
                    />
                </label>
                <br />
                <label>
                    Number <br />
                    <input
                        type="text"
                        value={number}
                        name="number"
                        onChange={handleNumber}
                        className={styles.FormInput}
                    />
                </label>
                <button type="submit" className={styles.FormBtn}>
                    Add contact
                </button>
            </form>

            <CSSTransition
                in={alert}
                timeout={250}
                classNames={{
                    enter: styles.ContactFormNotificationFadeEnter,
                    enterActive: styles.ContactFormNotificationFadeEnterActive,
                    exit: styles.ContactFormNotificationFadeExit,
                    exitActive: styles.ContactFormNotificationFadeExitActive,
                }}
                unmountOnExit
            >
                <Notification
                    sameContact={name}
                    currentNumber={number}
                ></Notification>
            </CSSTransition>
        </div>
    )
}

ContactForm.propTypes = {
    contacts: PropTypes.array.isRequired,
    addContact: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    contacts: state.contacts.items,
})
const mapDispatchToProps = (dispatch) => ({
    addContact: (contact) => dispatch(phonebookOperations.addContact(contact)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
