import { Controller, Get, Post, Body } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentDto } from './dto/create-investment.dto';

@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Get()
  findAll() {
    return this.investmentsService.findAll();
  }

  @Post()
  create(@Body() createInvestmentDto: CreateInvestmentDto) {
    console.log('createInvestmentDto', createInvestmentDto);
    return this.investmentsService.create(createInvestmentDto);
  }
}
