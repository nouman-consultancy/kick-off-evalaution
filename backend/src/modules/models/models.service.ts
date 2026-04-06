import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { MODELS_SEED_DATA } from './data/models.seed';

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

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Model[]; total: number }> {
    const start = (page - 1) * limit;
    const data = this.models.slice(start, start + limit);
    return { data, total: this.models.length };
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
}
