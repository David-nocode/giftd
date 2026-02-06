
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
        // Fix: Changed BEARD_TRIM to HAIRCUT as it exists in the HaircutStyle enum
        onClick={() => onChange(HaircutStyle.HAIRCUT)}
        className={`relative p-6 rounded-3xl flex flex-col text-left transition-all duration-300 border ${
          selected === HaircutStyle.HAIRCUT 
          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl scale-[1.02]' 
          : 'bg-white border-[#EAE9E4] text-[#1A1A1A] opacity-80'
        }`}
      >
        <div className={`w-8 h-8 rounded-full mb-8 flex items-center justify-center border ${selected === HaircutStyle.HAIRCUT ? 'border-white/20 bg-white/10' : 'border-[#EAE9E4] bg-[#FAF9F6]'}`}>
          <span className="text-[10px] font-bold">01</span>
        </div>
        <span className="text-sm font-medium tracking-tight mb-1">Standard</span>
        <span className="text-xl font-black mb-4">Haircut</span>
        <span className={`text-lg font-light mt-auto ${selected === HaircutStyle.HAIRCUT ? 'text-white/80' : 'text-[#A1A1A1]'}`}>
          ${PRICES[HaircutStyle.HAIRCUT]}
        </span>
      </button>
      
      <button
        // Fix: Changed DYE to HAIR_WASH as it exists in the HaircutStyle enum
        onClick={() => onChange(HaircutStyle.HAIR_WASH)}
        className={`relative p-6 rounded-3xl flex flex-col text-left transition-all duration-300 border ${
          selected === HaircutStyle.HAIR_WASH 
          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-2xl scale-[1.02]' 
          : 'bg-white border-[#EAE9E4] text-[#1A1A1A] opacity-80'
        }`}
      >
         <div className={`w-8 h-8 rounded-full mb-8 flex items-center justify-center border ${selected === HaircutStyle.HAIR_WASH ? 'border-white/20 bg-white/10' : 'border-[#EAE9E4] bg-[#FAF9F6]'}`}>
          <span className="text-[10px] font-bold">02</span>
        </div>
        <span className="text-sm font-medium tracking-tight mb-1">Premium</span>
        <span className="text-xl font-black mb-4">+ Wash</span>
        <span className={`text-lg font-light mt-auto ${selected === HaircutStyle.HAIR_WASH ? 'text-white/80' : 'text-[#A1A1A1]'}`}>
          ${PRICES[HaircutStyle.HAIR_WASH]}
        </span>
      </button>
    </div>
  );
};

export default StyleSelector;
