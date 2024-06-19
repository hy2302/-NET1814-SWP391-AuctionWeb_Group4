import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import user_icon from '../../assets/person.png'
import key_icon from '../../assets/password.png'
import email_icon from '../../assets/email.png'
import address_icon from '../../assets/address.png'
import phone_icon from '../../assets/phone.png'
import './Login.css'
import Popup from "../Popup/Popup"
import axios from "axios"

function Login() {
    const navigate = useNavigate();
    const [isSignUpActive, setSignUpActive] = useState(false);
    const [openPopup, setPopupStatus] = useState(false);

    const toggleForms = () => {
        setSignUpActive(!isSignUpActive);
    };

    const togglePopup = () => {
        setPopupStatus(!openPopup);
    };

    

    return (
        <div className="login-body">
            <div className={`wrapper ${isSignUpActive ? 'active' : ''}`}>
                <div className="form-wrapper login">
                    <h2>Login</h2>
                    <p>Sign in or create an account</p>
                    <form action="login" className="login">
                        <div className="input-group">
                            <label htmlFor="username">
                                <img className="img-icon" src={user_icon} alt="User icon"/>
                                <input type="text" id="username" placeholder="Enter your username" required/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">
                                <img className="img-icon" src={key_icon} alt="Password icon"/>
                                <input type="password" id="password" placeholder="Enter your password" required/>
                            </label>
                        </div>
                        <div className="options">
                            <label>
                                <input className="checkbox-btn" type="checkbox"/>
                                <span className="remember-txt"> Remember me</span>
                            </label>
                            <a className="reset-link" href="#" onClick={() => {togglePopup(true)}}>Reset password</a>
                        </div>
                        <div className="register-link">
                            <p>New user? Register now. <a href="#" className="signUpBtn-link" onClick={toggleForms}>Sign up</a></p>
                        </div>
                        <button type="submit" className="btn">Sign in</button>
                        <div className="terms">
                            <p>By continuing, you agree to our <a href="#" onClick={() => navigate('/policy')}>terms of service and privacy policy.</a></p>
                        </div>
                    </form>
                </div>
            {openPopup && <Popup closePopup={togglePopup} />}
                <div className="form-wrapper signup">
                    <h2>Sign Up</h2>
                    <p>Create an account or sign in</p>
                    <form action="signup" className="signup">
                        <div className="input-group">
                            <label htmlFor="username">
                                <img className="img-icon" src={user_icon} alt="User icon"/>
                                <input type="text" id="username" placeholder="Enter your username" required/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">
                                <img className="img-icon" src={key_icon} alt="Password icon"/>
                                <input type="password" id="password" placeholder="Enter your password" required/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">
                                <img className="img-icon-e" src={email_icon} alt="Email icon"/>
                                <input type="email" id="email" placeholder="Enter your email" required/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="contactnumber">
                                <img className="img-icon" src={phone_icon} alt="Email icon"/>
                                <input type="text" id="contactnumber" placeholder="Enter your contact number" required/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">
                                <img className="img-icon" src={address_icon} alt="Email icon"/>
                                <input type="text" id="address" placeholder="Enter your address" required/>
                            </label>
                        </div>
                        <div className="register-link">
                            <p>Already have an account? <a href="#" className="signInBtn-link" onClick={toggleForms}>Sign in</a></p>
                        </div>
                        <button type="submit" className="btn">Create account</button>
                        <div className="terms">
                            <p>By continuing, you agree to our <a href="#" onClick={() => navigate('/policy')}>terms of service and privacy policy.</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
