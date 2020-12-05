import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react'
import './OptionsModal.scss';

const OptionsModal = ({ show, modalClosed, noteOptions, deleteModal, children, backdropDark }) => {
// This component is used both for the user options modal, and also the modal for the file
// (1) Drop down when you click user name in top left
// (2) Drop down when you click file option in top right

    return (
        <div className="optionsModal">
            {/* The black backdrop: to close when user clicks */}
            {show ? <div 
                className={`backdrop ${backdropDark ? 'backdrop--dark' : ''}`} 
                onClick={modalClosed}></div> 
            : null}

            {/* The actual modal */}
            <div className={`modal ${noteOptions ? 'modal--note' : '' } ${deleteModal ? 'modal--delete' : ''}`} style={{
                opacity: show ? 1 : 0, // Animated in and out
                zIndex: show ? 100 : -5 // When not shown, z index is negative so it goes behind everything
            }}>
                {children}
            </div>
        </div>
    )
}

export default OptionsModal
