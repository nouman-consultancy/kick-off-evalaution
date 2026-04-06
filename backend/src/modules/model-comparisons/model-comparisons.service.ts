import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelComparisonDto } from './dto/create-model-comparison.dto';
import { UpdateModelComparisonDto } from './dto/update-model-comparison.dto';
import { ModelComparison } from './entities/model-comparison.entity';

@Injectable()
export class ModelComparisonsService {
  private comparisons: ModelComparison[] = [];
  private idCounter = 1;

  async create(createDto: CreateModelComparisonDto): Promise<ModelComparison> {
    const comparison: ModelComparison = {
      id: this.idCounter++,
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comparisons.push(comparison);
    return comparison;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: ModelComparison[]; total: number }> {
    const start = (page - 1) * limit;
    const data = this.comparisons.slice(start, start + limit);
    return { data, total: this.comparisons.length };
  }

  async findById(id: number): Promise<ModelComparison> {
    const comparison = this.comparisons.find((c) => c.id === id);
    if (!comparison) {
      throw new NotFoundException(`Comparison with ID ${id} not found`);
    }
    return comparison;
  }

  async findByModel(modelId: number): Promise<ModelComparison[]> {
    return this.comparisons.filter((c) => c.modelId === modelId);
  }

  async findByLab(labId: number): Promise<ModelComparison[]> {
    return this.comparisons.filter((c) => c.labId === labId);
  }

  async findByModelAndLab(modelId: number, labId: number): Promise<ModelComparison | null> {
    return this.comparisons.find((c) => c.modelId === modelId && c.labId === labId) || null;
  }

  async update(id: number, updateDto: UpdateModelComparisonDto): Promise<ModelComparison> {
    const comparison = await this.findById(id);
    Object.assign(comparison, updateDto, { updatedAt: new Date() });
    return comparison;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    this.comparisons = this.comparisons.filter((c) => c.id !== id);
  }
}
