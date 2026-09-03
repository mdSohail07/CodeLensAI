import { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function Workspace() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [feature, setFeature] = useState("Explain");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch(
        "https://codelens-p6yx.onrender.com/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            feature,
            language,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Something went wrong"
        );
      }

      setResult(data.result);

      // Save analysis to history
      const oldHistory =
        JSON.parse(
          localStorage.getItem("codeHistory")
        ) || [];

      const newAnalysis = {
        id: Date.now(),
        code,
        language,
        feature,
        result: data.result,
        date: new Date().toLocaleString(),
      };

      const updatedHistory = [
        newAnalysis,
        ...oldHistory,
      ];

      localStorage.setItem(
        "codeHistory",
        JSON.stringify(updatedHistory)
      );

      // Update dashboard
      window.dispatchEvent(
        new Event("historyUpdated")
      );

    } catch (error) {
      setResult(`**Error:** ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <span>CodeLens</span> AI
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="sidebar-link"
          >
            <span>▣</span>
            Dashboard
          </Link>

          <Link
            to="/workspace"
            className="sidebar-link active"
          >
            <span>⌘</span>
            Code Explainer
          </Link>

          <Link
            to="/history"
            className="sidebar-link"
          >
            <span>◷</span>
            History
          </Link>

        </nav>

      </aside>


      {/* Main */}
      <main className="workspace-main">

        <header className="workspace-header">

          <div>
            <h1>Code Explainer</h1>

            <p>
              Understand, debug and improve your
              code with AI.
            </p>
          </div>

        </header>


        {/* Feature Tabs */}
        <div className="feature-tabs">

          {[
            "Explain",
            "Debug",
            "Optimize",
            "Complexity",
          ].map((item) => (

            <button
              key={item}
              className={`feature-tab ${
                feature === item ? "active" : ""
              }`}
              onClick={() => setFeature(item)}
            >
              {item}
            </button>

          ))}

        </div>


        {/* Editor */}
        <section className="editor-container">

          {/* Code Input */}
          <div className="editor-panel">

            <div className="panel-header">

              <span>Your Code</span>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
              >

                <option value="javascript">
                  JavaScript
                </option>

                <option value="python">
                  Python
                </option>

                <option value="cpp">
                  C++
                </option>

              </select>

            </div>

            <textarea
              className="code-input"
              value={code}
              onChange={(e) =>
                setCode(e.target.value)
              }
              placeholder="Paste your code here..."
            />

          </div>


          {/* AI Result */}
          <div className="result-panel">

            <div className="panel-header">

              <span>AI Result</span>

              {loading && (
                <span className="loading-text">
                  Analyzing...
                </span>
              )}

            </div>


            <div className="result-content">

              {!result && !loading && (

                <div className="empty-result">

                  <div className="empty-icon">
                    ✦
                  </div>

                  <h3>
                    Your analysis will appear here
                  </h3>

                  <p>
                    Paste your code and click
                    Analyze Code to get started.
                  </p>

                </div>

              )}


              {loading && (

                <div className="empty-result">

                  <div className="loading-spinner"></div>

                  <h3>
                    Analyzing your code...
                  </h3>

                  <p>
                    AI is preparing your{" "}
                    {feature.toLowerCase()}.
                  </p>

                </div>

              )}


              {result && !loading && (

                <article className="markdown-result">

                  <ReactMarkdown>
                    {result}
                  </ReactMarkdown>

                </article>

              )}

            </div>

          </div>

        </section>


        {/* Analyze Button */}
        <button
          className="analyze-button workspace-button"
          onClick={analyzeCode}
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Code →"}
        </button>

      </main>

    </div>
  );
}

export default Workspace;