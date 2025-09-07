import React from "react";
import './LoadingSpinner.css'

function LoadingSpinner(){
    return (
        <div className="spinner">
            <div className="dot dot1" />
            <div className="dot dot2" />
            <div className="dot dot3" />
        </div>
    );
}

export default LoadingSpinner;
