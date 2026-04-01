"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "guide", label: "How to Use" },
  { key: "pricing", label: "Pricing" },
  { key: "prompt", label: "Prompt Guide" },
  { key: "agent", label: "Agent Creation" },
  { key: "reviews", label: "Reviews" },
];

export default function ModelDetailModal({ open, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!open) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon" style={{ background: "#EEF2FD" }}>🧠</div>
          <div className="modal-title-block">
            <h2>GPT-5</h2>
            <p>by OpenAI · Flagship model</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span className="badge-hot">Hot</span>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`mtab ${activeTab === t.key ? "on" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="modal-body">
          {activeTab === "overview" && <OverviewPanel />}
          {activeTab === "guide" && <GuidePanel onCopy={handleCopy} copiedKey={copiedKey} />}
          {activeTab === "pricing" && <PricingPanel />}
          {activeTab === "prompt" && <PromptPanel onCopy={handleCopy} copiedKey={copiedKey} />}
          {activeTab === "agent" && <AgentPanel />}
          {activeTab === "reviews" && <ReviewsPanel />}
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            z-index: 1300;
            display: grid;
            place-items: center;
            padding: 20px;
          }
          .modal {
            background: #fff;
            border-radius: 16px;
            width: 100%;
            max-width: 720px;
            max-height: 85vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
          }
          .modal-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px 16px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }
          .modal-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: grid;
            place-items: center;
            font-size: 24px;
            flex-shrink: 0;
          }
          .modal-title-block {
            flex: 1;
            min-width: 0;
          }
          .modal-title-block h2 {
            font-family: var(--font-syne), sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
            color: #1c1a16;
          }
          .modal-title-block p {
            margin: 2px 0 0;
            font-size: 0.8rem;
            color: #9e9b93;
          }
          .badge-hot {
            font-size: 0.72rem;
            padding: 0.25rem 0.7rem;
            border-radius: 2rem;
            background: #fff0e6;
            color: #c8622a;
            font-weight: 600;
          }
          .modal-close {
            border: 0;
            background: transparent;
            font-size: 18px;
            cursor: pointer;
            color: #9e9b93;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: grid;
            place-items: center;
          }
          .modal-close:hover {
            background: rgba(0, 0, 0, 0.06);
          }
          .modal-tabs {
            display: flex;
            gap: 2px;
            padding: 0 24px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            overflow-x: auto;
          }
          .mtab {
            border: 0;
            background: transparent;
            padding: 12px 14px;
            font-size: 0.82rem;
            color: #9e9b93;
            cursor: pointer;
            white-space: nowrap;
            border-bottom: 2px solid transparent;
            font-weight: 500;
          }
          .mtab.on {
            color: #c8622a;
            border-bottom-color: #c8622a;
            font-weight: 600;
          }
          .mtab:hover {
            color: #1c1a16;
          }
          .modal-body {
            padding: 24px;
            overflow-y: auto;
            flex: 1;
          }
        `}</style>
      </div>
    </div>
  );
}

/* ──────── OVERVIEW PANEL ──────── */
function OverviewPanel() {
  return (
    <div>
      <div className="detail-grid">
        <div className="detail-card">
          <h4>Description</h4>
          <p>GPT-4o is OpenAI&apos;s flagship multimodal model combining text, vision, and audio in one unified architecture. It achieves state-of-the-art performance across language understanding, reasoning, and code generation tasks.</p>
        </div>
        <div className="detail-card">
          <h4>Input / Output</h4>
          <p>
            <strong>Input:</strong> Text, images, audio, PDFs<br />
            <strong>Output:</strong> Text, code, structured data<br />
            <strong>Context:</strong> 128K tokens<br />
            <strong>Max output:</strong> 4,096 tokens<br />
            <strong>Latency:</strong> ~1.2s avg
          </p>
        </div>
      </div>

      <div className="detail-card" style={{ marginBottom: "1rem" }}>
        <h4>Use Cases</h4>
        <div className="use-case-grid">
          {[
            { icon: "✍️", label: "Content writing" },
            { icon: "💻", label: "Code generation" },
            { icon: "🔍", label: "Document analysis" },
            { icon: "🌐", label: "Translation" },
            { icon: "🎓", label: "Education" },
            { icon: "📊", label: "Data analysis" },
          ].map((uc) => (
            <div key={uc.label} className="uc-item">
              <div className="uc-icon">{uc.icon}</div>
              <div className="uc-label">{uc.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-card" style={{ marginBottom: "1rem" }}>
        <h4>Example Prompt → Output</h4>
        <div style={{ marginTop: "0.75rem" }}>
          <div className="section-label">User</div>
          <div className="prompt-user">
            &quot;Summarize this research paper in 3 bullet points and suggest 2 follow-up questions.&quot;
          </div>
          <div className="section-label">GPT-4o</div>
          <div className="prompt-output">
            • The paper introduces a new attention mechanism reducing compute by 40%<br />
            • Results on MMLU show 3.2% improvement over baseline<br />
            • Authors release code and weights under MIT license<br /><br />
            <strong>Follow-up questions:</strong><br />
            1. How does this scale to 100B+ parameter models?<br />
            2. What are the trade-offs at inference time?
          </div>
        </div>
      </div>

      <div className="detail-card">
        <h4>Benchmark Scores</h4>
        <div className="benchmark-grid">
          {[
            { score: "87.2", label: "MMLU" },
            { score: "90.2", label: "HumanEval" },
            { score: "76.6", label: "MATH" },
            { score: "4.7⭐", label: "Rating" },
          ].map((b) => (
            <div key={b.label} className="benchmark-item">
              <strong>{b.score}</strong>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 1rem;
        }
        .detail-card {
          background: #f4f2ee;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .detail-card h4 {
          font-family: var(--font-syne), sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0 0 8px;
          color: #1c1a16;
        }
        .detail-card p {
          font-size: 0.83rem;
          color: #5a5750;
          line-height: 1.6;
          margin: 0;
        }
        .use-case-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 10px;
        }
        .uc-item {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          padding: 10px;
          text-align: center;
        }
        .uc-icon {
          font-size: 1.2rem;
          margin-bottom: 4px;
        }
        .uc-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #1c1a16;
        }
        .section-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #9e9b93;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
        }
        .prompt-user {
          background: #fff0e6;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.83rem;
          margin-bottom: 8px;
        }
        .prompt-output {
          background: #eef2fd;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.83rem;
          line-height: 1.6;
          color: #5a5750;
        }
        .benchmark-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 10px;
        }
        .benchmark-item {
          text-align: center;
          padding: 12px;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
        }
        .benchmark-item strong {
          display: block;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1c1a16;
        }
        .benchmark-item span {
          font-size: 0.7rem;
          color: #9e9b93;
        }
      `}</style>
    </div>
  );
}

/* ──────── HOW TO USE PANEL ──────── */
function GuidePanel({ onCopy, copiedKey }: { onCopy: (k: string, t: string) => void; copiedKey: string | null }) {
  const codeSnippet = `import nexusai
client = nexusai.Client(api_key="YOUR_KEY")
response = client.chat(
    model="gpt-4o",
    messages=[{"role":"user","content":"Hello!"}]
)
print(response.content)`;

  return (
    <div>
      <h4 className="section-title">How to Use This Model</h4>
      <p className="section-desc">Follow these steps to integrate and start getting value from this model in minutes.</p>

      {[
        { num: 1, title: "Get API Access", desc: 'Sign up for a NexusAI account (free). Navigate to Settings → API Keys and create a new key. Your key grants access to all models in the marketplace — no separate accounts needed.' },
        { num: 2, title: "Choose your integration method", desc: 'Options: (a) NexusAI REST API — simple HTTP requests from any language, (b) Official SDK — Python, Node.js, Go packages available, (c) No-code — use the built-in Playground or connect via Zapier / Make.' },
        { num: 3, title: "Understand input and output formats", desc: 'This model accepts text, images, and PDFs as input. Outputs are text and structured JSON. The context window is 128K tokens — roughly 96,000 words. For long documents, consider chunking content into sections.' },
        { num: 4, title: "Set parameters for your use case", desc: 'Key parameters: temperature (0 = deterministic, 1 = creative), max_tokens (controls output length), system (sets model persona and behaviour). Start with temperature 0.3–0.7 for most applications.' },
        { num: 5, title: "Test in the Playground first", desc: 'Before writing code, iterate on your prompt in the built-in Playground. Test edge cases, adjust tone and format, then copy the final prompt into your integration.' },
      ].map((step) => (
        <div key={step.num} className="agent-step">
          <div className="step-num">{step.num}</div>
          <div className="step-content">
            <h5>{step.title}</h5>
            <p>{step.desc}</p>
          </div>
        </div>
      ))}

      <div className="code-block">
        <div className="code-label">Quick Start (Python)</div>
        <pre className="code-pre"><code>{codeSnippet}</code></pre>
        <button
          className="copy-btn"
          onClick={() => onCopy("guide-code", codeSnippet)}
        >
          {copiedKey === "guide-code" ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="tip-box">
        <p><strong>Pro tip:</strong> Start with a small free-tier experiment. Build a minimal working version, measure quality and latency, then scale. Most production apps iterate through 3–5 prompt versions before going live.</p>
      </div>

      <style jsx>{`
        .section-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #1c1a16;
        }
        .section-desc {
          font-size: 0.85rem;
          color: #5a5750;
          margin: 0 0 1.25rem;
          line-height: 1.6;
        }
        .agent-step {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: #c8622a;
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .step-content h5 {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: #1c1a16;
        }
        .step-content p {
          font-size: 0.82rem;
          color: #5a5750;
          line-height: 1.6;
          margin: 0;
        }
        .code-block {
          background: #f4f2ee;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
          position: relative;
        }
        .code-label {
          font-size: 0.68rem;
          color: #9e9b93;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .code-pre {
          font-family: monospace;
          font-size: 0.8rem;
          color: #1e4da8;
          margin: 0;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .copy-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: #fff;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.72rem;
          cursor: pointer;
          color: #5a5750;
        }
        .copy-btn:hover {
          background: #f4f2ee;
        }
        .tip-box {
          background: #e6f5f0;
          border: 1px solid rgba(10, 94, 73, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-top: 0.5rem;
        }
        .tip-box p {
          font-size: 0.83rem;
          color: #0a5e49;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

/* ──────── PRICING PANEL ──────── */
function PricingPanel() {
  return (
    <div>
      <p className="pricing-intro">Choose the plan that fits your usage. All plans include API access, documentation, and community support.</p>

      <div className="pricing-grid">
        <div className="price-card">
          <div className="price-tier">Pay-per-use</div>
          <div className="price-amt">$5</div>
          <div className="price-unit">per 1M input tokens</div>
          <ul>
            <li>No monthly commitment</li>
            <li>$15 per 1M output tokens</li>
            <li>128K context window</li>
            <li>Rate: 500 RPM</li>
            <li>Standard support</li>
          </ul>
        </div>
        <div className="price-card featured">
          <div className="price-tag">Most Popular</div>
          <div className="price-tier">Pro Subscription</div>
          <div className="price-amt">$49</div>
          <div className="price-unit">per month</div>
          <ul>
            <li>$3 per 1M input tokens</li>
            <li>$9 per 1M output tokens</li>
            <li>128K context window</li>
            <li>Rate: 3,000 RPM</li>
            <li>Priority support</li>
            <li>Usage dashboard</li>
          </ul>
        </div>
        <div className="price-card">
          <div className="price-tier">Enterprise</div>
          <div className="price-amt">Custom</div>
          <div className="price-unit">negotiated pricing</div>
          <ul>
            <li>Volume discounts</li>
            <li>Dedicated capacity</li>
            <li>Fine-tuning access</li>
            <li>Unlimited RPM</li>
            <li>SLA &amp; compliance</li>
            <li>Dedicated CSM</li>
          </ul>
        </div>
      </div>

      <div className="free-tier-box">
        <p><strong>Free tier available:</strong> Get 100K tokens/month at no cost. Perfect for prototyping and exploration. No credit card required to get started.</p>
      </div>

      <style jsx>{`
        .pricing-intro {
          font-size: 0.85rem;
          color: #5a5750;
          margin: 0 0 1.25rem;
          line-height: 1.6;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .price-card {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 20px;
          background: #f4f2ee;
          position: relative;
        }
        .price-card.featured {
          border-color: #c8622a;
          background: #fff;
          box-shadow: 0 4px 20px rgba(200, 98, 42, 0.12);
        }
        .price-tag {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: #c8622a;
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .price-tier {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1c1a16;
          margin-bottom: 8px;
        }
        .price-amt {
          font-family: var(--font-syne), sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1c1a16;
          line-height: 1;
        }
        .price-unit {
          font-size: 0.75rem;
          color: #9e9b93;
          margin-bottom: 14px;
        }
        .price-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .price-card li {
          font-size: 0.78rem;
          color: #5a5750;
          padding: 4px 0;
          padding-left: 16px;
          position: relative;
        }
        .price-card li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #0a5e49;
          font-size: 0.7rem;
        }
        .free-tier-box {
          background: #eef2fd;
          border: 1px solid rgba(30, 77, 168, 0.2);
          border-radius: 12px;
          padding: 1rem;
        }
        .free-tier-box p {
          font-size: 0.83rem;
          color: #1e4da8;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

/* ──────── PROMPT GUIDE PANEL ──────── */
function PromptPanel({ onCopy, copiedKey }: { onCopy: (k: string, t: string) => void; copiedKey: string | null }) {
  const prompts = [
    {
      key: "p1",
      label: "Principle 1 — Be explicit about format",
      code: `Summarize the following text in exactly 3 bullet points.\nEach bullet should be one sentence, under 20 words.\nText: {your_text_here}`,
    },
    {
      key: "p2",
      label: "Principle 2 — Assign a role",
      code: `You are a senior software engineer specializing in Python.\nReview the following code for bugs, performance issues,\nand style violations. Be concise and actionable.\n\nCode: {your_code_here}`,
    },
    {
      key: "p3",
      label: "Principle 3 — Chain-of-thought for complex tasks",
      code: `Solve this step by step, showing your reasoning at each stage.\nProblem: {your_problem_here}\n\nThink through: assumptions → approach → calculation → answer`,
    },
    {
      key: "p4",
      label: "Principle 4 — Few-shot examples",
      code: `Classify customer sentiment. Examples:\nInput: "Shipping was fast!" → Output: positive\nInput: "Product broke after a day." → Output: negative\nInput: "It's okay, nothing special." → Output: neutral\n\nNow classify: "{new_review_here}"`,
    },
  ];

  return (
    <div>
      <h4 className="section-title">Prompt Engineering for GPT-4o</h4>
      <p className="section-desc">Well-crafted prompts dramatically improve model output quality. Follow these principles to get the best results every time.</p>

      {prompts.map((p) => (
        <div key={p.key} className="prompt-box">
          <div className="prompt-box-label">{p.label}</div>
          <pre className="prompt-code"><code>{p.code}</code></pre>
          <button
            className="copy-btn"
            onClick={() => onCopy(p.key, p.code)}
          >
            {copiedKey === p.key ? "Copied!" : "Copy"}
          </button>
        </div>
      ))}

      <div className="warning-box">
        <p><strong>Pro tips:</strong> Always specify the desired output length. Use delimiters like triple backticks to separate instructions from content. For JSON output, include a sample structure in the prompt.</p>
      </div>

      <style jsx>{`
        .section-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #1c1a16;
        }
        .section-desc {
          font-size: 0.85rem;
          color: #5a5750;
          margin: 0 0 1.25rem;
          line-height: 1.6;
        }
        .prompt-box {
          background: #f4f2ee;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          position: relative;
        }
        .prompt-box-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1c1a16;
          margin-bottom: 8px;
        }
        .prompt-code {
          font-family: monospace;
          font-size: 0.8rem;
          color: #1e4da8;
          margin: 0;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .copy-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: #fff;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.72rem;
          cursor: pointer;
          color: #5a5750;
        }
        .copy-btn:hover {
          background: #f4f2ee;
        }
        .warning-box {
          background: #fef7e6;
          border: 1px solid rgba(138, 90, 0, 0.2);
          border-radius: 12px;
          padding: 1rem;
          margin-top: 0.5rem;
        }
        .warning-box p {
          font-size: 0.83rem;
          color: #8a5a00;
          line-height: 1.6;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

/* ──────── AGENT CREATION PANEL ──────── */
function AgentPanel() {
  const steps = [
    { num: 1, title: "Define your agent's purpose", desc: 'Clearly state what your agent should do. Example: "A customer support agent that answers product questions, escalates billing issues, and creates Jira tickets for bugs."' },
    { num: 2, title: "Write the system prompt", desc: "The system prompt defines the agent's persona, scope, and behaviour. Be explicit about what the agent should and shouldn't do. Include tone, response length, and escalation rules." },
    { num: 3, title: "Connect tools & APIs", desc: "Equip your agent with tools: web search, database lookup, email sender, calendar API, Slack webhook. GPT-4o supports function calling — define your tools in JSON schema format." },
    { num: 4, title: "Set up memory", desc: "Configure short-term (conversation history) and long-term memory (vector store). This lets the agent remember user preferences and important context across sessions." },
    { num: 5, title: "Test & iterate", desc: "Run the agent through 20+ test scenarios covering edge cases. Refine the system prompt based on failures. Use our Agent Playground to debug and tune before deployment." },
    { num: 6, title: "Deploy & monitor", desc: "Get a shareable endpoint or embed widget. Monitor performance in the NexusAI dashboard — track response quality, latency, token usage, and user satisfaction scores in real time." },
  ];

  return (
    <div>
      <h4 className="section-title">Create an Agent with GPT-4o</h4>
      <p className="section-desc">Follow these steps to build a powerful AI agent in under 10 minutes.</p>

      {steps.map((s) => (
        <div key={s.num} className="agent-step">
          <div className="step-num">{s.num}</div>
          <div className="step-content">
            <h5>{s.title}</h5>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}

      <div style={{ marginTop: "0.5rem", display: "flex", gap: 8 }}>
        <button className="btn-primary">Open Agent Builder →</button>
        <button className="btn-ghost">Ask the Hub</button>
      </div>

      <style jsx>{`
        .section-title {
          font-family: var(--font-syne), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: #1c1a16;
        }
        .section-desc {
          font-size: 0.85rem;
          color: #5a5750;
          margin: 0 0 1.25rem;
          line-height: 1.6;
        }
        .agent-step {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }
        .step-num {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: #c8622a;
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .step-content h5 {
          font-size: 0.88rem;
          font-weight: 700;
          margin: 0 0 4px;
          color: #1c1a16;
        }
        .step-content p {
          font-size: 0.82rem;
          color: #5a5750;
          line-height: 1.6;
          margin: 0;
        }
        .btn-primary {
          background: #c8622a;
          color: #fff;
          border: 0;
          border-radius: 999px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-primary:hover {
          background: #b05524;
        }
        .btn-ghost {
          background: transparent;
          color: #c8622a;
          border: 1px solid rgba(200, 98, 42, 0.3);
          border-radius: 999px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-ghost:hover {
          background: #fff0e6;
        }
      `}</style>
    </div>
  );
}

/* ──────── REVIEWS PANEL ──────── */
function ReviewsPanel() {
  const reviews = [
    { name: "Sarah K.", role: "ML Engineer at Stripe", rating: 5, date: "Mar 2025", text: "GPT-4o has transformed our document processing pipeline. The vision capabilities are remarkably accurate — it handles complex financial statements and extracts structured data with minimal post-processing. Latency is excellent for our use case." },
    { name: "Tariq M.", role: "Founder, EdTech Startup", rating: 4, date: "Feb 2025", text: "Impressive reasoning and creative capabilities. We use it for personalised learning content and student feedback. The main downside is cost at scale — the Pro subscription helps but enterprise pricing is where it becomes truly cost-effective." },
    { name: "Priya N.", role: "Senior Developer at Shopify", rating: 5, date: "Feb 2025", text: "Best coding model we've used. Code review, refactoring suggestions, and debugging explanations are outstanding. The function calling is reliable and JSON mode outputs are always well-structured. Highly recommend for developer tooling." },
  ];

  const stars = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div>
      <div className="rating-summary">
        <div className="rating-big">
          <div className="rating-num">4.7</div>
          <div className="rating-stars">★★★★★</div>
          <div className="rating-count">2,847 reviews</div>
        </div>
        <div className="rating-bars">
          {[
            { label: "5", pct: 72 },
            { label: "4", pct: 20 },
            { label: "3", pct: 6 },
            { label: "1-2", pct: 2 },
          ].map((r) => (
            <div key={r.label} className="bar-row">
              <span className="bar-label">{r.label}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="bar-pct">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {reviews.map((r) => (
        <div key={r.name} className="review-item">
          <div className="review-header">
            <div>
              <div className="reviewer-name">{r.name}</div>
              <div className="reviewer-role">{r.role}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="review-stars">{stars(r.rating)}</div>
              <div className="review-date">{r.date}</div>
            </div>
          </div>
          <div className="review-text">{r.text}</div>
        </div>
      ))}

      <style jsx>{`
        .rating-summary {
          display: flex;
          align-items: center;
          gap: "1.5rem";
          margin-bottom: 1.25rem;
          padding: 1rem;
          background: #f4f2ee;
          border-radius: 12px;
        }
        .rating-big {
          text-align: center;
          min-width: 80px;
        }
        .rating-num {
          font-family: var(--font-syne), sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          color: #1c1a16;
        }
        .rating-stars {
          color: #e8a020;
          font-size: 1.1rem;
          letter-spacing: -1px;
        }
        .rating-count {
          font-size: 0.72rem;
          color: #9e9b93;
          margin-top: 2px;
        }
        .rating-bars {
          flex: 1;
        }
        .bar-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .bar-label {
          font-size: 0.75rem;
          color: #5a5750;
          width: 14px;
        }
        .bar-track {
          flex: 1;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          height: 6px;
          overflow: hidden;
        }
        .bar-fill {
          background: #e8a020;
          height: 100%;
        }
        .bar-pct {
          font-size: 0.72rem;
          color: #9e9b93;
        }
        .review-item {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .review-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .reviewer-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1c1a16;
        }
        .reviewer-role {
          font-size: 0.75rem;
          color: #9e9b93;
        }
        .review-stars {
          color: #e8a020;
          font-size: 0.9rem;
        }
        .review-date {
          font-size: 0.7rem;
          color: #9e9b93;
        }
        .review-text {
          font-size: 0.83rem;
          color: #5a5750;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
