import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { MODELS_SEED_DATA } from './data/models.seed';
import { COMPARISON_MODELS } from './data/comparison.seed';

@Injectable()
export class ModelsService implements OnModuleInit {
  private models: Model[] = [];
  private idCounter = 1;

  onModuleInit() {
    this.models = MODELS_SEED_DATA.map((model) => ({
      id: this.idCounter++,
      ...model,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const model: Model = {
      id: this.idCounter++,
      ...createModelDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.models.push(model);
    return model;
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters?: {
      search?: string;
      providers?: string[];
      tags?: string[];
      minRating?: number;
      maxPrice?: number;
      pricingModel?: string[];
      category?: string;
      labId?: string;
    },
  ): Promise<{ data: Model[]; total: number }> {
    let filtered = [...this.models];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q),
      );
    }

    if (filters?.providers?.length) {
      filtered = filtered.filter((m) =>
        filters.providers!.some((p) => m.provider.toLowerCase() === p.toLowerCase()),
      );
    }

    if (filters?.tags?.length) {
      filtered = filtered.filter((m) =>
        filters.tags!.some((t) =>
          m.tags?.some((mt) => mt.toLowerCase() === t.toLowerCase()),
        ),
      );
    }

    if (filters?.category && filters.category !== 'All') {
      const cat = filters.category.toLowerCase();
      filtered = filtered.filter((m) => {
        if (cat === 'language') return !m.multimodal;
        if (cat === 'vision' || cat === 'image gen') return m.multimodal;
        if (cat === 'code') return m.tags?.some((t) => t.toLowerCase().includes('code'));
        if (cat === 'audio') return m.tags?.some((t) => t.toLowerCase().includes('audio'));
        if (cat === 'open source') return m.tags?.some((t) => t.toLowerCase().includes('open-source'));
        return true;
      });
    }

    if (filters?.minRating) {
      filtered = filtered.filter((m) => (m.rating ?? 0) >= filters.minRating!);
    }

    if (filters?.maxPrice) {
      filtered = filtered.filter((m) => {
        if (!m.pricePerMToken) return true;
        const price = parseFloat(m.pricePerMToken.replace(/[^0-9.]/g, ''));
        return price <= filters.maxPrice!;
      });
    }

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    return { data, total: filtered.length };
  }

  async findById(id: number): Promise<Model> {
    const model = this.models.find((m) => m.id === id);
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async findByProvider(provider: string): Promise<Model[]> {
    return this.models.filter((m) => m.provider.toLowerCase() === provider.toLowerCase());
  }

  async update(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    const model = await this.findById(id);
    Object.assign(model, updateModelDto, { updatedAt: new Date() });
    return model;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    this.models = this.models.filter((m) => m.id !== id);
  }

  getComparison() {
    return COMPARISON_MODELS.slice(0, 10);
  }
}
