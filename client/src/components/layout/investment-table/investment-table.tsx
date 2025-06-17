import { Button } from '@/components/ui/button';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useInvestments } from '@/hooks/investments';
import { InvestmentClientModel } from '@/models/client';

export function InvestmentTable() {
  const { data: investments, isLoading } = useInvestments();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Purchase Price</TableHead>
          <TableHead>Purchase Date</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead>Current Price Change</TableHead>
          <TableHead>Current Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments?.map(
          (investment: InvestmentClientModel.InvestmentItem) => (
            <TableRow key={investment.id}>
              <TableCell>{investment.tokenInfo.tokenSymbol}</TableCell>
              <TableCell>{investment.purchaseInfo.quantity}</TableCell>
              <TableCell>{investment.purchaseInfo.purchasePrice}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
