import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ResearchPaper } from './entities/research-paper.entity';
import { RESEARCH_FEED_SEED } from './data/research-feed.seed';

@Injectable()
export class ResearchFeedService implements OnModuleInit {
  private papers: ResearchPaper[] = [];
  private idCounter = 1;

  onModuleInit() {
    this.papers = RESEARCH_FEED_SEED.map((p) => ({
      id: this.idCounter++,
      ...p,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  findAll(filters?: {
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): { data: ResearchPaper[]; total: number; weekCount: number } {
    let result = [...this.papers];

    if (filters?.tag && filters.tag !== 'All') {
      result = result.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === filters.tag!.toLowerCase()),
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.source.toLowerCase().includes(q) ||
          p.overview.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const total = result.length;

    // week count — papers from last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = this.papers.filter((p) => new Date(p.date) >= weekAgo).length;

    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 20;
    const start = (page - 1) * limit;
    const data = result.slice(start, start + limit);

    return { data, total, weekCount };
  }

  findById(id: number): ResearchPaper {
    const paper = this.papers.find((p) => p.id === id);
    if (!paper) throw new NotFoundException(`Paper with ID ${id} not found`);
    return paper;
  }
}
