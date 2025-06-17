import { InvestmentApiModel } from '@/models/api';
import { api } from '@/api';
import { RESOURCES } from './investments.resources';
import { once } from 'lodash';

class InvestmentsService {
  async getInvestments(): Promise<InvestmentApiModel.InvestmentItem[]> {
    const response = await api.get<InvestmentApiModel.InvestmentItem[]>(
      RESOURCES.LIST
    );
    return response.data;
  }

  async createInvestment(
    investment: Omit<InvestmentApiModel.InvestmentItem, 'id'>
  ): Promise<InvestmentApiModel.InvestmentItem> {
    const response = await api.post<InvestmentApiModel.InvestmentItem>(
      RESOURCES.CREATE,
      investment
    );
    return response.data;
  }
}
export const investmentsService = once(() => new InvestmentsService())();
