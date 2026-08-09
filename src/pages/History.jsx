import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function History() {
  const [history, setHistory] = useState([]);

  // =========================
  // LOAD HISTORY
  // =========================

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("codeHistory")) || [];

    setHistory(savedHistory);
  }, []);


  // =========================
  // DELETE ONE ITEM
  // =========================

  const deleteItem = (id) => {
    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "codeHistory",
      JSON.stringify(updatedHistory)
    );

    // Update Dashboard
    window.dispatchEvent(
      new Event("historyUpdated")
    );
  };


  // =========================
  // CLEAR HISTORY
  // =========================

  const clearHistory = () => {
    localStorage.removeItem("codeHistory");

    setHistory([]);

    // Update Dashboard
    window.dispatchEvent(
      new Event("historyUpdated")
    );
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
            className="sidebar-link"
          >
            <span>⌘</span>
            Code Explainer
          </a>

          <a
            href="/history"
            className="sidebar-link active"
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
              History
            </h1>

            <p>
              View your previous code analyses.
            </p>

          </div>


          {history.length > 0 && (

            <button
              className="clear-history-button"
              onClick={clearHistory}
            >
              Clear History
            </button>

          )}

        </header>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {history.length === 0 ? (

          <div className="history-empty">

            <div className="empty-icon">
              ◷
            </div>

            <h2>
              No analysis history yet
            </h2>

            <p>
              Your previous code analyses
              will appear here.
            </p>

            <a
              href="/workspace"
              className="analyze-button"
            >
              Analyze Code →
            </a>

          </div>

        ) : (

          /* =========================
             HISTORY LIST
          ========================= */

          <div className="history-list">

            {history.map((item) => (

              <div
                className="history-card"
                key={item.id}
              >

                {/* Card Header */}
                <div className="history-card-header">

                  <div>

                    <span className="history-feature">
                      {item.feature}
                    </span>

                    <span className="history-date">
                      {item.date}
                    </span>

                  </div>


                  <button
                    className="delete-history-button"
                    onClick={() =>
                      deleteItem(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>


                {/* Code */}
                <div className="history-code">

                  <div className="history-section-title">
                    Your Code
                  </div>

                  <pre>
                    <code>
                      {item.code}
                    </code>
                  </pre>

                </div>


                {/* Result */}
                <div className="history-result">

                  <div className="history-section-title">
                    AI Result
                  </div>

                  <div className="markdown-result">

                    <ReactMarkdown>
                      {item.result}
                    </ReactMarkdown>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default History;