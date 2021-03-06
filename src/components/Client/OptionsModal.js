import styled from 'styled-components';
import React from 'react'

const StyledOptionsModal = styled.div`
    .modal {
        position: absolute;
        z-index: 500;
        background-color: white;
        width: 308px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
        color: black;
        padding: 12px 0;
        box-sizing: border-box;
        transition: opacity 0.3s ease-out;

        &--note {
            right: 10px;
            width: 150px;
        }

        &--delete {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 4px;
            box-shadow: 1px 7px 20px 2px rgba(0,0,0,.4);
            width: 300px;
            padding: 40px 20px
        }

        .modal__header {
            padding: 6px 20px;
            text-transform: uppercase;
            font-weight: 650;
            color: #757575;
            font-size: 13px;
        }

        .modal__acount {
            padding: 6px 20px;
            display: flex;
            align-items: center;

            .modal__checkmark {
                color: #026fac;
                margin-right: 6px;
            }

            .modal__accountName {
                display: inline-block;
                font-size: 16px;
            }
        }

        .modal__option {
            padding: 6px 20px;
            font-size: 14px;

            &:hover {
                cursor: pointer;
                background-color: #f2f2f2;
            }

            &--disabled {
                color: #a6a6a6;

                &:hover {
                    cursor: auto;
                    background-color: white;
                }
            }

            &--version {
                font-weight: 500;
            }

            &--delete {
                color: rgb(235, 57, 57)
            }
        }


        .modal__separator {
            border-top: 1px solid #f2f2f2;
            display: block;
            height: 1px;
            margin: 8px 0;
            padding: 0;
        }

        .deleteModal__rusure {
            font-size: 14px;
            margin-top: 24px;
        }

        .deleteModal__buttons {
            display: flex;
            margin-top: 24px;
            justify-content: center;
        }
        .deleteModal__button {
            display: inline-block;
            border-radius: 4px;
            padding: 3px 6px;
            color: rgb(97, 97, 97);
            font-size: 12px;
            margin-right: 10px;

            &:hover {
                cursor: pointer;
            }

            &--red {
                // border: 1px solid #eb3939;
                color: white;
                background-color: #eb3939;

                &:hover {
                    background-color: #c22f2f;
                }
            }
        }
    }

    .backdrop {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 90; // z-index of modal is 5 when shown so 4 is one below modal
        left: 0;
        top: 0;

        &--dark {
            background-color: rgba(0,0,0,0.5);
        }
    }
`;

const OptionsModal = ({ show, modalClosed, noteOptions, deleteModal, children, backdropDark }) => {
// This component is used both for the user options modal, and also the modal for the file
// (1) Drop down when you click user name in top left
// (2) Drop down when you click file option in top right

    return (
        <StyledOptionsModal>
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
        </StyledOptionsModal>
    )
}

export default OptionsModal
