
export enum TransactionStatus {
  PENDING = 'PENDING',
  SEQUENCED = 'SEQUENCED',
  EXECUTED = 'EXECUTED',
  FINALIZED = 'FINALIZED'
}

export interface Transaction {
  id: string;
  slot: number;
  sequenceId: number;
  from: string;
  to: string;
  amount: string; // Encrypted/Private in "real" seismic
  timestamp: number;
  status: TransactionStatus;
  isSimulated?: boolean;
}

export interface WalletState {
  address: string;
  balance: number;
  isConnected: boolean;
}

export interface SeismicState {
  currentSlot: number;
  transactions: Transaction[];
  isHighLoad: boolean;
}
