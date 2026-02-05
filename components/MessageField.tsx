
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSuggest: () => void;
  isLoading: boolean;
}

const MessageField: React.FC<Props> = ({ value, onChange, onSuggest, isLoading }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-end px-1">
        <label className="text-xs font-semibold uppercase tracking-widest text-[#A1A1A1]">Personal Note</label>
        <button 
          onClick={onSuggest}
          disabled={isLoading}
          className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter bg-[#1A1A1A] text-white px-3 py-1.5 rounded-full active:scale-95 transition-all"
        >
          {isLoading ? (
             <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          )}
          <span>{isLoading ? 'Crafting...' : 'Inspire Message'}</span>
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A message for your recipient..."
        className="w-full bg-white border border-[#EAE9E4] focus:border-[#1A1A1A] p-5 rounded-3xl text-sm font-medium placeholder:text-[#A1A1A1]/40 transition-all outline-none resize-none h-28 shadow-sm"
      />
    </div>
  );
};

export default MessageField;
