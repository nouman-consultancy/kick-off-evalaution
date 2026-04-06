export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  modelId: number;
  modelName: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export interface QuickAction {
  id: number;
  label: string;
  group: string;
  icon?: string;
}

export interface WelcomeCard {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
}

export interface SuggestionChip {
  id: number;
  label: string;
  category: string;
}

export interface PromptSuggestion {
  id: number;
  text: string;
  category: string;
  column: 'left' | 'right';
}
