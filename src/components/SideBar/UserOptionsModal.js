import React from 'react'
import './UserOptionsModal.scss';

const UserOptionsModal = ({ show, modalClosed, children }) => {
    return (
        <div className="userOptionsModal">
            {/* The black backdrop: to close when user clicks */}
            {show ? <div className="backdrop" onClick={modalClosed}></div> : null}

            {/* The actual modal */}
            <div className="modal" style={{
                transform: show ? 'translateY(0)' : 'translateY(100vh)', // This is so it's out of the main browser pageand not blocking other components
                opacity: show ? 1 : 0 // Animated in and out
            }}>
                {children}
            </div>
        </div>
    )
}

export default UserOptionsModal
