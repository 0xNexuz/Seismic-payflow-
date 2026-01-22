
import React, { useState } from 'react';
import { WalletState } from '../types';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface Props {
  wallet: WalletState;
}

const BalanceCard: React.FC<Props> = ({ wallet }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2d262a] via-[#1e161a] to-[#140f11] border border-white/5 shadow-2xl relative overflow-hidden group">
      {/* Decorative Gradient using branding colors */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#b3889b]/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#b3889b]/20 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#b3889b]" /> 
              Private Vault
            </span>
            <h4 className="text-slate-300 font-medium">Available Balance</h4>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 transition-colors"
          >
            {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-4xl font-bold tracking-tighter text-white">
            {showBalance ? `$${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '•••••••'}
          </span>
          <span className="text-slate-500 font-medium">USD</span>
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#b3889b]/20"></div>
              </div>
            ))}
          </div>
          <span className="text-xs text-slate-500 italic">Protected by Seismic Execution Layer</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
