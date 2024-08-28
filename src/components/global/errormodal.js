import React, { useState } from "react";

function ErrorModal() {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null; // Don't render anything if the modal is not visible

    return (
        <div className="frame">
            <div className="modal">
                <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" alt="Alert" />
                <span className="title">Oh snap!</span>
                <p>An error has occurred while creating an error report.</p>
                <div className="button" onClick={handleDismiss}>
                    Dismiss
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;
