import { QuickAction, WelcomeCard, SuggestionChip, PromptSuggestion } from '../entities/chat.entity';

export const QUICK_ACTIONS_SEED: Omit<QuickAction, 'id'>[] = [
  // Navigation & Tools
  { label: 'Browse Marketplace',    group: 'Navigation & Tools' },
  { label: 'Build an Agent',        group: 'Navigation & Tools' },
  { label: 'How to use Guide',      group: 'Navigation & Tools' },
  { label: 'Prompt Engineering',    group: 'Navigation & Tools' },
  { label: 'View Pricing',          group: 'Navigation & Tools' },
  { label: 'AI Models Analysis',    group: 'Navigation & Tools' },
  // Create & Generate
  { label: 'Create image',          group: 'Create & Generate' },
  { label: 'Generate Audio',        group: 'Create & Generate' },
  { label: 'Create video',          group: 'Create & Generate' },
  { label: 'Create slides',         group: 'Create & Generate' },
  { label: 'Create Infographics',   group: 'Create & Generate' },
  { label: 'Create quiz',           group: 'Create & Generate' },
  { label: 'Create Flashcards',     group: 'Create & Generate' },
  { label: 'Create Mind map',       group: 'Create & Generate' },
  // Analyze & Write
  { label: 'Analyze Data',          group: 'Analyze & Write' },
  { label: 'Write content',         group: 'Analyze & Write' },
  { label: 'Code Generation',       group: 'Analyze & Write' },
  { label: 'Document Analysis',     group: 'Analyze & Write' },
  { label: 'Translate',             group: 'Analyze & Write' },
];

export const WELCOME_CARDS_SEED: Omit<WelcomeCard, 'id'>[] = [
  { emoji: '✍️', title: 'Write content',    subtitle: 'Emails, posts, stories' },
  { emoji: '🎨', title: 'Create images',    subtitle: 'Art, photos, designs' },
  { emoji: '🔧', title: 'Build something',  subtitle: 'Apps, tools, websites' },
  { emoji: '⚡', title: 'Automate work',    subtitle: 'Save hours every week' },
  { emoji: '📊', title: 'Analyse data',     subtitle: 'PDFs, sheets, reports' },
  { emoji: '🔍', title: 'Just exploring',   subtitle: 'Show me what\'s possible' },
];

export const SUGGESTION_CHIPS_SEED: Omit<SuggestionChip, 'id'>[] = [
  { label: 'Use cases',            category: 'Use cases' },
  { label: 'Monitor the situation',category: 'Monitor' },
  { label: 'Create a prototype',   category: 'Create' },
  { label: 'Build a business plan',category: 'Business' },
  { label: 'Create content',       category: 'Content' },
  { label: 'Analyse & research',   category: 'Research' },
  { label: 'Learn something',      category: 'Learn' },
];

export const PROMPT_SUGGESTIONS_SEED: Omit<PromptSuggestion, 'id'>[] = [
  { text: 'Help me find the best AI model for my project',    category: 'Use cases', column: 'left' },
  { text: 'Generate realistic images for my marketing campaign', category: 'Create', column: 'left' },
  { text: 'Create AI agents for workflow automation',         category: 'Use cases', column: 'left' },
  { text: 'I want to build an AI chatbot for my website',     category: 'Use cases', column: 'right' },
  { text: 'Analyse documents and extract key information',    category: 'Research',  column: 'right' },
  { text: 'Add voice and speech recognition to my app',       category: 'Create',    column: 'right' },
];
