import React, { useState } from 'react';
import { signup } from "../services/auth";
import { setToken } from "../services/auth";
import './SignUpForm.css';

function SignUpForm({ onCancel,onSwitchToLogin, onSignUpSuccess }){
    const [name, setName] = useState("");
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
        const signUpPayload = { name, email, password };
        
        try {
            const data = await signup(signUpPayload);
            if (data && data.access_token) {
                alert("Sign Up Successful");
                setToken(data.access_token);
                if (onSignUpSuccess) onSignUpSuccess(); // Call success callback
                if (onCancel) onCancel();
            } else {
                alert("Sign up failed: Invalid response");
            }
        } catch (error) {
            console.error('Error Sign Up:', error);
            if (error.response?.status >= 400) {
                alert(`Server error: ${error.response.status}`);
            } else {
                alert("Failed to sign up. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Signing Up...</p>
    }

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                    disabled={loading}
                    className="form-input"
                    type="text" 
                    value={name} 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
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
                    {loading ? "Signing Up" : "Sign Up"}
                </button>
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
            {/* Add link to login */}
            <div className="form-footer" style={{ marginTop: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                Already have an account?{' '}
                <button 
                    type="button" 
                    onClick={onSwitchToLogin}
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
                    Log in
                </button>
                </p>
            </div>
        </form>
    )
}

export default SignUpForm;