import { useInvestments } from '@/hooks/investments';
import { InvestmentClientModel } from '@/models/client';

export function InvestmentTable() {
  const { data: investments, isLoading } = useInvestments();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {investments?.map((investment: InvestmentClientModel.InvestmentItem) => (
        <div key={investment.id}>{investment.tokenInfo.tokenSymbol}</div>
      ))}
    </div>
  );
}
