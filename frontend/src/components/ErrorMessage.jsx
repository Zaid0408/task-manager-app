import React from "react";
import './ErrorMessage.css'

function ErrorMessage({ message }){
    if (!message) return null;
    return (
        <div className="error-box">
            ⚠️ {message}
        </div>
    );
}

export default ErrorMessage;
