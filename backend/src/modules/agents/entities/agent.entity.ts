export interface AgentTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  models: string[];      // model chips shown on card
  tools: string[];       // tool chips shown on card
  iconUrl?: string;
  iconEmoji?: string;
  isPopular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentSuggestion {
  id: number;
  text: string;
  category: string;
  iconEmoji?: string;
}

export interface AgentTask {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
}
