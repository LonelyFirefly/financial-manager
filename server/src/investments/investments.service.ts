import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investments } from './entities/investments.entity';
import { CreateInvestmentDto } from './dto/create-investment.dto';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectRepository(Investments)
    private readonly investmentsRepository: Repository<Investments>,
  ) {}

  findAll() {
    return this.investmentsRepository.find();
  }

  create(createInvestmentDto: CreateInvestmentDto) {
    return this.investmentsRepository.save(createInvestmentDto);
  }
}
