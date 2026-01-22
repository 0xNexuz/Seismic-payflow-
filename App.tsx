
import React, { useState, useCallback, useRef } from 'react';
import { WalletState, Transaction, TransactionStatus } from './types';
import { SeismicEngine } from './lib/seismic-engine';
import WaveBackground from './components/WaveBackground';
import BalanceCard from './components/BalanceCard';
import PaymentForm from './components/PaymentForm';
import ExecutionTimeline from './components/ExecutionTimeline';
import { ShieldCheck, Zap, Activity, Info, Code } from 'lucide-react';

const SeismicLogo = () => (
  <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* The main faceted rock shape mimicking the provided image */}
    <path d="M48 5L75 25L88 85L52 115L15 90L10 60L48 5Z" fill="#b3889b" />
    {/* Top Right Facet (Lighter) */}
    <path d="M48 5L75 25L55 45L48 5Z" fill="#c9a7b8" />
    {/* Main Front Facet (Base Mauve) */}
    <path d="M48 5L55 45L42 90L15 90L10 60L48 5Z" fill="#b3889b" />
    {/* Right Edge Facet (Shadow) */}
    <path d="M75 25L88 85L52 115L42 90L55 45L75 25Z" fill="#8b6d7a" />
    {/* Bottom Facet (Darkest) */}
    <path d="M15 90L42 90L52 115L15 90Z" fill="#6d5460" />
    {/* Highlight Detail */}
    <path d="M48 5L55 45L42 90L48 5Z" fill="#be99ab" opacity="0.6" />
  </svg>
);

const App: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: '0x71C...49A2',
    balance: 12500.00,
    isConnected: false
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isHighLoad, setIsHighLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const engine = SeismicEngine.getInstance();

  const connectWallet = () => setWallet(prev => ({ ...prev, isConnected: true }));

  const executePayment = useCallback((to: string, amount: string, isSimulated: boolean = false) => {
    const newTx = engine.createTransaction(wallet.address, to, amount, isSimulated);
    
    setTransactions(prev => [newTx, ...prev]);

    setTimeout(() => {
      setTransactions(prev => prev.map(t => t.id === newTx.id ? { ...t, status: TransactionStatus.SEQUENCED } : t));
    }, 800);

    setTimeout(() => {
      setTransactions(prev => prev.map(t => t.id === newTx.id ? { ...t, status: TransactionStatus.EXECUTED } : t));
      if (!isSimulated) {
        setWallet(prev => ({ ...prev, balance: prev.balance - parseFloat(amount) }));
      }
    }, 2000);

    setTimeout(() => {
      setTransactions(prev => prev.map(t => t.id === newTx.id ? { ...t, status: TransactionStatus.FINALIZED } : t));
    }, 3500);
  }, [wallet.address, engine]);

  const handleSimulateLoad = () => {
    setIsHighLoad(true);
    const mockRecipients = ['0x882...11B', '0x992...22C', '0xAA1...33D'];
    
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        executePayment(
          mockRecipients[i % mockRecipients.length], 
          (Math.random() * 100).toFixed(2), 
          true
        );
      }, i * 50);
    }

    setTimeout(() => setIsHighLoad(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#140f11]">
      <WaveBackground />
      
      <nav className="relative z-10 px-8 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-12 flex items-center justify-center">
            <SeismicLogo />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#b3889b]">
            SEISMIC PAYFLOW
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
          >
            <Code size={16} className="text-[#b3889b]" /> View Contract
          </button>
          
          {!wallet.isConnected ? (
            <button 
              onClick={connectWallet}
              className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm mono text-slate-300">{wallet.address}</span>
            </div>
          )}
        </div>
      </nav>

      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 px-8 py-10 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-5 space-y-6">
          <BalanceCard wallet={wallet} />
          <PaymentForm 
            isConnected={wallet.isConnected} 
            onSend={(to, amount) => executePayment(to, amount)} 
          />
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-white/5 backdrop-blur-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <Activity size={18} className="text-[#b3889b]" />
                Network Reliability
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isHighLoad} 
                  onChange={handleSimulateLoad}
                  disabled={!wallet.isConnected}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8b6d7a]"></div>
              </label>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Toggle high-load simulation to witness Seismic's deterministic ordering. Unlike standard chains, bursts of transactions never fail due to reordering.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <ExecutionTimeline transactions={transactions} />
        </div>
      </main>

      <div className="relative z-10 px-8 py-6 flex flex-wrap gap-6 items-center border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-[#b3889b]" />
          <span>Private Balance Management</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Zap size={14} className="text-yellow-500" />
          <span>Deterministic Execution</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info size={14} className="text-[#8b6d7a]" />
          <span>Zero-Knowledge Proofs (Simulated)</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/50">
              <h3 className="font-bold flex items-center gap-2">
                <Code className="text-[#b3889b]" /> SeismicPay.rs
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">Close</button>
            </div>
            <div className="p-6 overflow-y-auto bg-black/40 mono text-sm text-[#e0d4d9]/80 leading-relaxed whitespace-pre">
{`#[seismic_contract]
pub struct SeismicPay {
    #[private_state]
    balances: Mapping<Address, u64>,
}

impl SeismicPay {
    pub fn send_payment(&mut self, to: Address, amount: u64) {
        let sender = context::sender();
        let current_bal = self.balances.get(sender).expect("Insufficient funds");
        assert!(current_bal >= amount, "Error: Overdraft prevented");

        self.balances.insert(sender, current_bal - amount);
        let recipient_bal = self.balances.get(to).unwrap_or(0);
        self.balances.insert(to, recipient_bal + amount);

        event::emit("PaymentExecuted", { 
            tx_id: context::tx_hash(),
            slot: context::current_slot()
        });
    }
}`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
