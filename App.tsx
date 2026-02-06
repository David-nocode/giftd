
import React, { useState, useEffect, useRef } from 'react';
import { HaircutStyle, PRICES } from './types';

const App: React.FC = () => {
  const [sender, setSender] = useState('___');
  const [recipient, setRecipient] = useState('___');
  const [quantity, setQuantity] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<HaircutStyle | null>(null);
  const [activeField, setActiveField] = useState<'sender' | 'recipient' | 'style' | 'quantity' | 'payment' | 'momo' | 'summary'>('sender');
  const [inputValue, setInputValue] = useState('');
  const [momoPin, setMomoPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionCodes, setSessionCodes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const salonName = "xcutz salon";
  const unitPrice = selectedStyle ? PRICES[selectedStyle] : 0;
  const totalAmount = quantity * unitPrice;

  // Specific Thiings assets for the services
  const haircutIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RCs6a5lnmDpabnkGxGlPRFAZV2yCV3.png&w=1000&q=75"; // Barber
  const massageIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-bkdUNYIhdtrWnm5wKkRmKHaRfiGOAx.png&w=1000&q=75"; // Spa
  const washIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-nWCKVHxJn8chnWMs4YKYmdQmN9Bhpx.png&w=1000&q=75"; // Dryer
  const nailIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-Q1TeCNtDA7TFWKnxhShYZpGvMVRrV6.png&w=1000&q=75"; // Nails
  
  const salonIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-nWCKVHxJn8chnWMs4YKYmdQmN9Bhpx.png&w=1000&q=75";
  const giftIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ptreaSKDFQqhY7oF7Qw6s18YOwh68e.png&w=1000&q=75";

  useEffect(() => {
    if (activeField === 'sender' || activeField === 'recipient') {
      inputRef.current?.focus();
    }
  }, [activeField]);

  const resetApp = () => {
    setSender('___');
    setRecipient('___');
    setQuantity(0);
    setSelectedStyle(null);
    setActiveField('sender');
    setInputValue('');
    setMomoPin('');
    setIsProcessing(false);
    setSessionCodes([]);
  };

  const generateCodes = (count: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: count }, () => {
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (activeField === 'sender') setSender(val || '___');
    if (activeField === 'recipient') setRecipient(val || '___');
  };

  const goToNext = () => {
    if (activeField === 'sender' && isSenderFilled) {
      setActiveField('recipient');
      setInputValue(recipient === '___' ? '' : recipient);
    } else if (activeField === 'recipient' && isRecipientFilled) {
      setActiveField('style');
    } else if (activeField === 'style' && selectedStyle) {
      setActiveField('quantity');
    } else if (activeField === 'quantity' && quantity > 0) {
      setActiveField('payment');
    } else if (activeField === 'payment') {
      setActiveField('momo');
    }
  };

  const goToBack = () => {
    if (activeField === 'recipient') {
      setActiveField('sender');
      setInputValue(sender === '___' ? '' : sender);
    } else if (activeField === 'style') {
      setActiveField('recipient');
      setInputValue(recipient === '___' ? '' : recipient);
    } else if (activeField === 'quantity') {
      setActiveField('style');
    } else if (activeField === 'payment') {
      setActiveField('quantity');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') goToNext();
  };

  const handleFieldClick = (field: 'sender' | 'recipient' | 'style' | 'quantity' | 'payment') => {
    if (activeField === 'summary' || activeField === 'momo') return;
    setActiveField(field);
    if (field === 'sender') setInputValue(sender === '___' ? '' : sender);
    else if (field === 'recipient') setInputValue(recipient === '___' ? '' : recipient);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(prev => Math.max(0, prev + delta));
  };

  const confirmMomo = () => {
    if (momoPin.length < 4) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSessionCodes(generateCodes(quantity));
      setActiveField('summary');
    }, 2000);
  };

  const handleSendGift = async () => {
    const shareText = `🎁 Gift for ${recipient}!\n\n${sender} has gifted you ${quantity} session(s) of ${selectedStyle} at ${salonName}.\n\nYour Redemption Codes:\n${sessionCodes.map((code, i) => `• Session ${i + 1}: ${code}`).join('\n')}\n\nSee you at the salon! ✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'gftd.', text: shareText });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Gift details copied to clipboard!');
      } catch (err) {
        alert('Sharing not supported on this browser.');
      }
    }
  };

  const isSenderFilled = sender !== '___' && sender.trim() !== '';
  const isRecipientFilled = recipient !== '___' && recipient.trim() !== '';

  const getServiceIcon = (style: HaircutStyle) => {
    switch (style) {
      case HaircutStyle.HAIRCUT: return haircutIcon;
      case HaircutStyle.MASSAGE: return massageIcon;
      case HaircutStyle.HAIR_WASH: return washIcon;
      case HaircutStyle.PEDICURE: return nailIcon; 
      case HaircutStyle.MANICURE: return nailIcon; 
      default: return giftIcon;
    }
  };

  const DynamicSentence = ({ isInsideCard = false }: { isInsideCard?: boolean }) => (
    <div className={`space-y-1.5 sm:space-y-2 ${isInsideCard ? 'text-lg sm:text-xl' : 'text-2xl sm:text-[34px]'} font-semibold leading-tight tracking-tight text-center sm:text-left`}>
      <div className={`flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <span onClick={() => handleFieldClick('sender')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black`}>{sender}</span>
        <span className="text-[#888888] font-medium select-none">is gifting</span>
        <span onClick={() => handleFieldClick('recipient')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black`}>{recipient}</span>
      </div>
      <div className={`flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <img src={getServiceIcon(selectedStyle || HaircutStyle.HAIRCUT)} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6' : 'w-8 h-8 sm:w-10'} object-contain select-none`} />
        <span onClick={() => handleFieldClick('quantity')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black font-bold`}>{quantity === 0 ? '___' : `${quantity}`}</span>
        <span className="text-black font-bold select-none capitalize">{selectedStyle ? selectedStyle : '___'}</span>
        <span className="text-[#888888] font-medium select-none">sessions worth</span>
      </div>
      <div className={`flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-x-1.5 sm:gap-x-2">
          <img src={giftIcon} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6' : 'w-8 h-8 sm:w-10'} object-contain select-none`} />
          <span className="select-none font-bold">{quantity === 0 || !selectedStyle ? '___' : `GH ${totalAmount}`}</span>
        </div>
        <span className="text-[#888888] font-medium select-none">at</span>
        <div className="flex items-center gap-x-1.5 sm:gap-x-2">
          <img src={salonIcon} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6' : 'w-8 h-8 sm:w-10'} object-contain select-none`} />
          <span className={`select-none font-bold ${!isInsideCard ? 'cursor-pointer' : ''}`} onClick={() => handleFieldClick('style')}>{salonName}.</span>
        </div>
      </div>
    </div>
  );

  const NavRow = ({ children, isNextDisabled = false, isBackHidden = false, isNextHidden = false }: { children?: React.ReactNode, isNextDisabled?: boolean, isBackHidden?: boolean, isNextHidden?: boolean }) => (
    <div className="w-full flex items-center gap-3 sm:gap-4 mt-auto pb-6 sm:pb-10">
      <button 
        onClick={goToBack} 
        className={`px-6 sm:px-8 h-14 sm:h-16 flex-shrink-0 bg-white border border-[#EAE9E4] rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-widest text-[#BCBCBC] hover:text-[#1A1A1A] transition-all active:scale-95 ${isBackHidden ? 'invisible pointer-events-none' : ''}`}
      >
        back
      </button>
      <div className="flex-1 flex justify-center">{children}</div>
      <button 
        onClick={goToNext} 
        disabled={isNextDisabled}
        className={`px-6 sm:px-8 h-14 sm:h-16 flex-shrink-0 bg-black rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white transition-all active:scale-95 ${isNextDisabled ? 'opacity-20 pointer-events-none' : 'opacity-100 shadow-[0_4px_24px_rgba(0,0,0,0.15)]'} ${isNextHidden ? 'invisible pointer-events-none' : ''}`}
      >
        next
      </button>
    </div>
  );

  return (
    <div className="h-screen w-full flex justify-center bg-white overflow-hidden font-['Space_Grotesk']">
      <div className="h-full w-full max-w-[800px] flex flex-col bg-white text-black relative">
        
        {/* Header */}
        <div className="w-full pt-[40px] px-6 sm:px-10 relative bg-white shrink-0">
          <div className="flex justify-between items-start w-full mb-[40px]">
            <div className="text-6xl sm:text-[100px] font-bold tracking-tighter flex items-baseline select-none leading-none text-black transition-all">
              gftd<span className="text-[#E11D48]">.</span>
            </div>
            <div className="text-right select-none pt-2">
              <div className="text-xl sm:text-2xl font-bold leading-none tracking-tighter text-black">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(' ', '-')}
              </div>
              <div className="text-xs sm:text-sm font-medium text-[#888888] leading-none mt-1 tracking-tight">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 sm:px-10 pb-8 flex flex-col">
          
          {/* Dynamic Sentence */}
          {activeField !== 'summary' && activeField !== 'momo' && (
            <div className="animate-fade-in transition-all shrink-0">
              <DynamicSentence />
            </div>
          )}

          {/* Interaction Area */}
          <div className="flex-1 flex flex-col items-center justify-end pt-10">
            
            {(activeField === 'sender' || activeField === 'recipient') && (
              <div className="w-full animate-fade-in flex flex-col items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="absolute opacity-0 pointer-events-none"
                />
                <span className="text-[#888888] text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">
                  {activeField === 'sender' ? "your name" : "recipient's name"}
                </span>
                <NavRow isBackHidden={activeField === 'sender'} isNextDisabled={activeField === 'sender' ? !isSenderFilled : !isRecipientFilled}>
                  <div 
                    className={`w-full h-14 sm:h-16 bg-white border-2 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] transition-all duration-300 ${inputValue ? 'border-black' : 'border-[#EAE9E4]'}`}
                    onClick={() => inputRef.current?.focus()}
                  >
                    <span>{inputValue || "___"}</span>
                    <span className="cursor-blink" />
                  </div>
                </NavRow>
              </div>
            )}

            {activeField === 'style' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <div className="w-full bg-white border border-[#EAE9E4] rounded-[32px] p-4 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-8 overflow-y-auto max-h-[320px] no-scrollbar">
                  <div className="space-y-2">
                    {Object.values(HaircutStyle).map((style) => (
                      <div 
                        key={style} 
                        onClick={() => setSelectedStyle(style)} 
                        className={`flex items-center justify-between cursor-pointer p-3 rounded-2xl transition-all ${selectedStyle === style ? 'bg-black text-white' : 'hover:bg-[#FAF9F6] text-[#1A1A1A]'}`}
                      >
                        <div className="flex items-center gap-4">
                          <img src={getServiceIcon(style)} alt="" className={`w-8 h-8 object-contain ${selectedStyle === style ? '' : 'opacity-60'}`} />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight capitalize">{style}</span>
                            <span className={`text-[10px] ${selectedStyle === style ? 'text-white/60' : 'text-[#888888]'}`}>GH {PRICES[style]}</span>
                          </div>
                        </div>
                        {selectedStyle === style && <div className="w-4 h-4 text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>}
                      </div>
                    ))}
                  </div>
                </div>
                <NavRow isNextDisabled={!selectedStyle}>
                  <span className="text-[#888888] text-[10px] font-bold uppercase tracking-widest opacity-60">select service</span>
                </NavRow>
              </div>
            )}

            {activeField === 'quantity' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <div className="w-full bg-white border border-[#EAE9E4] rounded-[40px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={getServiceIcon(selectedStyle!)} alt="" className="w-10 h-10 object-contain" />
                    <div className="flex flex-col">
                      <span className="text-xl font-bold tracking-tight capitalize">{selectedStyle}</span>
                      <span className="text-sm font-medium text-[#888888]">GH {unitPrice}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[#888888] text-[10px] font-bold uppercase tracking-widest mb-4">
                   {quantity === 0 ? 'select number of sessions' : `total GH ${totalAmount}`}
                </span>
                <NavRow isNextDisabled={quantity === 0}>
                  <div className="w-full h-14 sm:h-16 bg-white border-2 border-black rounded-full flex items-center justify-between px-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <button onClick={() => adjustQuantity(-1)} className="text-3xl font-light text-[#BCBCBC] hover:text-black transition-colors w-10">-</button>
                    <span className="text-2xl font-bold text-[#1A1A1A]">{quantity === 0 ? '___' : quantity}</span>
                    <button onClick={() => adjustQuantity(1)} className="text-2xl font-light text-[#BCBCBC] hover:text-black transition-colors w-10">+</button>
                  </div>
                </NavRow>
              </div>
            )}

            {activeField === 'payment' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <span className="text-[#888888] text-[10px] font-bold uppercase tracking-widest mb-4">Confirm total GH {totalAmount}</span>
                <NavRow isNextHidden={true}>
                  <button 
                    onClick={goToNext} 
                    className="w-full h-14 sm:h-16 bg-black rounded-full flex items-center justify-center text-sm font-bold text-white transition-all shadow-[0_10px_40px_rgba(0,0,0,0.2)] active:scale-95 uppercase tracking-widest"
                  >
                    make payment
                  </button>
                </NavRow>
              </div>
            )}

            {activeField === 'momo' && (
              <div className="w-full max-w-[440px] animate-fade-in flex flex-col items-center bg-white p-8 rounded-[40px] border border-[#EAE9E4] shadow-2xl mb-10">
                 <div className="w-16 h-16 bg-[#FEE2E2] rounded-full mb-6 flex items-center justify-center">
                    <span className="text-[#E11D48] font-bold text-lg">Momo</span>
                 </div>
                 <h3 className="text-xl font-bold mb-2">Confirm Payment</h3>
                 <p className="text-[#888888] text-center mb-8 text-sm">Enter 4-digit PIN to authorize GH {totalAmount}.</p>
                 <input 
                   type="password" 
                   maxLength={4} 
                   value={momoPin}
                   onChange={(e) => {
                     const val = e.target.value.replace(/\D/g, '');
                     setMomoPin(val);
                     if (val.length === 4) confirmMomo();
                   }}
                   className="w-full text-center text-4xl tracking-[1em] font-bold border-b-2 border-black outline-none mb-10 pb-2 bg-transparent"
                   autoFocus
                 />
                 <button onClick={confirmMomo} disabled={isProcessing || momoPin.length < 4} className={`w-full h-16 rounded-full font-bold transition-all ${isProcessing ? 'bg-[#888888]' : 'bg-[#E11D48] text-white'}`}>
                   {isProcessing ? 'Processing...' : 'Confirm PIN'}
                 </button>
              </div>
            )}

            {activeField === 'summary' && (
              <div className="w-full animate-fade-in flex flex-col items-center h-full max-h-full">
                <div className="w-full max-w-[480px] flex-1 flex flex-col justify-center min-h-0">
                  <div className="bg-white border border-[#EAE9E4] rounded-[40px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col items-center">
                    <div className="w-full mb-8">
                      <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#EAE9E4]">
                        <DynamicSentence isInsideCard={true} />
                      </div>
                    </div>
                    <div className="w-full pt-6 border-t border-dashed border-[#EAE9E4]">
                      <p className="text-[#888888] text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Codes</p>
                      <div className="grid grid-cols-2 gap-4">
                        {sessionCodes.map((code, i) => (
                          <div key={i} className="bg-[#FAF9F6] border border-[#EAE9E4] rounded-2xl p-4 flex flex-col items-center">
                            <span className="text-[10px] font-bold text-[#BCBCBC] mb-1">Session {i+1}</span>
                            <span className="font-mono text-lg font-bold tracking-widest">{code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 w-full max-w-[480px] space-y-4 pb-10">
                  <button onClick={handleSendGift} className="w-full h-16 bg-black rounded-full flex items-center justify-center text-xl font-bold text-white shadow-xl active:scale-95">send gift</button>
                  <button onClick={resetApp} className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-[#BCBCBC]">send another</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
