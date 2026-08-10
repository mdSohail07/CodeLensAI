import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory =
        JSON.parse(
          localStorage.getItem("codeHistory")
        ) || [];

      setHistory(savedHistory);
    };

    loadHistory();

    window.addEventListener(
      "historyUpdated",
      loadHistory
    );

    return () => {
      window.removeEventListener(
        "historyUpdated",
        loadHistory
      );
    };
  }, []);

  const deleteItem = (id) => {
    const updatedHistory = history.filter(
      (item) => item.id !== id
    );

    setHistory(updatedHistory);

    localStorage.setItem(
      "codeHistory",
      JSON.stringify(updatedHistory)
    );

    window.dispatchEvent(
      new Event("historyUpdated")
    );
  };

  const clearHistory = () => {
    localStorage.removeItem("codeHistory");
    setHistory([]);

    window.dispatchEvent(
      new Event("historyUpdated")
    );
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
            className="sidebar-link"
          >
            <span>⌘</span>
            Code Explainer
          </Link>

          <Link
            to="/history"
            className="sidebar-link active"
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

            <h1>History</h1>

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


        {/* Empty */}
        {history.length === 0 ? (

          <div className="history-empty">

            <div className="empty-icon">
              ◷
            </div>

            <h2>
              No analysis history yet
            </h2>

            <p>
              Your previous code analyses will
              appear here.
            </p>

            <Link
              to="/workspace"
              className="analyze-button"
            >
              Analyze Code →
            </Link>

          </div>

        ) : (

          /* History List */
          <div className="history-list">

            {history.map((item) => (

              <div
                className="history-card"
                key={item.id}
              >

                {/* Header */}
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