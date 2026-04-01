"use client";

const models = [
  { icon: "🧠", name: "GPT-5", org: "OpenAI", active: true },
  { icon: "⚡", name: "GPT-5 Turbo", org: "OpenAI" },
  { icon: "🌟", name: "GPT-4o", org: "OpenAI" },
  { icon: "👑", name: "Claude Opus 4.6", org: "Anthropic" },
  { icon: "🔬", name: "Gemini 3.1 Pro", org: "Google" },
  { icon: "🦙", name: "Llama 4 Maverick", org: "Meta" },
];

const goalTiles = [
  { icon: "✍️", label: "Write content", sub: "Emails, posts, stories" },
  { icon: "🎨", label: "Create images", sub: "Art, photos, designs" },
  { icon: "🛠️", label: "Build something", sub: "Apps, tools, websites" },
  { icon: "⚡", label: "Automate work", sub: "Save hours every week" },
  { icon: "📊", label: "Analyse data", sub: "PDFs, sheets, reports" },
  { icon: "🔍", label: "Just exploring", sub: "Show me what's possible" },
];

export default function ChatHubPage() {
  return (
    <div className="page">
      <div className="app-nav">
        <div className="logo">NexusAI</div>
        <div className="tabs">
          <button className="tab active">💬 Chat Hub</button>
          <button className="tab">🛍 Marketplace</button>
          <button className="tab">🤖 Agents</button>
          <button className="tab">🔬 Discover New</button>
        </div>
        <div className="actions">
          <button className="btn ghost">Sign in</button>
          <button className="btn primary">Try free →</button>
        </div>
      </div>

      <div className="app-body">
        <aside className="sidebar">
          <div className="section">
            <div className="label">Models</div>
            <input className="search" placeholder="Search models..." />
            <div className="model-list">
              {models.map((model) => (
                <div
                  key={model.name}
                  className={`model-item ${model.active ? "active" : ""}`}
                >
                  <div className="model-icon">{model.icon}</div>
                  <div>
                    <div className="model-name">{model.name}</div>
                    <div className="model-org">{model.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="section">
            <div className="create-agent">
              <div className="create-title">+ Create Agent</div>
              <div className="create-sub">
                Build a custom AI agent with any model
              </div>
            </div>
          </div>
        </aside>

        <main className="center">
          <div className="chat-area">
            <div className="greet-card">
              <div className="greet-avatar">✦</div>
              <h3>Welcome! I&apos;m here to help you 👋</h3>
              <p>
                No tech background needed. Tell me what you&apos;d like to
                achieve and I&apos;ll guide you step by step.
              </p>
              <div className="goal-block">
                <div className="goal-label">
                  What would you like to do today?
                </div>
                <div className="goal-grid">
                  {goalTiles.map((tile) => (
                    <button key={tile.label} className="goal-tile">
                      <span>{tile.icon}</span>
                      <strong>{tile.label}</strong>
                      <small>{tile.sub}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="input-area">
            <div className="input-wrap">
              <textarea
                rows={2}
                placeholder="Describe your project, ask a question, or just say hi..."
              />
              <div className="tools">
                <span>Voice</span>
                <span>Video</span>
                <span>Attach</span>
                <span>Image</span>
              </div>
            </div>
            <button className="send">➤</button>
          </div>
        </main>

        <aside className="right">
          <div className="panel">
            <div className="label">Active Model</div>
            <div className="active-card">
              <div className="active-head">
                <div className="model-icon">🧠</div>
                <div>
                  <div className="model-name">GPT-5.4</div>
                  <div className="model-org">by OpenAI</div>
                </div>
              </div>
              <p>Select a model to see details.</p>
              <div className="stats">
                <div>
                  <strong>1.05M</strong>
                  <span>Context</span>
                </div>
                <div>
                  <strong>$2.50</strong>
                  <span>/1M tk</span>
                </div>
                <div>
                  <strong>4.8⭐</strong>
                  <span>Rating</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f4f2ee;
          color: #1c1a16;
          font-family: "Inter", sans-serif;
        }
        .app-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: #ffffff;
        }
        .logo {
          font-size: 20px;
          font-weight: 700;
        }
        .tabs {
          display: flex;
          gap: 6px;
        }
        .tab {
          border: 0;
          background: transparent;
          padding: 8px 12px;
          border-radius: 999px;
          color: #5a5750;
          cursor: pointer;
        }
        .tab.active {
          background: #fdf1eb;
          color: #c8622a;
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        .btn {
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          padding: 8px 12px;
          background: #fff;
          cursor: pointer;
        }
        .btn.primary {
          background: #c8622a;
          border-color: #c8622a;
          color: #fff;
        }
        .app-body {
          flex: 1;
          display: grid;
          grid-template-columns: 250px 1fr 280px;
          overflow: hidden;
        }
        .sidebar,
        .right {
          background: #fff;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          overflow: auto;
        }
        .right {
          border-right: 0;
          border-left: 1px solid rgba(0, 0, 0, 0.08);
        }
        .section,
        .panel {
          padding: 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .label {
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #9e9b93;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .search {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .model-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .model-item {
          display: flex;
          gap: 8px;
          padding: 8px;
          border-radius: 8px;
        }
        .model-item.active {
          background: #fdf1eb;
        }
        .model-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #eef2fd;
          display: grid;
          place-items: center;
        }
        .model-name {
          font-size: 13px;
          font-weight: 600;
        }
        .model-org {
          font-size: 11px;
          color: #9e9b93;
        }
        .create-agent {
          background: #fdf1eb;
          border: 1px solid rgba(200, 98, 42, 0.25);
          border-radius: 12px;
          padding: 12px;
        }
        .create-title {
          color: #c8622a;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 4px;
        }
        .create-sub {
          font-size: 12px;
          color: #5a5750;
        }
        .center {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .chat-area {
          flex: 1;
          overflow: auto;
          padding: 20px;
        }
        .greet-card {
          max-width: 680px;
          margin: 0 auto;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 24px;
          background: #fff;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.09);
          text-align: center;
        }
        .greet-avatar {
          width: 56px;
          height: 56px;
          border-radius: 999px;
          margin: 0 auto 10px;
          display: grid;
          place-items: center;
          background: #fdf1eb;
          color: #c8622a;
          border: 1px solid rgba(200, 98, 42, 0.25);
        }
        .goal-block {
          margin-top: 14px;
          text-align: left;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 12px;
          background: #f4f2ee;
        }
        .goal-label {
          color: #c8622a;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.07em;
          margin-bottom: 10px;
        }
        .goal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .goal-tile {
          border: 1px solid rgba(0, 0, 0, 0.14);
          border-radius: 12px;
          background: #fff;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          cursor: pointer;
        }
        .goal-tile strong {
          font-size: 12px;
        }
        .goal-tile small {
          font-size: 10px;
          color: #9e9b93;
          text-align: center;
        }
        .input-area {
          padding: 12px 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .input-wrap {
          flex: 1;
          border: 1px solid rgba(0, 0, 0, 0.14);
          border-radius: 12px;
          background: #f4f2ee;
          overflow: hidden;
        }
        textarea {
          width: 100%;
          border: 0;
          resize: none;
          background: transparent;
          padding: 12px;
          outline: none;
          font-family: inherit;
        }
        .tools {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: 8px 10px;
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #9e9b93;
        }
        .send {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 0;
          background: #c8622a;
          color: white;
          cursor: pointer;
        }
        .active-card {
          background: #f4f2ee;
          border: 1px solid rgba(0, 0, 0, 0.14);
          border-radius: 12px;
          padding: 12px;
        }
        .active-head {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .stats div {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          text-align: center;
          padding: 8px 4px;
        }
        .stats strong {
          display: block;
          font-size: 13px;
        }
        .stats span {
          font-size: 10px;
          color: #9e9b93;
        }
        @media (max-width: 1200px) {
          .app-body {
            grid-template-columns: 220px 1fr;
          }
          .right {
            display: none;
          }
        }
        @media (max-width: 900px) {
          .app-body {
            grid-template-columns: 1fr;
          }
          .sidebar {
            display: none;
          }
          .tabs {
            display: none;
          }
          .goal-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
