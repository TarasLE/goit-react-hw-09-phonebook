import React from 'react'
import PropTypes from 'prop-types'
import authSelectors from '../../redux/auth/auth-selectors'
import { connect } from 'react-redux'
import defaultAvatar from '../../img/avatar.svg'
import authOperations from '../../redux/auth/auth-operations'
import styles from './UserMenu.module.css'

const UserMenu = ({ avatar, name, onLogout }) => {
    return (
        <div className={styles.Container}>
            <img
                src={avatar}
                alt=""
                width="42"
                height="42"
                className={styles.Avatar}
            />
            <div className={styles.ContainerText}>
                <h2 className={styles.UserName}>Welcome {name}</h2>
                <button
                    type="button"
                    onClick={onLogout}
                    className={styles.LogOutBtn}
                >
                    <h3 className={styles.LogOutTxt}>Logout</h3>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    name: authSelectors.userName(state),
    avatar: defaultAvatar,
})

const mapDispatchToProps = { onLogout: authOperations.logout }

UserMenu.propTypes = {
    onLogout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
