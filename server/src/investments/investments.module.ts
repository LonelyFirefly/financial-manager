import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investments } from './entities/investments.entity';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService],
  imports: [TypeOrmModule.forFeature([Investments])],
})
export class InvestmentsModule {}
