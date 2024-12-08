import React, { useState } from 'react';

const VoiceInput = ({ onTranscript, mode }) => {
    const [isListening, setIsListening] = useState(false);
    
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Speech recognition is not supported in your browser. Please use Chrome.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false; // Changed to false
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            console.log('Started listening');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Got result:', transcript);
            onTranscript(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            console.log('Recognition ended');
            setIsListening(false);
        };

        try {
            recognition.start();
        } catch (err) {
            console.error('Start error:', err);
            setIsListening(false);
        }
    };

    const stopListening = () => {
        setIsListening(false);
    };

    return (
        <div className="voice-input-container mb-2">
            <button
                className={`btn ${isListening ? 'btn-danger' : 'btn-success'} d-flex align-items-center`}
                onClick={isListening ? stopListening : startListening}
                style={{
                    color: mode === "dark" ? "white" : "white",
                }}
            >
                <svg 
                    viewBox="0 0 24 24" 
                    className="me-2" 
                    style={{ width: '20px', height: '20px' }}
                    fill="currentColor"
                >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
                {isListening ? 'Stop Recording' : 'Start Recording'}
            </button>
            <small className="text-muted d-block mt-1">
                {isListening ? 'Listening... Speak now' : 'Click to start speaking'}
            </small>
        </div>
    );
};

export default VoiceInput;