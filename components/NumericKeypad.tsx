
import React from 'react';

interface Props {
  onKeyPress: (key: string) => void;
}

const NumericKeypad: React.FC<Props> = ({ onKeyPress }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div className="grid grid-cols-3 gap-y-2 px-10">
      {keys.map((key, idx) => (
        <button
          key={idx}
          onClick={() => key && onKeyPress(key)}
          className={`h-10 text-lg font-medium text-[#1A1A1A]/80 flex items-center justify-center active:bg-black/5 rounded-full transition-colors ${!key ? 'pointer-events-none' : ''}`}
        >
          {key === 'delete' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
            </svg>
          ) : key}
        </button>
      ))}
    </div>
  );
};

export default NumericKeypad;
