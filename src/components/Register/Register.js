import { useState } from 'react'
import { connect } from 'react-redux'
import authOperations from '../../redux/auth/auth-operations'
import PropTypes from 'prop-types'
import styles from './Register.module.css'
import { CSSTransition } from 'react-transition-group'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register({ onRegister }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const checkRegisterData = () => {
        if (email == '' || password == '' || name == '') {
            toast.error('Name, email or password cant be empty', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            return true
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkRegisterData()) {
            return
        }
        onRegister({ name, email, password })
        setName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div>
            <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames={{
                    appear: styles.HeaderFadeAppear,
                    appearActive: styles.HeaderFadeAppearActive,
                }}
            >
                <div className={styles.Container}>
                    <h1>Registration</h1>
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className={styles.FormContainer}
                    >
                        <lable is="webview">
                            NAME
                            <input
                                type="name"
                                name="name"
                                value={name}
                                onChange={handleName}
                                className={styles.FormItem}
                            ></input>
                        </lable>
                        <lable is="webview">
                            EMAIL
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmail}
                                className={styles.FormItem}
                            ></input>
                        </lable>
                        <lable is="webview">
                            PASSWORD
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePassword}
                                className={styles.FormItem}
                            ></input>
                        </lable>
                        <button type="submit" className={styles.FormBtn}>
                            <h3>REGISTER</h3>
                        </button>
                    </form>
                </div>
            </CSSTransition>
            <ToastContainer />
        </div>
    )
}

Register.propTypes = {
    onRegister: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    onRegister: authOperations.register,
}

export default connect(null, mapDispatchToProps)(Register)
