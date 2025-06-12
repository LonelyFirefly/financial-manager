import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Embedded value objects (no @Entity decorator needed)
export class TokenInfo {
  @Column()
  tokenSymbol: string;

  @Column({ nullable: true })
  tokenContract: string;

  @Column({ nullable: true })
  network: string;
}

export class PurchaseInfo {
  @Column()
  purchaseDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  trascationFee: number;
}

export class CurrentStatus {
  @Column('decimal', { precision: 10, scale: 2 })
  currentPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  currentPriceChange: number;
}

export class SaleInfo {
  @Column()
  soldDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  soldPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  trascationFee: number;
}

@Entity()
export class Investments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  walletAddress: string;

  // Option 1: Store as JSON (Simpler, PostgreSQL/MySQL compatible)
  @Column('json')
  tokenInfo: {
    tokenSymbol: string;
    tokenContract?: string;
    network?: string;
  };

  @Column('json')
  purchaseInfo: {
    purchaseDate: Date;
    purchasePrice: number;
    quantity: number;
    trascationFee?: number;
  };

  @Column('json')
  currentStatus: {
    currentPrice: number;
    currentPriceChange: number;
  };

  @Column('json', { nullable: true })
  saleInfo?: {
    soldDate: Date;
    soldPrice: number;
    trascationFee?: number;
  };
}
