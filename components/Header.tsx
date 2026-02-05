
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center relative">
      <div className="w-10 h-10 flex items-center justify-start">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </div>
      <h1 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight">HairGift</h1>
      <div className="w-10 h-10 flex items-center justify-end">
        <div className="w-8 h-8 rounded-full border border-[#EAE9E4] flex items-center justify-center">
          <span className="text-[10px] font-bold">MK</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
