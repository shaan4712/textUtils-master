export default function About(props) {
  let myStyle = {
    color: props.mode === "dark" ? "white" : "#042743",
    backgroundColor: props.mode === "dark" ? "rgb(36 74 104)" : "white",
  };

  return (
    <div className="container my-3">
      <h1
        className="my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        About TextUtils
      </h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={myStyle}
            >
              <strong>Powerful Text Analysis & Manipulation</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              TextUtils is your comprehensive text analysis and manipulation toolkit. Our platform offers a wide range of features including:
              <ul className="mt-2">
                <li>Advanced word and character counting with detailed statistics</li>
                <li>Text case conversion (uppercase, lowercase, sentence case, title case)</li>
                <li>Smart formatting tools (bullet points, numbering, quotes)</li>
                <li>Extra space removal and text cleanup</li>
                <li>Reading time estimation for better content planning</li>
                <li>Unique word analysis and frequency counting</li>
                <li>Text reversal and custom transformations</li>
              </ul>
              Perfect for content creators, students, and professionals who need quick and accurate text analysis.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={myStyle}
            >
              <strong>Free & Premium Features</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              TextUtils believes in providing value to our users:
              <div className="mt-2">
                <h5>Free Features:</h5>
                <ul>
                  <li>Unlimited text analysis and character counting</li>
                  <li>Basic text transformations and formatting</li>
                  <li>Word and character statistics</li>
                  <li>Dark/Light mode support</li>
                  <li>Mobile-responsive interface</li>
                </ul>
                
                <h5 className="mt-3">Premium Features (Coming Soon):</h5>
                <ul>
                  <li>Advanced document analysis</li>
                  <li>Custom text templates</li>
                  <li>Cloud storage for text snippets</li>
                  <li>Collaboration tools</li>
                  <li>API access for developers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={myStyle}
            >
              <strong>Cross-Platform Compatibility</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              TextUtils is built with universal accessibility in mind:
              <ul className="mt-2">
                <li>Works flawlessly across all modern browsers (Chrome, Firefox, Safari, Edge, Opera)</li>
                <li>Responsive design for mobile, tablet, and desktop devices</li>
                <li>Supports text processing from various sources:
                  <ul className="mt-1">
                    <li>Social media posts and comments</li>
                    <li>Word documents and PDFs (copy/paste)</li>
                    <li>Spreadsheets and databases</li>
                    <li>Email content and blog posts</li>
                  </ul>
                </li>
                <li>Optimized performance for processing large text blocks</li>
                <li>Accessibility features for screen readers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              style={myStyle}
            >
              <strong>Privacy & Security</strong>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              Your privacy and data security are our top priorities:
              <ul className="mt-2">
                <li>All text processing happens locally in your browser</li>
                <li>No data is stored on our servers</li>
                <li>No registration or personal information required</li>
                <li>SSL encryption for secure data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Compliance with data protection regulations</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
              style={myStyle}
            >
              <strong>Support & Community</strong>
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              Join our growing community of TextUtils users:
              <ul className="mt-2">
                <li>24/7 customer support via email</li>
                <li>Comprehensive documentation and tutorials</li>
                <li>Regular feature updates based on user feedback</li>
                <li>Active user community forums</li>
                <li>Developer API documentation</li>
                <li>Educational resources for content creators</li>
              </ul>
              <div className="mt-3">
                <strong>Contact Us:</strong>
                <p className="mb-0 mt-2">Email: shaan2k3@gmail.com</p>
                <p className="mb-0">GitHub: https://github.com/shaan4712</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}