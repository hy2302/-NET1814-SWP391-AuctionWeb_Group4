import React, { useState } from "react";
import email_icon from '../../assets/email.png';
import key_icon from '../../assets/password.png';
import check_icon from '../../assets/check.png';
import './Popup.css';

function Popup({ closePopup }) {
    const [isResetPopActive, setResetPopupActive] = useState(false);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmClick = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setResetPopupActive(true);
            } else {
                // Handle error response from server
                console.error('Failed to initiate password reset:', response.statusText);
            }
        } catch (error) {
            console.error('Error initiating password reset:', error.message);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/User/Forgot Password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword, confirmPassword }),
            });
            if (response.ok) {
                // Password reset successfully
                alert('Password reset successful!');
                closePopup();
            } else {
                // Handle error response from server
                console.error('Failed to reset password:', response.statusText);
            }
        } catch (error) {
            console.error('Error resetting password:', error.message);
        }
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
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="all-btn">
                            <button className="popup-btn" onClick={handleConfirmClick}>Confirm</button>
                            <button className="popup-btn" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                ) : (
                    <div className="popup-content">
                        <h2>Reset Password</h2>
                        <div className="popup-input-group">
                            <label htmlFor="password">
                                <img className="popup-img-icon" src={key_icon} alt="Password icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your new password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="popup-input-group">
                            <label htmlFor="confirm-pass">
                                <img className="popup-img-icon" src={check_icon} alt="Password icon" />
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm your new password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="all-btn">
                            <button className="popup-btn" onClick={handleSaveClick}>Save</button>
                            <button className="popup-btn" onClick={closePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Popup;
