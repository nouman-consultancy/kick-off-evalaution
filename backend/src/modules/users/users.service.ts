import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];
  private idCounter = 1;

  async onModuleInit() {
    // seed a demo user so login works out of the box
    const hashed = await bcrypt.hash('demo1234', 10);
    this.users = [
      {
        id: this.idCounter++,
        email: 'demo@nexusai.com',
        password: hashed,
        firstName: 'Demo',
        lastName: 'User',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: this.idCounter++,
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role || 'user',
      avatar: createUserDto.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number }> {
    const start = (page - 1) * limit;
    const data = this.users.slice(start, start + limit);
    return { data, total: this.users.length };
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto, { updatedAt: new Date() });
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    this.users = this.users.filter((u) => u.id !== id);
  }
}