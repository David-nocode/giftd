
import React from 'react';

interface Props {
  value: string;
  total: number;
}

const QuantityDisplay: React.FC<Props> = ({ value, total }) => {
  return (
    <div className="w-full flex items-center justify-between py-4 border-y border-[#EAE9E4]">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#A1A1A1] mb-1">Quantity</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black">{value}</span>
          <span className="text-sm font-medium opacity-40">Sessions</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#A1A1A1] mb-1">Investment</span>
        <div className="text-2xl font-bold">${total}</div>
      </div>
    </div>
  );
};

export default QuantityDisplay;
