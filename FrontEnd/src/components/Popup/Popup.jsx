import React, { useState } from "react"
import email_icon from '../../assets/email.png'
import key_icon from '../../assets/password.png'
import check_icon from '../../assets/check.png'
import './Popup.css'

function Popup({ closePopup }) {
    const [isResetPopActive, setResetPopupActive] = useState(false);

    const handleConfirmClick = () => {
        setResetPopupActive(true);
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                {!isResetPopActive ? (
                    <div className="popup-content">
                        <h2>Forgot your password?</h2>
                        <div className="popup-input-group">
                            <label htmlFor="email">
                                <img className="popup-img-icon-e" src={email_icon} alt="Email icon"/>
                                <input type="email" id="email" placeholder="Enter your email" required/>
                            </label>
                        </div>
                        <div className="all-btn">
                            <button className="popup-btn" onClick={handleConfirmClick}>Confirm</button>
                            <button className="popup-btn" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                ):(
                    <div className="popup-content">
                        <h2>Reset Password</h2>
                        <div className="popup-input-group">
                            <label htmlFor="password">
                                <img className="popup-img-icon" src={key_icon} alt="Password icon" />
                                <input type="password" id="password" placeholder="Enter your new password" required />
                            </label>
                        </div>
                        <div className="popup-input-group">
                            <label htmlFor="confirm-pass">
                                <img className="popup-img-icon" src={check_icon} alt="Password icon" />
                                <input type="password" id="confirm-password" placeholder="Confirm your new password" required />
                            </label>
                        </div>
                        <div className="all-btn">
                            <button className="popup-btn">Save</button>
                            <button className="popup-btn" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Popup