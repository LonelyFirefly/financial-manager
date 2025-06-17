import { once } from 'lodash';
import { InvestmentClientModel } from '@/models/client';
import { investmentsService } from '../service';

export class InvestmentsView {
  async getInvestments(): Promise<InvestmentClientModel.InvestmentItem[]> {
    return await investmentsService.getInvestments();
  }

  async createInvestment(
    investment: Omit<InvestmentClientModel.InvestmentItem, 'id'>
  ): Promise<InvestmentClientModel.InvestmentItem> {
    return await investmentsService.createInvestment(investment);
  }
}

export const investmentsView = once(() => new InvestmentsView())();
