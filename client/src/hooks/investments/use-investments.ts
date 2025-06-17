import { useQuery } from '@tanstack/react-query';
import { investmentsView } from '@/store/investments';
import { InvestmentClientModel } from '@/models/client';
import { bindViewMethod } from '@/store/common';

export function useInvestments() {
  return useQuery<InvestmentClientModel.InvestmentItem[], Error>({
    queryKey: ['investments'],
    queryFn: bindViewMethod(investmentsView, 'getInvestments'),
  });
}
