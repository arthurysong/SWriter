import React from 'react'
import './PublishModal.scss';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import rainySpinner from '../../assets/images/rainy2.gif';

const PublishModal = ({ show, modalClosed }) => {
  return (
    <div className="publishModal">
            {/* The black backdrop */}
            {show ? <div className="backdrop"></div> : null}

            {/* The actual modal */}
            <div className="modal" style={{
                transform: show ? 'translateY(0)' : 'translateY(100vh)', // This is so it's out of the main browser pageand not blocking other components
                opacity: show ? 1 : 0 // Animated in and out
            }}>
              {/* Have a button that the user can click to close modal */}
              {/* <div onClick={modalClosed} className="modal__closeButton">X</div> */}
              <i onClick={modalClosed} className="fas fa-times modal__closeButton"></i>
              {/* <ClimbingBoxLoader css="margin: 0 auto;" color="#26a65b" /> */}
              <img 
                // className={`saving__icon 
                //     ${savingStatus ? 'saving__icon--in' : '' }`}
                className="modal__spinner"
                src={rainySpinner} 
                alt="loading icon" />
              <div className="modal__text">
                <div>Please gives us a moment...</div>
                <div className="text__light">Your note is being published to Medium.</div>
                {/* Please wait... your note is being published to Medium! */}

                {/* The Medium account is ... */}
              </div>
            </div>
        </div>
  )
}

export default PublishModal
