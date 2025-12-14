import React, { useState } from 'react';
import { login } from "../services/auth";
import { setToken } from "../services/auth";
import './LoginForm.css';

function LoginForm({ onCancel, onSwitchToSignUp, onLoginSuccess }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const validatePassword = (pwd) => {
        const hasMinLength = pwd.length >= 8;
        const hasCapitalLetter = /[A-Z]/.test(pwd);
        const hasSmallLetter = /[a-z]/.test(pwd);
        const hasDigit = /[0-9]/.test(pwd);
        
        return {
            isValid: hasMinLength && hasCapitalLetter && hasSmallLetter && hasDigit,
            hasMinLength,
            hasCapitalLetter,
            hasSmallLetter,
            hasDigit
        };
    };

    const passwordValidation = validatePassword(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!passwordValidation.isValid) {
            alert("Please ensure your password meets all requirements");
            return;
        }

        setLoading(true);
        const loginPayload = { email, password };
        
        try {
            const data = await login(loginPayload);
            if (data && data.access_token) {
                setToken(data.access_token);

                if(onLoginSuccess) onLoginSuccess();  // Call success callback , will tell App.jsx that login is successful and when can set authenticated to true
                if (onCancel) onCancel();
            } else {
                alert("Login failed: Invalid response");
            }
        } catch (error) {
            console.error('Error Login:', error);
            if (error.response?.status >= 400) {
                alert(`Server error: ${error.response.status}`);
            } else {
                alert("Failed to login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Logging In...</p>
    }

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                    disabled={loading}
                    className="form-input"
                    type="email" 
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                    disabled={loading}
                    className="form-input"
                    type="password" 
                    value={password} 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="password-requirements">
                    <div className={`requirement ${passwordValidation.hasMinLength ? 'valid' : ''}`}>
                        {passwordValidation.hasMinLength ? '✓' : '○'} Minimum 8 characters
                    </div>
                    <div className={`requirement ${passwordValidation.hasCapitalLetter ? 'valid' : ''}`}>
                        {passwordValidation.hasCapitalLetter ? '✓' : '○'} At least one capital letter
                    </div>
                    <div className={`requirement ${passwordValidation.hasSmallLetter ? 'valid' : ''}`}>
                        {passwordValidation.hasSmallLetter ? '✓' : '○'} At least one small letter
                    </div>
                    <div className={`requirement ${passwordValidation.hasDigit ? 'valid' : ''}`}>
                        {passwordValidation.hasDigit ? '✓' : '○'} At least one digit
                    </div>
                </div>
            </div>
            <div className="form-buttons">
                <button type="submit" disabled={loading || !passwordValidation.isValid} className="btn-submit">
                    {loading ? "Logging In" : "Log In"}
                </button>
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
            {/* Add link to signup */}
            <div className="form-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Don't have an account?{' '}
                <button 
                    type="button" 
                    onClick={onSwitchToSignUp}
                    style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#3B82F6', 
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                    fontSize: '0.875rem'
                    }}
                >
                    Sign up
                </button>
                </p>
            </div>
        </form>
    )
}

export default LoginForm;