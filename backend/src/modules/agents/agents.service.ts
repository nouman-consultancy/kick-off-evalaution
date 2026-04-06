import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentTemplate, AgentSuggestion, AgentTask, MyAgent, LibraryAgent } from './entities/agent.entity';
import {
  AGENT_TEMPLATES_SEED,
  AGENT_SUGGESTIONS_SEED,
  AGENT_TASKS_SEED,
  MY_AGENTS_SEED,
  LIBRARY_AGENTS_SEED,
} from './data/agents.seed';

@Injectable()
export class AgentsService implements OnModuleInit {
  private templates: AgentTemplate[] = [];
  private suggestions: AgentSuggestion[] = [];
  private tasks: AgentTask[] = [];
  private myAgents: MyAgent[] = [];
  private libraryAgents: LibraryAgent[] = [];
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
    this.myAgents = MY_AGENTS_SEED.map((a, i) => ({ id: i + 1, ...a, createdAt: new Date() }));
    this.libraryAgents = LIBRARY_AGENTS_SEED.map((a, i) => ({ id: i + 1, ...a }));
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

  getMyAgents() {
    return { data: this.myAgents, total: this.myAgents.length };
  }

  getLibraryAgents(search?: string) {
    let result = [...this.libraryAgents];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q),
      );
    }
    return { data: result, total: result.length };
  }
}
