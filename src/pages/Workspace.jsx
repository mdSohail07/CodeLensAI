import { useState } from "react";
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
        "https://codelensai-p4kp.onrender.com/api/analyze",
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

      // =========================
      // SAVE ANALYSIS TO HISTORY
      // =========================

      const oldHistory =
        JSON.parse(
          localStorage.getItem("codeHistory")
        ) || [];

      const newAnalysis = {
        id: Date.now(),
        code: code,
        language: language,
        feature: feature,
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

      // Update Dashboard immediately
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
    <div className="workspace-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <span>CodeLens</span> AI
        </div>

        <nav className="sidebar-nav">

          <a
            href="/dashboard"
            className="sidebar-link"
          >
            <span>▣</span>
            Dashboard
          </a>

          <a
            href="/workspace"
            className="sidebar-link active"
          >
            <span>⌘</span>
            Code Explainer
          </a>

          <a
            href="/history"
            className="sidebar-link"
          >
            <span>◷</span>
            History
          </a>

        </nav>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <main className="workspace-main">

        {/* Header */}
        <header className="workspace-header">

          <div>
            <h1>
              Code Explainer
            </h1>

            <p>
              Understand, debug and improve your
              code with AI.
            </p>
          </div>

        </header>


        {/* =========================
            FEATURE TABS
        ========================= */}

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
                feature === item
                  ? "active"
                  : ""
              }`}
              onClick={() => setFeature(item)}
            >
              {item}
            </button>

          ))}

        </div>


        {/* =========================
            EDITOR AREA
        ========================= */}

        <section className="editor-container">

          {/* Code Input */}
          <div className="editor-panel">

            <div className="panel-header">

              <span>
                Your Code
              </span>

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

              <span>
                AI Result
              </span>

              {loading && (
                <span className="loading-text">
                  Analyzing...
                </span>
              )}

            </div>


            <div className="result-content">

              {/* Empty */}
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


              {/* Loading */}
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


              {/* Result */}
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


        {/* =========================
            ANALYZE BUTTON
        ========================= */}

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