
import React from 'react';
import { Transaction, TransactionStatus } from '../types';
import { Clock, CheckCircle2, Loader2, ArrowRightLeft, ShieldCheck } from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

const ExecutionTimeline: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-xl flex flex-col overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/60">
        <h3 className="text-lg font-bold flex items-center gap-3">
          <Clock className="text-[#b3889b]" /> Deterministic Execution Log
        </h3>
        <span className="text-xs px-3 py-1 bg-[#b3889b]/10 text-[#b3889b] border border-[#b3889b]/20 rounded-full font-bold uppercase tracking-widest">
          Live Sync
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 opacity-50">
            <ArrowRightLeft size={48} strokeWidth={1} />
            <p className="text-sm">No transactions detected in current slots.</p>
          </div>
        ) : (
          transactions.map((tx) => (
            <div 
              key={tx.id} 
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                tx.status === TransactionStatus.FINALIZED 
                ? 'bg-slate-950/40 border-white/5 opacity-80' 
                : 'bg-[#2d262a]/40 border-[#b3889b]/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    tx.status === TransactionStatus.FINALIZED ? 'bg-green-500/10 text-green-500' : 'bg-[#b3889b]/10 text-[#b3889b]'
                  }`}>
                    {tx.status === TransactionStatus.FINALIZED ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[10px] text-slate-500 uppercase tracking-tighter">Tx Hash</span>
                    <span className="mono text-xs text-slate-300">{tx.id}</span>
                  </div>
                </div>
                
                <div className="text-right flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Sequence Slot</span>
                  <span className="mono text-xs font-bold text-[#b3889b]">#{tx.slot} : Seq {tx.sequenceId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <span className="text-[9px] text-slate-500 block mb-1">RECIPIENT (PUBLIC METADATA)</span>
                  <span className="mono text-[11px] text-slate-400">{tx.to}</span>
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#3d2b33]/40 backdrop-blur-[2px] z-10"></div>
                  <span className="text-[9px] text-slate-500 block mb-1 relative z-20">AMOUNT (ENCRYPTED)</span>
                  <span className="mono text-[11px] text-slate-400 blur-[3px] select-none relative z-20">${tx.amount}</span>
                  <div className="absolute bottom-1 right-1 z-30 opacity-40 group-hover:opacity-100 transition-opacity">
                    <ShieldCheck size={10} className="text-[#b3889b]" />
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1">
                  {[
                    TransactionStatus.PENDING, 
                    TransactionStatus.SEQUENCED, 
                    TransactionStatus.EXECUTED, 
                    TransactionStatus.FINALIZED
                  ].map((step) => {
                    const isActive = tx.status === step;
                    const isDone = [TransactionStatus.SEQUENCED, TransactionStatus.EXECUTED, TransactionStatus.FINALIZED].indexOf(tx.status) >= [TransactionStatus.PENDING, TransactionStatus.SEQUENCED, TransactionStatus.EXECUTED, TransactionStatus.FINALIZED].indexOf(step);
                    return (
                      <div key={step} className={`h-1 w-8 rounded-full transition-all duration-700 ${
                        isDone ? 'bg-[#b3889b]' : 'bg-slate-700'
                      }`} />
                    );
                  })}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{tx.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 bg-slate-950/40 border-t border-white/5 text-[10px] text-slate-500 flex justify-between items-center">
        <span>Seismic Sequencer v1.2.0-beta</span>
        <div className="flex gap-4">
           <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Deterministic Queue: OK</span>
           <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Private State Root: SYNCED</span>
        </div>
      </div>
    </div>
  );
};

export default ExecutionTimeline;
