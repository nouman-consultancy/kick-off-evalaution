"use client";

import { useState } from "react";
import Link from "next/link";

const researchFeed = [
  {
    month: "Mar",
    day: "26",
    source: "Google DeepMind",
    title: "Gemini 2.5 Pro achieves new SOTA on reasoning benchmarks",
    desc: "Scores 83.2% on AIME 2025 math competition, outperforming all prior models on reasoning-intensive tasks.",
    category: "language",
  },
  {
    month: "Mar",
    day: "22",
    source: "MIT CSAIL",
    title: "Scaling laws for multimodal models: new empirical findings",
    desc: "Researchers demonstrate that multimodal scaling follows different power laws than unimodal, with vision-language models showing steeper improvement curves.",
    category: "language",
  },
  {
    month: "Mar",
    day: "18",
    source: "Anthropic",
    title: "Claude Opus 4.6 introduces extended thinking with tool use",
    desc: "New capability allows the model to interleave reasoning steps with API calls, enabling more sophisticated agent workflows.",
    category: "language",
  },
  {
    month: "Mar",
    day: "14",
    source: "Meta AI",
    title: "Llama 4 Maverick open-sourced with 400B parameters",
    desc: "Meta releases its most capable open model yet, matching GPT-4 Turbo on code generation while running 3x faster on consumer hardware.",
    category: "code",
  },
  {
    month: "Mar",
    day: "10",
    source: "OpenAI",
    title: "GPT-5 introduces native computer-use agents",
    desc: "New built-in capability for controlling desktop applications, browsing the web, and executing multi-step workflows autonomously.",
    category: "language",
  },
  {
    month: "Mar",
    day: "7",
    source: "Stability AI",
    title: "Stable Diffusion 4 achieves photorealistic image generation",
    desc: "New diffusion model with 12B parameters generates images indistinguishable from photographs in blind user studies.",
    category: "image",
  },
  {
    month: "Mar",
    day: "3",
    source: "DeepSeek",
    title: "DeepSeek-R2 sets new MATH benchmark record",
    desc: "Reasoning-focused model achieves 92.1% on competition-level mathematics, surpassing all proprietary models.",
    category: "language",
  },
  {
    month: "Feb",
    day: "28",
    source: "Mistral AI",
    title: "Mistral Large 2 adds 32K context with function calling",
    desc: "European AI lab releases update with improved code generation, structured output, and native function calling support.",
    category: "code",
  },
  {
    month: "Feb",
    day: "24",
    source: "ElevenLabs",
    title: "Voice cloning reaches human-level quality with 3 seconds of audio",
    desc: "New speech synthesis model produces indistinguishable voice clones from minimal reference audio, raising new possibilities and concerns.",
    category: "audio",
  },
  {
    month: "Feb",
    day: "20",
    source: "Google DeepMind",
    title: "AlphaFold 3 predicts all molecular interactions in cells",
    desc: "Breakthrough protein structure model now predicts DNA, RNA, and small molecule interactions with atomic-level accuracy.",
    category: "language",
  },
  {
    month: "Feb",
    day: "15",
    source: "NVIDIA",
    title: "Nemotron-4 340B achieves SOTA on coding benchmarks",
    desc: "NVIDIA's largest model demonstrates exceptional code generation across 20+ programming languages with strong reasoning.",
    category: "code",
  },
  {
    month: "Feb",
    day: "10",
    source: "Alibaba (Qwen)",
    title: "Qwen 2.5 VL processes hour-long videos natively",
    desc: "New vision-language model can understand and reason about hour-long video content without frame sampling or chunking.",
    category: "vision",
  },
];

const filterCategories = [
  { key: "all", label: "All" },
  { key: "language", label: "Language" },
  { key: "vision", label: "Vision" },
  { key: "code", label: "Code" },
  { key: "image", label: "Image Gen" },
  { key: "audio", label: "Audio" },
];

const labs = [
  { key: "all", icon: "🌐", label: "All Labs" },
  { key: "OpenAI", icon: "🧠", label: "OpenAI" },
  { key: "Anthropic", icon: "👑", label: "Anthropic" },
  { key: "Google DeepMind", icon: "🔬", label: "Google DeepMind" },
  { key: "Meta", icon: "🦙", label: "Meta" },
  { key: "DeepSeek", icon: "💻", label: "DeepSeek" },
  { key: "Mistral AI", icon: "🌀", label: "Mistral AI" },
  { key: "NVIDIA", icon: "🟢", label: "NVIDIA" },
  { key: "Stability AI", icon: "🎨", label: "Stability AI" },
  { key: "ElevenLabs", icon: "🔊", label: "ElevenLabs" },
  { key: "Alibaba", icon: "🀄", label: "Alibaba (Qwen)" },
];

const trendingModels = [
  { icon: "🧠", name: "GPT-5", org: "OpenAI", badge: "Hot", rating: "4.9", price: "$7.50/1M tk", desc: "Native computer-use agents, advanced reasoning, 2M context." },
  { icon: "👑", name: "Claude Opus 4.6", org: "Anthropic", badge: "New", rating: "4.8", price: "$15/1M tk", desc: "Extended thinking with tool use, exceptional writing quality." },
  { icon: "🔬", name: "Gemini 2.5 Pro", org: "Google", badge: "Rising", rating: "4.7", price: "$3.50/1M tk", desc: "Deep research, long-context analysis, strong multimodal." },
  { icon: "🦙", name: "Llama 4 Maverick", org: "Meta", badge: "Open", rating: "4.6", price: "Free", desc: "400B open-source model matching GPT-4 Turbo performance." },
];

export default function DiscoverNewPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeLab, setActiveLab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredFeed = researchFeed.filter((item) => {
    const matchCategory = activeFilter === "all" || item.category === activeFilter;
    const matchLab = activeLab === "all" || item.source === activeLab;
    const matchSearch =
      !search.trim() ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchLab && matchSearch;
  });

  return (
    <div className="page">
      <div className="app-nav">
        <div className="logo-wrap">
          <Link href="/" className="logo-link">
            <div className="logo-box">◇</div>
            <span className="logo-text">NexusAI</span>
          </Link>
        </div>
        <div className="tabs">
          <Link href="/chat-hub" className="tab">💬 Chat Hub</Link>
          <Link href="/marketplace" className="tab">🛍 Marketplace</Link>
          <Link href="/agents" className="tab">🤖 Agents</Link>
          <span className="tab active">🔬 Discover New</span>
        </div>
        <div className="actions">
          <button className="btn ghost">Sign in</button>
          <button className="btn primary">Try free →</button>
        </div>
      </div>

      <div className="dn-header">
        <div className="dn-header-top">
          <div>
            <h2 className="dn-title">AI Research Feed</h2>
            <p className="dn-subtitle">Stay updated with the latest breakthroughs, model releases, and research papers in AI.</p>
          </div>
          <div className="dn-search-wrap">
            <svg className="dn-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="dn-search"
              type="text"
              placeholder="Search articles, models, labs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="dn-filters">
          {filterCategories.map((f) => (
            <button
              key={f.key}
              className={`dn-filter ${activeFilter === f.key ? "on" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="dn-labs-bar">
          <span className="dn-labs-label">🏛 AI Labs</span>
          <div className="dn-labs-scroll">
            {labs.map((lab) => (
              <button
                key={lab.key}
                className={`dn-lab-pill ${activeLab === lab.key ? "on" : ""}`}
                onClick={() => setActiveLab(lab.key)}
              >
                <span className="dn-lab-icon">{lab.icon}</span>
                {lab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dn-body">
        <div className="dn-feed">
          {filteredFeed.length === 0 && (
            <div className="dn-empty">
              <div className="dn-empty-icon">🔍</div>
              <div className="dn-empty-text">No results found</div>
              <div className="dn-empty-sub">Try adjusting your filters or search terms</div>
            </div>
          )}
          {filteredFeed.map((item, i) => (
            <div key={`${item.title}-${i}`} className="dn-card">
              <div className="dn-card-date">
                <div className="dn-card-month">{item.month}</div>
                <div className="dn-card-day">{item.day}</div>
              </div>
              <div className="dn-card-content">
                <div className="dn-card-source">{item.source}</div>
                <h4 className="dn-card-title">{item.title}</h4>
                <p className="dn-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="dn-sidebar">
          <div className="dn-sidebar-section">
            <div className="dn-sidebar-label">Trending Models</div>
            {trendingModels.map((m) => (
              <div key={m.name} className="dn-model-card">
                <div className="dn-model-top">
                  <div className="dn-model-icon">{m.icon}</div>
                  <div className="dn-model-info">
                    <div className="dn-model-name">{m.name}</div>
                    <div className="dn-model-org">{m.org}</div>
                  </div>
                  <span className={`dn-model-badge badge-${m.badge.toLowerCase()}`}>{m.badge}</span>
                </div>
                <div className="dn-model-desc">{m.desc}</div>
                <div className="dn-model-footer">
                  <span className="dn-model-rating">⭐ {m.rating}</span>
                  <span className="dn-model-price">{m.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="dn-sidebar-section">
            <div className="dn-sidebar-label">Quick Guides</div>
            <div className="dn-guide-list">
              <button className="dn-guide-btn">
                <span className="dn-guide-icon">📐</span>
                Prompt engineering tips
              </button>
              <button className="dn-guide-btn">
                <span className="dn-guide-icon">🤖</span>
                Agent creation guide
              </button>
              <button className="dn-guide-btn">
                <span className="dn-guide-icon">💰</span>
                Pricing comparison
              </button>
            </div>
          </div>

          <div className="dn-tip-box">
            <div className="dn-tip-title">✦ Tip</div>
            <div className="dn-tip-text">
              Click any article to start a conversation about that topic with our AI guide.
            </div>
          </div>
        </div>
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
        .logo-wrap {
          display: flex;
          align-items: center;
        }
        .logo-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: inherit;
        }
        .logo-box {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: #c8622a;
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: 900;
          font-size: 14px;
        }
        .logo-text {
          font-family: var(--font-syne), sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.03em;
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
          font-size: 13px;
          text-decoration: none;
        }
        .tab.active {
          background: #e6f0ff;
          color: #1e4da8;
          font-weight: 600;
        }
        .tab:hover:not(.active) {
          background: rgba(0, 0, 0, 0.04);
        }
        .actions {
          display: flex;
          gap: 8px;
        }
        .btn {
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          padding: 8px 14px;
          background: #fff;
          cursor: pointer;
          font-size: 13px;
        }
        .btn.primary {
          background: #c8622a;
          border-color: #c8622a;
          color: #fff;
        }
        .btn.ghost {
          background: transparent;
          border-color: rgba(0, 0, 0, 0.14);
          color: #5a5750;
        }

        .dn-header {
          background: #fff;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .dn-header-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 16px;
        }
        .dn-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
        }
        .dn-subtitle {
          font-size: 0.88rem;
          color: #5a5750;
          margin: 0;
          line-height: 1.5;
        }
        .dn-search-wrap {
          position: relative;
          flex-shrink: 0;
          width: 320px;
        }
        .dn-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #9e9b93;
        }
        .dn-search {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          border-radius: 999px;
          font-size: 0.85rem;
          font-family: inherit;
          background: #f4f2ee;
          outline: none;
          transition: border-color 0.15s;
        }
        .dn-search:focus {
          border-color: #c8622a;
        }
        .dn-filters {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .dn-filter {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: transparent;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          color: #5a5750;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .dn-filter.on {
          background: #c8622a;
          border-color: #c8622a;
          color: #fff;
        }
        .dn-filter:hover:not(.on) {
          border-color: #c8622a;
          color: #c8622a;
        }
        .dn-labs-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }
        .dn-labs-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9e9b93;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .dn-labs-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          flex-wrap: nowrap;
        }
        .dn-lab-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: transparent;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          color: #5a5750;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          transition: all 0.15s;
        }
        .dn-lab-pill.on {
          background: #fff0e6;
          border-color: rgba(200, 98, 42, 0.35);
          color: #c8622a;
          font-weight: 600;
        }
        .dn-lab-pill:hover:not(.on) {
          border-color: rgba(200, 98, 42, 0.35);
        }
        .dn-lab-icon {
          font-size: 0.85rem;
        }

        .dn-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 0;
          overflow: hidden;
        }
        .dn-feed {
          padding: 20px 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dn-card {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          gap: 18px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dn-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-color: rgba(200, 98, 42, 0.25);
        }
        .dn-card-date {
          flex-shrink: 0;
          width: 52px;
          text-align: center;
        }
        .dn-card-month {
          font-size: 0.68rem;
          color: #9e9b93;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .dn-card-day {
          font-family: var(--font-syne), sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1;
          color: #1c1a16;
        }
        .dn-card-content {
          flex: 1;
          min-width: 0;
        }
        .dn-card-source {
          font-size: 0.7rem;
          color: #9e9b93;
          margin-bottom: 4px;
        }
        .dn-card-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
          color: #1c1a16;
          line-height: 1.35;
        }
        .dn-card-desc {
          font-size: 0.82rem;
          color: #5a5750;
          line-height: 1.5;
          margin: 0;
        }

        .dn-empty {
          text-align: center;
          padding: 60px 20px;
        }
        .dn-empty-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
        }
        .dn-empty-text {
          font-family: var(--font-syne), sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1c1a16;
          margin-bottom: 4px;
        }
        .dn-empty-sub {
          font-size: 0.85rem;
          color: #9e9b93;
        }

        .dn-sidebar {
          background: #fff;
          border-left: 1px solid rgba(0, 0, 0, 0.08);
          padding: 20px;
          overflow-y: auto;
        }
        .dn-sidebar-section {
          margin-bottom: 20px;
        }
        .dn-sidebar-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #9e9b93;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .dn-model-card {
          background: #f4f2ee;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 8px;
          transition: border-color 0.15s;
          cursor: pointer;
        }
        .dn-model-card:hover {
          border-color: rgba(200, 98, 42, 0.3);
        }
        .dn-model-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .dn-model-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #eef2fd;
          display: grid;
          place-items: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .dn-model-info {
          flex: 1;
          min-width: 0;
        }
        .dn-model-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1c1a16;
        }
        .dn-model-org {
          font-size: 0.7rem;
          color: #9e9b93;
        }
        .dn-model-badge {
          font-size: 0.65rem;
          padding: 2px 8px;
          border-radius: 999px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .badge-hot {
          background: #fff0e6;
          color: #c8622a;
        }
        .badge-new {
          background: #e6f5f0;
          color: #0a5e49;
        }
        .badge-rising {
          background: #eef2fd;
          color: #1e4da8;
        }
        .badge-open {
          background: #fef7e6;
          color: #8a5a00;
        }
        .dn-model-desc {
          font-size: 0.75rem;
          color: #5a5750;
          line-height: 1.45;
          margin-bottom: 6px;
        }
        .dn-model-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dn-model-rating {
          font-size: 0.72rem;
          color: #5a5750;
        }
        .dn-model-price {
          font-size: 0.72rem;
          font-weight: 600;
          color: #1c1a16;
        }

        .dn-guide-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .dn-guide-btn {
          text-align: left;
          padding: 8px 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          font-size: 0.78rem;
          font-family: inherit;
          color: #5a5750;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
        }
        .dn-guide-btn:hover {
          color: #c8622a;
          border-color: rgba(200, 98, 42, 0.3);
        }
        .dn-guide-icon {
          font-size: 0.9rem;
        }

        .dn-tip-box {
          background: rgba(200, 98, 42, 0.08);
          border: 1px solid rgba(200, 98, 42, 0.2);
          border-radius: 12px;
          padding: 14px;
        }
        .dn-tip-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1c1a16;
          margin-bottom: 4px;
        }
        .dn-tip-text {
          font-size: 0.78rem;
          color: #5a5750;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .dn-body {
            grid-template-columns: 1fr;
          }
          .dn-sidebar {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .tabs {
            display: none;
          }
          .dn-header-top {
            flex-direction: column;
          }
          .dn-search-wrap {
            width: 100%;
          }
          .dn-labs-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
