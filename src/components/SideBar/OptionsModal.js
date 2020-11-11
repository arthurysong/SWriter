import React from 'react'
import './OptionsModal.scss';

const OptionsModal = ({ show, modalClosed, noteOptions, children }) => {
// This component is used both for the user options modal, and also the modal for the file
// (1) Drop down when you click user name in top left
// (2) Drop down when you click file option in top right

    return (
        <div className="optionsModal">
            {/* The black backdrop: to close when user clicks */}
            {show ? <div className="backdrop" onClick={modalClosed}></div> : null}

            {/* The actual modal */}
            <div className={`modal ${noteOptions ? 'modal--note' : '' }`} style={{
                transform: show ? 'translateY(0)' : 'translateY(100vh)', // This is so it's out of the main browser pageand not blocking other components
                opacity: show ? 1 : 0 // Animated in and out
            }}>
                {children}
            </div>
        </div>
    )
}

export default OptionsModal
