import React from 'react'
import './OptionsModal.scss';

const OptionsModal = ({ show, modalClosed, noteOptions, children }) => {
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
