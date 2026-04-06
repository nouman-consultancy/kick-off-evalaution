import { Injectable, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  ChatSession, ChatMessage, QuickAction,
  WelcomeCard, SuggestionChip, PromptSuggestion,
} from './entities/chat.entity';
import {
  QUICK_ACTIONS_SEED, WELCOME_CARDS_SEED,
  SUGGESTION_CHIPS_SEED, PROMPT_SUGGESTIONS_SEED,
} from './data/chat.seed';

// Simple AI response generator (no external API needed)
const AI_RESPONSES: Record<string, string[]> = {
  default: [
    "That's a great question! I can help you with that. Let me think through this carefully...",
    "I understand what you're looking for. Here's my analysis based on the information provided.",
    "Excellent! I'll help you work through this step by step.",
    "Great idea! Here's how I'd approach this problem.",
    "I can definitely assist with that. Let me provide a comprehensive response.",
  ],
  code: [
    "Here's a code solution for your request:\n\n```javascript\n// Your solution here\nconst solution = () => {\n  // Implementation\n};\n```\n\nThis approach is efficient and follows best practices.",
    "I've written the code you need. Here's the implementation with comments explaining each step.",
  ],
  image: [
    "I can help you create images! For image generation, I'd recommend using DALL-E or Midjourney. Here's a prompt you could use...",
  ],
  data: [
    "I'll analyze this data for you. Based on the patterns I can see, here are the key insights:\n\n1. **Trend Analysis**: The data shows a clear upward trend\n2. **Key Metrics**: Focus on the primary KPIs\n3. **Recommendations**: Based on this analysis, I suggest...",
  ],
};

function generateResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes('code') || lower.includes('function') || lower.includes('build')) {
    return AI_RESPONSES.code[Math.floor(Math.random() * AI_RESPONSES.code.length)];
  }
  if (lower.includes('image') || lower.includes('picture') || lower.includes('photo')) {
    return AI_RESPONSES.image[0];
  }
  if (lower.includes('data') || lower.includes('analyse') || lower.includes('analyze')) {
    return AI_RESPONSES.data[0];
  }
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

@Injectable()
export class ChatService implements OnModuleInit {
  private sessions: Map<string, ChatSession> = new Map();
  private quickActions: QuickAction[] = [];
  private welcomeCards: WelcomeCard[] = [];
  private suggestionChips: SuggestionChip[] = [];
  private promptSuggestions: PromptSuggestion[] = [];

  onModuleInit() {
    this.quickActions = QUICK_ACTIONS_SEED.map((a, i) => ({ id: i + 1, ...a }));
    this.welcomeCards = WELCOME_CARDS_SEED.map((c, i) => ({ id: i + 1, ...c }));
    this.suggestionChips = SUGGESTION_CHIPS_SEED.map((c, i) => ({ id: i + 1, ...c }));
    this.promptSuggestions = PROMPT_SUGGESTIONS_SEED.map((p, i) => ({ id: i + 1, ...p }));
  }

  // ── session management ────────────────────────────────────────────────────

  createSession(modelId: number, modelName: string): ChatSession {
    const session: ChatSession = {
      id: uuidv4(),
      modelId,
      modelName,
      messages: [],
      createdAt: new Date(),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.get(sessionId);
  }

  // ── send message + generate reply ─────────────────────────────────────────

  sendMessage(sessionId: string, content: string): { session: ChatSession; reply: ChatMessage } {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = this.createSession(0, 'GPT-5');
      this.sessions.set(session.id, session);
    }

    const userMsg: ChatMessage = {
      id: uuidv4(), role: 'user', content, timestamp: new Date(),
    };
    session.messages.push(userMsg);

    const replyContent = generateResponse(content);
    const assistantMsg: ChatMessage = {
      id: uuidv4(), role: 'assistant', content: replyContent, timestamp: new Date(),
    };
    session.messages.push(assistantMsg);

    return { session, reply: assistantMsg };
  }

  // ── static data ───────────────────────────────────────────────────────────

  getQuickActions() { return this.quickActions; }
  getWelcomeCards() { return this.welcomeCards; }
  getSuggestionChips() { return this.suggestionChips; }
  getPromptSuggestions(category?: string) {
    if (!category || category === 'All') return this.promptSuggestions;
    return this.promptSuggestions.filter(p => p.category === category);
  }
}
