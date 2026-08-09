import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [history, setHistory] = useState([]);

  // =========================
  // LOAD HISTORY
  // =========================

  useEffect(() => {
    const loadHistory = () => {
      const savedHistory =
        JSON.parse(localStorage.getItem("codeHistory")) || [];

      setHistory(savedHistory);
    };

    // Load when Dashboard opens
    loadHistory();

    // Update immediately after new analysis
    window.addEventListener("historyUpdated", loadHistory);

    return () => {
      window.removeEventListener("historyUpdated", loadHistory);
    };
  }, []);

  // =========================
  // DASHBOARD COUNTS
  // =========================

  const totalAnalyses = history.length;

  const explanations = history.filter(
    (item) => item.feature === "Explain"
  ).length;

  const debugging = history.filter(
    (item) => item.feature === "Debug"
  ).length;

  const optimizations = history.filter(
    (item) => item.feature === "Optimize"
  ).length;

  // Latest 5 analyses
  const recentAnalyses = history.slice(0, 5);

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

          <Link
            to="/dashboard"
            className="sidebar-link active"
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
            className="sidebar-link"
          >
            <span>◷</span>
            History
          </Link>

        </nav>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Overview of your AI-powered
              code analysis.
            </p>
          </div>

          <Link
            to="/workspace"
            className="dashboard-button"
          >
            + Analyze Code
          </Link>

        </div>


        {/* =========================
            STATS
        ========================= */}

        <section className="dashboard-cards">

          {/* Total */}
          <div className="dashboard-card">

            <p>Total Analyses</p>

            <h2>
              {totalAnalyses}
            </h2>

            <span>
              All code analyses
            </span>

          </div>


          {/* Explain */}
          <div className="dashboard-card">

            <p>Code Explanations</p>

            <h2>
              {explanations}
            </h2>

            <span>
              Understand your code
            </span>

          </div>


          {/* Debug */}
          <div className="dashboard-card">

            <p>Debugging</p>

            <h2>
              {debugging}
            </h2>

            <span>
              Issues analyzed
            </span>

          </div>


          {/* Optimize */}
          <div className="dashboard-card">

            <p>Optimizations</p>

            <h2>
              {optimizations}
            </h2>

            <span>
              Code improvements
            </span>

          </div>

        </section>


        {/* =========================
            BOTTOM SECTION
        ========================= */}

        <section className="dashboard-bottom">

          {/* Recent Analyses */}
          <div className="dashboard-section">

            <div className="section-header">

              <h2>
                Recent Analyses
              </h2>

              <Link to="/history">
                View History →
              </Link>

            </div>


            {recentAnalyses.length === 0 ? (

              <div className="dashboard-empty">

                <div className="dashboard-empty-icon">
                  ◷
                </div>

                <h3>
                  No analyses yet
                </h3>

                <p>
                  Your recent code analyses
                  will appear here.
                </p>

                <Link to="/workspace">
                  Analyze your first piece
                  of code →
                </Link>

              </div>

            ) : (

              <div className="recent-analysis-list">

                {recentAnalyses.map((item) => (

                  <div
                    className="recent-analysis-item"
                    key={item.id}
                  >

                    <div>

                      <strong>
                        {item.feature}
                      </strong>

                      <p>
                        {item.language}
                      </p>

                    </div>

                    <span>
                      {item.date}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* Quick Start */}
          <div className="dashboard-section quick-start">

            <h2>
              Quick Start
            </h2>

            <p>
              Choose what you want to do
              with your code.
            </p>


            {/* Explain */}
            <Link
              to="/workspace"
              className="quick-action"
            >

              <span>✦</span>

              <div>

                <strong>
                  Explain Code
                </strong>

                <small>
                  Get a beginner-friendly
                  explanation
                </small>

              </div>

            </Link>


            {/* Debug */}
            <Link
              to="/workspace"
              className="quick-action"
            >

              <span>⌘</span>

              <div>

                <strong>
                  Debug Code
                </strong>

                <small>
                  Find and understand
                  potential bugs
                </small>

              </div>

            </Link>


            {/* Optimize */}
            <Link
              to="/workspace"
              className="quick-action"
            >

              <span>↗</span>

              <div>

                <strong>
                  Optimize Code
                </strong>

                <small>
                  Improve readability
                  and efficiency
                </small>

              </div>

            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;