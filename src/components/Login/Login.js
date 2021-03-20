import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import authOperations from '../../redux/auth/auth-operations'
import PropTypes from 'prop-types'
import styles from './Login.module.css'
import { CSSTransition } from 'react-transition-group'

function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const checkLoginData = () => {
        if (email == '' || password == '') {
            toast.error('Email or password cant be empty', {
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
        if (checkLoginData()) {
            return
        }

        onLogin({ email, password })
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
                    <h1>Login</h1>

                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className={styles.FormContainer}
                    >
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
                            <h3>LOGIN</h3>
                        </button>
                    </form>
                </div>
            </CSSTransition>
            <ToastContainer />
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    onLogin: authOperations.login,
}

export default connect(null, mapDispatchToProps)(Login)
