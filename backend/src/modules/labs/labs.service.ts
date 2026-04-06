import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { Lab } from './entities/lab.entity';

@Injectable()
export class LabsService {
  private labs: Lab[] = [];
  private idCounter = 1;

  async create(createLabDto: CreateLabDto): Promise<Lab> {
    const lab: Lab = {
      id: this.idCounter++,
      ...createLabDto,
      isActive: createLabDto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.labs.push(lab);
    return lab;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Lab[]; total: number }> {
    const start = (page - 1) * limit;
    const data = this.labs.slice(start, start + limit);
    return { data, total: this.labs.length };
  }

  async findById(id: number): Promise<Lab> {
    const lab = this.labs.find((l) => l.id === id);
    if (!lab) {
      throw new NotFoundException(`Lab with ID ${id} not found`);
    }
    return lab;
  }

  async findByCategory(category: string): Promise<Lab[]> {
    return this.labs.filter((l) => l.category?.toLowerCase() === category.toLowerCase());
  }

  async findActive(): Promise<Lab[]> {
    return this.labs.filter((l) => l.isActive === true);
  }

  async update(id: number, updateLabDto: UpdateLabDto): Promise<Lab> {
    const lab = await this.findById(id);
    Object.assign(lab, updateLabDto, { updatedAt: new Date() });
    return lab;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    this.labs = this.labs.filter((l) => l.id !== id);
  }
}
