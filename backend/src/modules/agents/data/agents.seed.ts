import { AgentTemplate, AgentSuggestion, AgentTask } from '../entities/agent.entity';

export const AGENT_TEMPLATES_SEED: Omit<AgentTemplate, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Research Agent',
    description: 'Automates web research and generates structured reports.',
    category: 'Research',
    models: ['GPT-5'],
    tools: ['Web search'],
    iconEmoji: '🔍',
    isPopular: true,
  },
  {
    name: 'Support Agent',
    description: 'Handles tickets, FAQs, and escalates complex issues.',
    category: 'Support',
    models: ['GPT-5'],
    tools: ['Ticketing'],
    iconEmoji: '🎧',
    isPopular: true,
  },
  {
    name: 'Code Review Agent',
    description: 'Reviews PRs, flags bugs, and suggests improvements.',
    category: 'Engineering',
    models: ['Claude Opus 4.6'],
    tools: ['GitHub'],
    iconEmoji: '💻',
    isPopular: false,
  },
  {
    name: 'Data Analysis Agent',
    description: 'Processes spreadsheets and generates visual insights.',
    category: 'Analytics',
    models: ['Gemini'],
    tools: ['Sheets'],
    iconEmoji: '📊',
    isPopular: true,
  },
  {
    name: 'Content Writer Agent',
    description: 'Creates blog posts and marketing copy with brand voice.',
    category: 'Marketing',
    models: ['Claude Opus 4.5'],
    tools: ['Marketing'],
    iconEmoji: '✍️',
    isPopular: false,
  },
  {
    name: 'Sales Outreach Agent',
    description: 'Qualifies leads and sends personalised outreach sequences.',
    category: 'Sales',
    models: ['GPT-5'],
    tools: ['CRM', 'Email'],
    iconEmoji: '📈',
    isPopular: false,
  },
  {
    name: 'Legal Review Agent',
    description: 'Scans contracts for risks and summarises key clauses.',
    category: 'Legal',
    models: ['Claude Opus 4.6'],
    tools: ['PDF'],
    iconEmoji: '⚖️',
    isPopular: false,
  },
  {
    name: 'SEO Audit Agent',
    description: 'Crawls pages, identifies SEO gaps, and generates fixes.',
    category: 'Marketing',
    models: ['GPT-5'],
    tools: ['Web search', 'Analytics'],
    iconEmoji: '🔎',
    isPopular: false,
  },
];

export const AGENT_SUGGESTIONS_SEED: Omit<AgentSuggestion, 'id'>[] = [
  // Analyze & research
  { text: 'Analyse my spreadsheet data and generate insights', category: 'Analyze & research', iconEmoji: '📊' },
  { text: 'Identify and visualise trends in my dataset', category: 'Analyze & research', iconEmoji: '📉' },
  { text: 'Generate a structured analytical report from my data', category: 'Analyze & research', iconEmoji: '📋' },
  { text: 'Generate business insights and recommendations', category: 'Analyze & research', iconEmoji: '💡' },
  // Use cases
  { text: 'Build a customer support bot for my website', category: 'Use cases', iconEmoji: '🎧' },
  { text: 'Create an agent that monitors my competitors', category: 'Use cases', iconEmoji: '👁️' },
  { text: 'Set up an automated email follow-up sequence', category: 'Use cases', iconEmoji: '📧' },
  { text: 'Build a lead qualification agent for my sales team', category: 'Use cases', iconEmoji: '🎯' },
  // Build a business
  { text: 'Help me write a business plan for my startup', category: 'Build a business', iconEmoji: '🏢' },
  { text: 'Create a financial model for my SaaS product', category: 'Build a business', iconEmoji: '💰' },
  { text: 'Draft investor pitch deck talking points', category: 'Build a business', iconEmoji: '📑' },
  // Help me learn
  { text: 'Explain transformer architecture in simple terms', category: 'Help me learn', iconEmoji: '🧠' },
  { text: 'Create a personalised study plan for machine learning', category: 'Help me learn', iconEmoji: '📚' },
  // Monitor the situation
  { text: 'Monitor news about my industry and summarise daily', category: 'Monitor the situation', iconEmoji: '📰' },
  { text: 'Track competitor pricing changes and alert me', category: 'Monitor the situation', iconEmoji: '🔔' },
  // Research
  { text: 'Research the latest papers on LLM reasoning', category: 'Research', iconEmoji: '🔬' },
  { text: 'Find and summarise top 10 tools for AI agents', category: 'Research', iconEmoji: '🔍' },
  // Create content
  { text: 'Write a LinkedIn post about my product launch', category: 'Create content', iconEmoji: '✍️' },
  { text: 'Generate 10 tweet ideas for my AI startup', category: 'Create content', iconEmoji: '🐦' },
];

export const AGENT_TASKS_SEED: Omit<AgentTask, 'id'>[] = [
  { title: 'Dashboard Layout Adjustment', status: 'pending' },
  { title: 'Design agent system prompt', status: 'in_progress' },
  { title: 'Configure tool integrations', status: 'pending' },
];

import { MyAgent, LibraryAgent } from '../entities/agent.entity';

export const MY_AGENTS_SEED: Omit<MyAgent, 'id' | 'createdAt'>[] = [
  { name: 'My Agent', model: 'GPT-5', tools: 0, isActive: true, iconEmoji: '🤖' },
];

export const LIBRARY_AGENTS_SEED: Omit<LibraryAgent, 'id'>[] = [
  {
    name: 'Research Agent',
    description: 'Automates web research, synthesises findings from multiple sources.',
    models: ['GPT-5'],
    tools: ['Web Search', 'Summariser', 'Citation Builder'],
    iconEmoji: '🔍',
    category: 'Research',
  },
  {
    name: 'Customer Support Agent',
    description: 'Handles product questions, order issues, billing inquiries, and technical support.',
    models: ['Claude Sonnet 4.6'],
    tools: ['Ticket System', 'Knowledge Base', 'CRM'],
    iconEmoji: '🎧',
    category: 'Support',
  },
  {
    name: 'Code Review Agent',
    description: 'Reviews pull requests, flags bugs, and suggests improvements.',
    models: ['Claude Opus 4.6'],
    tools: ['GitHub API', 'AST Parser', 'Linter'],
    iconEmoji: '💻',
    category: 'Engineering',
  },
  {
    name: 'Data Analysis Agent',
    description: 'Processes spreadsheets, generates insights, creates visualisations.',
    models: ['GPT-5'],
    tools: ['CSV Parser', 'Chart Builder', 'Statistics'],
    iconEmoji: '📊',
    category: 'Analytics',
  },
  {
    name: 'Content Writer Agent',
    description: 'Creates blog posts, social content, email campaigns, and marketing copy.',
    models: ['Claude Opus 4.5'],
    tools: ['SEO Optimiser', 'Tone Checker', 'Plagiarism Scan'],
    iconEmoji: '✍️',
    category: 'Marketing',
  },
  {
    name: 'Sales Outreach Agent',
    description: 'Automates personalised outreach, follows up with leads, and manages pipeline.',
    models: ['GPT-5 Turbo'],
    tools: ['Email Sender', 'CRM', 'Lead Scorer'],
    iconEmoji: '📈',
    category: 'Sales',
  },
];
