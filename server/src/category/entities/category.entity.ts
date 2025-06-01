import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  value: number;

  @Column('enum', {
    enum: ['essential', 'non-essential'],
    default: 'non-essential',
  })
  type: 'essential' | 'non-essential';

  @Column('boolean')
  isArchived: boolean;
}
