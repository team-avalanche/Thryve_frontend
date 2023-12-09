import React, { useState } from 'react';
import './Modal.css'

const Modal = ({ children }) => {

    return (
        <div className="modal-overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    );
};

export default Modal;
