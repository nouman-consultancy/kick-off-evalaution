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

export interface MyAgent {
  id: number;
  name: string;
  model: string;
  tools: number;
  isActive: boolean;
  iconEmoji?: string;
  createdAt: Date;
}

export interface LibraryAgent {
  id: number;
  name: string;
  description: string;
  models: string[];
  tools: string[];
  iconEmoji?: string;
  category: string;
}
