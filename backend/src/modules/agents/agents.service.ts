import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentTemplate, AgentSuggestion, AgentTask } from './entities/agent.entity';
import {
  AGENT_TEMPLATES_SEED,
  AGENT_SUGGESTIONS_SEED,
  AGENT_TASKS_SEED,
} from './data/agents.seed';

@Injectable()
export class AgentsService implements OnModuleInit {
  private templates: AgentTemplate[] = [];
  private suggestions: AgentSuggestion[] = [];
  private tasks: AgentTask[] = [];
  private idCounter = 1;

  onModuleInit() {
    this.templates = AGENT_TEMPLATES_SEED.map((t) => ({
      id: this.idCounter++,
      ...t,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    this.suggestions = AGENT_SUGGESTIONS_SEED.map((s, i) => ({ id: i + 1, ...s }));
    this.tasks = AGENT_TASKS_SEED.map((t, i) => ({ id: i + 1, ...t }));
  }

  getTemplates(filters?: { search?: string; category?: string }) {
    let result = [...this.templates];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }
    if (filters?.category && filters.category !== 'All') {
      result = result.filter(
        (t) => t.category.toLowerCase() === filters.category!.toLowerCase(),
      );
    }
    return { data: result, total: result.length };
  }

  getSuggestions(category?: string) {
    let result = [...this.suggestions];
    if (category && category !== 'All') {
      result = result.filter((s) => s.category === category);
    }
    return { data: result, total: result.length };
  }

  getTasks() {
    return { data: this.tasks, total: this.tasks.length };
  }
}
