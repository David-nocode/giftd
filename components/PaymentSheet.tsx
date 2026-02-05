
import React from 'react';

interface Props {
  total: number;
  quantity: number;
  style: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PaymentSheet: React.FC<Props> = ({ total, quantity, style, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1A1A1A]/30 backdrop-blur-md">
      <div className="bg-white rounded-t-[40px] p-10 animate-slide-up ios-safe-bottom shadow-2xl">
        <div className="w-12 h-1 bg-[#EAE9E4] rounded-full mx-auto mb-10" />
        
        <div className="mb-10 text-center">
             <h2 className="text-2xl font-black mb-2">Finalize Gift</h2>
             <p className="text-[#A1A1A1] text-xs font-bold uppercase tracking-widest">{quantity} × {style} Experience</p>
        </div>

        <div className="flex justify-between items-center py-6 border-y border-[#EAE9E4] mb-10">
          <span className="text-sm font-semibold text-[#A1A1A1]">Total Due</span>
          <span className="text-3xl font-black">${total}.00</span>
        </div>

        <div className="bg-[#FAF9F6] border border-[#EAE9E4] rounded-3xl p-5 mb-10 flex items-center gap-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
             <span className="text-[10px] text-white font-bold">Pay</span>
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest">Apple Pay</p>
            <p className="text-[10px] text-[#A1A1A1] font-medium tracking-tight">Express Checkout Active</p>
          </div>
          <div className="w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center">
             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                <path d="M20 6L9 17l-5-5"/>
             </svg>
          </div>
        </div>

        <button 
          onClick={onConfirm}
          className="w-full h-16 bg-[#1A1A1A] rounded-full text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center active:scale-95 transition-all mb-6"
        >
          Authorize Payment
        </button>
        
        <button 
          onClick={onCancel}
          className="w-full text-center py-2 text-[#A1A1A1] text-xs font-bold uppercase tracking-widest"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentSheet;
