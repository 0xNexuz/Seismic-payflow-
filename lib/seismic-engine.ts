
import { Transaction, TransactionStatus } from '../types';

export class SeismicEngine {
  private static instance: SeismicEngine;
  private queue: Transaction[] = [];
  private currentSlot: number = 1024500;
  private seqCounter: number = 1;

  static getInstance() {
    if (!SeismicEngine.instance) {
      SeismicEngine.instance = new SeismicEngine();
    }
    return SeismicEngine.instance;
  }

  createTransaction(from: string, to: string, amount: string, isSimulated: boolean = false): Transaction {
    const tx: Transaction = {
      id: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      slot: this.currentSlot + (isSimulated ? Math.floor(this.seqCounter / 5) : 1),
      sequenceId: this.seqCounter++,
      from,
      to,
      amount,
      timestamp: Date.now(),
      status: TransactionStatus.PENDING,
      isSimulated
    };
    return tx;
  }

  // Simulate deterministic advancement
  advanceSlot() {
    this.currentSlot += 1;
    return this.currentSlot;
  }
}
