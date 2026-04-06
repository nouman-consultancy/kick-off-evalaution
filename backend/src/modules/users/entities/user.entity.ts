import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, example: 'john@example.com' })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiPropertyOptional({ type: String, example: 'John' })
  @Column({ nullable: true })
  firstName?: string;

  @ApiPropertyOptional({ type: String, example: 'Doe' })
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty({ enum: ['user', 'admin'], example: 'user' })
  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @ApiPropertyOptional()
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt?: Date;
}