
import React from 'react';
import { HaircutStyle, PRICES } from '../types';

interface Props {
  selected: HaircutStyle;
  onChange: (style: HaircutStyle) => void;
}

const StyleSelector: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <button
        onClick={() => onChange(HaircutStyle.BEARD_TRIM)}
        className={`relative p-6 rounded-3xl flex flex-col text-left transition-all duration-300 border ${
          selected === HaircutStyle.BEARD_TRIM 
          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl scale-[1.02]' 
          : 'bg-white border-[#EAE9E4] text-[#1A1A1A] opacity-80'
        }`}
      >
        <div className={`w-8 h-8 rounded-full mb-8 flex items-center justify-center border ${selected === HaircutStyle.BEARD_TRIM ? 'border-white/20 bg-white/10' : 'border-[#EAE9E4] bg-[#FAF9F6]'}`}>
          <span className="text-[10px] font-bold">01</span>
        </div>
        <span className="text-sm font-medium tracking-tight mb-1">Standard</span>
        <span className="text-xl font-black mb-4">Haircut</span>
        <span className={`text-lg font-light mt-auto ${selected === HaircutStyle.BEARD_TRIM ? 'text-white/80' : 'text-[#A1A1A1]'}`}>
          ${PRICES[HaircutStyle.BEARD_TRIM]}
        </span>
      </button>
      
      <button
        onClick={() => onChange(HaircutStyle.DYE)}
        className={`relative p-6 rounded-3xl flex flex-col text-left transition-all duration-300 border ${
          selected === HaircutStyle.DYE 
          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl scale-[1.02]' 
          : 'bg-white border-[#EAE9E4] text-[#1A1A1A] opacity-80'
        }`}
      >
         <div className={`w-8 h-8 rounded-full mb-8 flex items-center justify-center border ${selected === HaircutStyle.DYE ? 'border-white/20 bg-white/10' : 'border-[#EAE9E4] bg-[#FAF9F6]'}`}>
          <span className="text-[10px] font-bold">02</span>
        </div>
        <span className="text-sm font-medium tracking-tight mb-1">Premium</span>
        <span className="text-xl font-black mb-4">+ Dye</span>
        <span className={`text-lg font-light mt-auto ${selected === HaircutStyle.DYE ? 'text-white/80' : 'text-[#A1A1A1]'}`}>
          ${PRICES[HaircutStyle.DYE]}
        </span>
      </button>
    </div>
  );
};

export default StyleSelector;
