import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-nav">

        <Link to="/" className="home-logo">
          <span>CodeLens</span> AI
        </Link>

        <div className="home-nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/workspace">Code Explainer</Link>
          <Link to="/history">History</Link>
        </div>

        <Link
          to="/workspace"
          className="home-start-button"
        >
          Start →
        </Link>

      </nav>


      {/* Hero */}
      <main className="home-hero">

        <div className="home-badge">
          AI POWERED DEVELOPER TOOL
        </div>

        <h1>
          Understand Your Code
          <br />
          With AI
        </h1>

        <p>
          Explain, debug, optimize and analyze your code
          with an AI-powered developer assistant.
        </p>

        <div className="home-actions">

          <Link
            to="/workspace"
            className="home-button"
          >
            Start Explaining →
          </Link>

          <Link
            to="/dashboard"
            className="home-secondary-button"
          >
            View Dashboard
          </Link>

        </div>

      </main>


      {/* Features */}
      <section className="home-features">

        <div className="home-feature-card">

          <div className="home-feature-icon">
            ✦
          </div>

          <h2>
            Explain
          </h2>

          <p>
            Understand complex code in simple and
            beginner-friendly language.
          </p>

        </div>


        <div className="home-feature-card">

          <div className="home-feature-icon">
            ⌘
          </div>

          <h2>
            Debug
          </h2>

          <p>
            Find potential bugs and get suggestions
            to fix your code.
          </p>

        </div>


        <div className="home-feature-card">

          <div className="home-feature-icon">
            ↗
          </div>

          <h2>
            Optimize
          </h2>

          <p>
            Get suggestions to make your code cleaner
            and more efficient.
          </p>

        </div>


        <div className="home-feature-card">

          <div className="home-feature-icon">
            ◎
          </div>

          <h2>
            Complexity
          </h2>

          <p>
            Understand the time and space complexity
            of your algorithms.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;