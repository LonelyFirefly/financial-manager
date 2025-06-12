import { InvestmentModel } from 'src/models/investment/investment.model';

type ICreateInvestmentDto = Omit<InvestmentModel.InvestmentItem, 'id'>;

export class CreateInvestmentDto implements ICreateInvestmentDto {
  readonly walletAddress?: string;
  readonly tokenInfo: InvestmentModel.TokenInfo;
  readonly purchaseInfo: InvestmentModel.PurchaseInfo;
  readonly currentStatus: InvestmentModel.CurrentStatus;
  readonly saleInfo?: InvestmentModel.SaleInfo;
}
