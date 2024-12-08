import React, { useState, useRef } from 'react';
import VoiceInput from './VoiceInput';

export default function TextForms(props) {
    const [text, setText] = useState("");
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const textAreaRef = useRef(null);
    const [showSliceModal, setShowSliceModal] = useState(false);
    const [startIndex, setStartIndex] = useState("");
    const [endIndex, setEndIndex] = useState("");

    // Helper function to save state for undo/redo
    const saveState = (newText) => {
        setUndoStack([...undoStack, text]);
        setRedoStack([]);
        setText(newText);
    };

    // Voice input handler
    const handleVoiceInput = (transcript) => {
      if (transcript && transcript.trim()) {
          const newText = text ? `${text} ${transcript}` : transcript;
          saveState(newText);
          props.showAlert("Voice input added", "success");
      }
  };

    // Slice handlers
    const handleSliceClick = () => {
        setShowSliceModal(true);
    };

    const handleSliceConfirm = () => {
        const start = parseInt(startIndex);
        const end = parseInt(endIndex);

        if (isNaN(start) || isNaN(end)) {
            props.showAlert("Please enter valid numbers", "warning");
            return;
        }

        if (start < 0 || end > text.length || start > end) {
            props.showAlert("Please enter valid range", "warning");
            return;
        }

        const newText = text.slice(start, end);
        saveState(newText);
        setShowSliceModal(false);
        setStartIndex("");
        setEndIndex("");
        props.showAlert("Text sliced successfully", "success");
    };

    // Text Transformation Functions
    const handleUpClick = () => {
        saveState(text.toUpperCase());
        props.showAlert("Converted to Uppercase", "success");
    };

    const handleLowClick = () => {
        saveState(text.toLowerCase());
        props.showAlert("Converted to Lowercase", "success");
    };

    const handleCapitalizeWords = () => {
        const newText = text.replace(/\b\w/g, char => char.toUpperCase());
        saveState(newText);
        props.showAlert("Capitalized all words", "success");
    };

    const handleSentenceCase = () => {
        const newText = text.toLowerCase().replace(/(^\w|\.\s+\w)/gm, letter => letter.toUpperCase());
        saveState(newText);
        props.showAlert("Converted to sentence case", "success");
    };

    const handleRemoveExtraSpaces = () => {
        const newText = text.replace(/\s+/g, ' ').trim();
        saveState(newText);
        props.showAlert("Removed extra spaces", "success");
    };

    const handleReverseText = () => {
        const newText = text.split('').reverse().join('');
        saveState(newText);
        props.showAlert("Text reversed", "success");
    };

    const handleEraseClick = () => {
        saveState("");
        props.showAlert("Text erased", "success");
    };

    // Formatting Functions
    const handleAddBullets = () => {
        const newText = text.split('\n').map(line => `• ${line}`).join('\n');
        saveState(newText);
        props.showAlert("Added bullets", "success");
    };

    const handleAddNumbering = () => {
        const newText = text.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
        saveState(newText);
        props.showAlert("Added numbering", "success");
    };

    const handleAddQuotes = () => {
        const newText = text.split('\n').map(line => `> ${line}`).join('\n');
        saveState(newText);
        props.showAlert("Added quote formatting", "success");
    };

    const handleAddHtmlPTags = () => {
        const newText = text.split('\n').map(line => `<p>${line}</p>`).join('\n');
        saveState(newText);
        props.showAlert("Added HTML p tags", "success");
    };

    // Utility Functions
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to clipboard", "success");
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "text-editor-content.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        props.showAlert("Downloaded text file", "success");
    };

    const handleUndo = () => {
        if (undoStack.length > 0) {
            const previousText = undoStack[undoStack.length - 1];
            const newUndoStack = undoStack.slice(0, -1);
            setUndoStack(newUndoStack);
            setRedoStack([...redoStack, text]);
            setText(previousText);
            props.showAlert("Undo successful", "success");
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextText = redoStack[redoStack.length - 1];
            const newRedoStack = redoStack.slice(0, -1);
            setRedoStack(newRedoStack);
            setUndoStack([...undoStack, text]);
            setText(nextText);
            props.showAlert("Redo successful", "success");
        }
    };

    const handleSortLines = () => {
        const newText = text.split('\n').sort().join('\n');
        saveState(newText);
        props.showAlert("Lines sorted alphabetically", "success");
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    // Analysis Functions
    const getWordCount = () => {
        return text.split(/\s+/).filter(word => word.length > 0).length;
    };

    const getUniqueWordCount = () => {
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        return new Set(words).size;
    };

    const getFrequentWords = () => {
        const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        return Object.entries(frequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([word, count]) => `${word}: ${count}`)
            .join(', ');
    };

    const getReadingTime = () => {
        return (0.008 * getWordCount()).toFixed(2);
    };

    const getParagraphCount = () => {
        return text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    };

    // Slice Modal Component
    const SliceModal = () => (
        <div className={`modal ${showSliceModal ? 'd-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{
                    backgroundColor: props.mode === "dark" ? "#345b93" : "white",
                    color: props.mode === "dark" ? "white" : "black"
                }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Slice Text</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setShowSliceModal(false)}
                            aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Start Index (0 to {text.length})</label>
                            <input
                                type="number"
                                className="form-control"
                                value={startIndex}
                                onChange={(e) => setStartIndex(e.target.value)}
                                min="0"
                                max={text.length}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">End Index (0 to {text.length})</label>
                            <input
                                type="number"
                                className="form-control"
                                value={endIndex}
                                onChange={(e) => setEndIndex(e.target.value)}
                                min="0"
                                max={text.length}
                            />
                        </div>
                        <div className="text-muted small">
                            Current text length: {text.length} characters
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={() => setShowSliceModal(false)}>Cancel</button>
                        <button type="button" className="btn btn-primary"
                            onClick={handleSliceConfirm}>Slice Text</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="container" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <div className="mb-3">
                    <h1 className="mb-2">{props.heading}</h1>
                    
                    <VoiceInput 
                        onTranscript={handleVoiceInput}
                        mode={props.mode}
                    />

                    <textarea
                        ref={textAreaRef}
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        style={{
                            backgroundColor: props.mode === "light" ? "white" : "#345b93",
                            color: props.mode === "light" ? "black" : "white",
                        }}
                        id="myBox"
                        rows="8"
                    />

                    <div className="button-group mt-3">
                        <h3>Text Transformations</h3>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
                            Uppercase
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
                            Lowercase
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCapitalizeWords}>
                            Capitalize Words
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSentenceCase}>
                            Sentence Case
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleRemoveExtraSpaces}>
                            Remove Extra Spaces
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleEraseClick}>
                            Erase Text
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleReverseText}>
                            Reverse Text
                        </button>
                        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSliceClick}>
                            Slice Text
                        </button>

                        <h3 className="mt-3">Formatting</h3>
                        <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handleAddBullets}>
                            Add Bullets
                        </button>
                        <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handleAddNumbering}>
                            Add Numbering
                        </button>
                        <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handleAddQuotes}>
                            Quote Block
                        </button>
                        <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={handleAddHtmlPTags}>
                            Add HTML Tags
                        </button>

                        <h3 className="mt-3">Utilities</h3>
                        <button disabled={text.length === 0} className="btn btn-info mx-1 my-1" onClick={handleCopy}>
                            Copy to Clipboard
                        </button>
                        <button disabled={text.length === 0} className="btn btn-info mx-1 my-1" onClick={handleDownload}>
                            Download Text
                        </button>
                        <button disabled={undoStack.length === 0} className="btn btn-info mx-1 my-1" onClick={handleUndo}>
                            Undo
                        </button>
                        <button disabled={redoStack.length === 0} className="btn btn-info mx-1 my-1" onClick={handleRedo}>
                            Redo
                        </button>
                        <button disabled={text.length === 0} className="btn btn-info mx-1 my-1" onClick={handleSortLines}>
                            Sort Lines
                        </button>
                    </div>
                </div>
            </div>

            <div className="container my-3" style={{ color: props.mode === "dark" ? "white" : "black" }}>
                <h2>Text Analysis</h2>
                <div className="row">
                    <div className="col-md-6">
                        <p>Total Words: {getWordCount()}</p>
                        <p>Characters: {text.length}</p>
                        <p>Unique Words: {getUniqueWordCount()}</p>
                        <p>Paragraphs: {getParagraphCount()}</p>
                    </div>
                    <div className="col-md-6">
                        <p>Reading Time: {getReadingTime()} minutes</p>
                        <p>Most Frequent Words: {text.length > 0 ? getFrequentWords() : "N/A"}</p>
                    </div>
                </div>

                <hr />
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview"}</p>
            </div>

            <SliceModal />
        </>
    );
}