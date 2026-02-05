
import React from 'react';
import { GiftDetails } from '../types';

interface Props {
  details: GiftDetails;
  onClose: () => void;
}

const ShareSheet: React.FC<Props> = ({ details, onClose }) => {
  const apps = [
    { name: 'iMessage', color: '#34C759', icon: 'M' },
    { name: 'WhatsApp', color: '#25D366', icon: 'W' },
    { name: 'Messenger', color: '#0084FF', icon: 'F' },
    { name: 'Email', color: '#1A1A1A', icon: '@' },
    { name: 'Copy Link', color: '#8E8E93', icon: 'L' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#1A1A1A]/30 backdrop-blur-md">
      <div className="bg-white rounded-t-[40px] p-8 animate-slide-up ios-safe-bottom">
        <div className="w-12 h-1 bg-[#EAE9E4] rounded-full mx-auto mb-8" />

        <div className="bg-[#FAF9F6] border border-[#EAE9E4] rounded-3xl p-6 mb-8">
           <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-[10px] font-bold text-white">HG</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#A1A1A1]">Gift Certificate Ready</span>
           </div>
           <div className="bg-white p-5 rounded-2xl border border-[#EAE9E4] shadow-sm">
              <div className="text-xs font-medium leading-relaxed text-[#1A1A1A]">
                <span className="font-bold text-lg block mb-2">"{details.message}"</span>
                This gift is valid for <b>{details.quantity} {details.style}</b> session(s).<br/><br/>
                <span className="text-[10px] uppercase tracking-widest text-[#A1A1A1] block mb-2">Redemption Codes:</span>
                {details.codes.map((code, i) => (
                  <span key={i} className="block font-black text-[#1A1A1A] tracking-wider mb-1">SESSION {i+1} — {code}</span>
                ))}
              </div>
           </div>
        </div>

        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1A1] mb-6 px-1">Share Invitation</h3>
        <div className="flex gap-4 overflow-x-auto pb-8 px-1 no-scrollbar">
          {apps.map((app) => (
            <button 
              key={app.name} 
              onClick={onClose}
              className="flex flex-col items-center gap-3 min-w-[72px] active:scale-90 transition-transform"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md"
                style={{ backgroundColor: app.color }}
              >
                {app.icon}
              </div>
              <span className="text-[9px] font-bold text-[#A1A1A1] uppercase tracking-tighter">{app.name}</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose}
          className="w-full h-14 border border-[#EAE9E4] rounded-2xl text-xs font-bold uppercase tracking-widest text-[#1A1A1A]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareSheet;
