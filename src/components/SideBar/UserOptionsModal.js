import React from 'react'
import './UserOptionsModal.scss';

const UserOptionsModal = ({ show, modalClosed, name, logoutHandler }) => {
    return (
        <div className="userOptionsModal">
            {/* The black backdrop: to close when user clicks */}
            {show ? <div className="backdrop" onClick={modalClosed}></div> : null}

            {/* The actual modal */}
            <div className="modal" style={{
                transform: show ? 'translateY(0)' : 'translateY(100vh)', // This is so it's out of the main browser pageand not blocking other components
                opacity: show ? 1 : 0 // Animated in and out
            }}>
                <div className="modal__header">Account</div>
                <div className="modal__acount">
                    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" className="modal__checkmark"><path d="M17.572 6.35a1.013 1.013 0 011.531 1.325l-8.212 9.488a1.013 1.013 0 01-1.532 0L5.497 12.7a1.012 1.012 0 111.531-1.325l3.097 3.578 7.447-8.603z" fill="currentColor"></path></svg>
                    <div className="modal__accountName">{name}</div>
                </div>
                <div className="modal__separator" />
                <div className="modal__option">Settings</div>
                <div className="modal__option modal__option--disabled">Help & Learning</div>
                <div className="modal__option modal__option--disabled">What's new in MWriter</div>
                <div className="modal__separator" />
                <div className="modal__option" onClick={logoutHandler}>Sign out {name}</div>
                <div className="modal__separator" />
                <div className="modal__option modal__option--disabled modal__option--version">MWriter Web v1.0.4</div>
            </div>
        </div>
    )
}

export default UserOptionsModal
