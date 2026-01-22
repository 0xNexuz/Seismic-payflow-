
import React, { useState } from 'react';
import { Send, Hash } from 'lucide-react';

interface Props {
  isConnected: boolean;
  onSend: (to: string, amount: string) => void;
}

const PaymentForm: React.FC<Props> = ({ isConnected, onSend }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    onSend(recipient, amount);
    setRecipient('');
    setAmount('');
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Recipient Address</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b3889b]/50 transition-all placeholder:text-slate-600"
              disabled={!isConnected}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Amount (Private)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
            <input 
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#b3889b]/50 transition-all placeholder:text-slate-600"
              disabled={!isConnected}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={!isConnected || !recipient || !amount}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8b6d7a] to-[#b3889b] hover:from-[#7a5c69] hover:to-[#a2778a] disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-[#b3889b]/10 flex items-center justify-center gap-2 mt-2"
        >
          <Send size={18} />
          Send Private Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
