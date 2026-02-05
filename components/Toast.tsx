
import React, { useEffect } from 'react';

interface Props {
  message: string;
  onFade: () => void;
}

const Toast: React.FC<Props> = ({ message, onFade }) => {
  useEffect(() => {
    const timer = setTimeout(onFade, 3000);
    return () => clearTimeout(timer);
  }, [onFade]);

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100]">
      <div className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-medium text-xs tracking-widest uppercase flex items-center gap-3 shadow-2xl animate-slide-up">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        {message}
      </div>
    </div>
  );
};

export default Toast;
