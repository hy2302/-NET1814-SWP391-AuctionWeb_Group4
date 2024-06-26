import React, { useState, useEffect } from "react"
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
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        email: '',
        contactnumber: '',
        address: ''
    });

    const toggleForms = () => {
        setSignUpActive(!isSignUpActive);
    };

    const togglePopup = () => {
        setPopupStatus(!openPopup);
    };

    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSignupChange = (e) => {
        const { id, value } = e.target;
        setSignupData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5074/api/User/Login', loginData, {
                headers: { 'Content-Type': 'application/json' }
            });
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.role.roleName === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/*');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5074/api/User/Registration', signupData, {
                headers: { 'Content-Type': 'application/json' }
            });
            const data = response.data;
            if (data.success) {
                setSignUpActive(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-body">
            <div className={`wrapper ${isSignUpActive ? 'active' : ''}`}>
                <div className="form-wrapper login">
                    <h2>Login</h2>
                    <p>Sign in or create an account</p>
                    <form className="login" onSubmit={handleLoginSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">
                                <img className="img-icon" src={user_icon} alt="User icon"/>
                                <input type="text" id="username" placeholder="Enter your username" required onChange={handleLoginChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">
                                <img className="img-icon" src={key_icon} alt="Password icon"/>
                                <input type="password" id="password" placeholder="Enter your password" required onChange={handleLoginChange}/>
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
                    <form className="signup" onSubmit={handleSignupSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">
                                <img className="img-icon" src={user_icon} alt="User icon"/>
                                <input type="text" id="username" placeholder="Enter your username" required onChange={handleSignupChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">
                                <img className="img-icon" src={key_icon} alt="Password icon"/>
                                <input type="password" id="password" placeholder="Enter your password" required onChange={handleSignupChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">
                                <img className="img-icon-e" src={email_icon} alt="Email icon"/>
                                <input type="email" id="email" placeholder="Enter your email" required onChange={handleSignupChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="contactnumber">
                                <img className="img-icon" src={phone_icon} alt="Phone icon"/>
                                <input type="text" id="contactnumber" placeholder="Enter your contact number" required onChange={handleSignupChange}/>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">
                                <img className="img-icon" src={address_icon} alt="Address icon"/>
                                <input type="text" id="address" placeholder="Enter your address" required onChange={handleSignupChange}/>
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