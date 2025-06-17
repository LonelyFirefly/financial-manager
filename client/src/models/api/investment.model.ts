export namespace InvestmentApiModel {
  export interface InvestmentItem {
    id: string;
    walletAddress?: string;
    tokenInfo: TokenInfo;
    purchaseInfo: PurchaseInfo;
    currentStatus: CurrentStatus;
    saleInfo?: SaleInfo;
  }

  export interface TokenInfo {
    tokenSymbol: string;
    tokenContract?: string;
    network?: string;
  }

  export interface PurchaseInfo {
    purchaseDate: Date;
    purchasePrice: number;
    quantity: number;
    trascationFee: number;
  }

  export interface CurrentStatus {
    currentPrice: number;
    currentPriceChange: number;
  }

  export interface SaleInfo {
    soldDate: Date;
    soldPrice: number;
    trascationFee?: number;
  }
}
