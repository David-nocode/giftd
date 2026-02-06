
import React, { useState, useEffect, useRef } from 'react';
import { HaircutStyle, PRICES } from './types';

const App: React.FC = () => {
  const [sender, setSender] = useState('---');
  const [recipient, setRecipient] = useState('---');
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

  // Icons from provided URLs (Thiings asset base)
  const haircutIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RCs6a5lnmDpabnkGxGlPRFAZV2yCV3.png&w=1000&q=75";
  const massageIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ptreaSKDFQqhY7oF7Qw6s18YOwh68e.png&w=1000&q=75"; // Reusing high quality placeholder
  const washIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-nWCKVHxJn8chnWMs4YKYmdQmN9Bhpx.png&w=1000&q=75"; // Reusing high quality placeholder
  const pediIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RCs6a5lnmDpabnkGxGlPRFAZV2yCV3.png&w=1000&q=75"; 
  const salonIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-nWCKVHxJn8chnWMs4YKYmdQmN9Bhpx.png&w=1000&q=75";
  const giftIcon = "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ptreaSKDFQqhY7oF7Qw6s18YOwh68e.png&w=1000&q=75";

  useEffect(() => {
    if (activeField === 'sender' || activeField === 'recipient') {
      inputRef.current?.focus();
    }
  }, [activeField]);

  const resetApp = () => {
    setSender('---');
    setRecipient('---');
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
    if (activeField === 'sender') setSender(val || '---');
    if (activeField === 'recipient') setRecipient(val || '---');
  };

  const goToNext = () => {
    if (activeField === 'sender' && isSenderFilled) {
      setActiveField('recipient');
      setInputValue(recipient === '---' ? '' : recipient);
    } else if (activeField === 'recipient' && isRecipientFilled) {
      setActiveField('style');
    } else if (activeField === 'style' && selectedStyle) {
      setActiveField('quantity');
    } else if (activeField === 'quantity') {
      setActiveField('payment');
    } else if (activeField === 'payment') {
      setActiveField('momo');
    }
  };

  const goToBack = () => {
    if (activeField === 'recipient') {
      setActiveField('sender');
      setInputValue(sender === '---' ? '' : sender);
    } else if (activeField === 'style') {
      setActiveField('recipient');
      setInputValue(recipient === '---' ? '' : recipient);
    } else if (activeField === 'quantity') {
      setActiveField('style');
    } else if (activeField === 'payment') {
      setActiveField('quantity');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToNext();
    }
  };

  const handleFieldClick = (field: 'sender' | 'recipient' | 'style' | 'quantity' | 'payment') => {
    if (activeField === 'summary' || activeField === 'momo') return;
    setActiveField(field);
    if (field === 'sender') setInputValue(sender === '---' ? '' : sender);
    else if (field === 'recipient') setInputValue(recipient === '---' ? '' : recipient);
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
        await navigator.share({
          title: 'gftd.',
          text: shareText,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Gift details copied to clipboard! You can now paste it into any message app.');
      } catch (err) {
        alert('Sharing not supported on this browser. Please copy your codes manually.');
      }
    }
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toLowerCase().replace(' ', '-');
  const dayStr = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const isSenderFilled = sender !== '---' && sender.trim() !== '';
  const isRecipientFilled = recipient !== '---' && recipient.trim() !== '';

  const getServiceIcon = (style: HaircutStyle) => {
    switch (style) {
      case HaircutStyle.HAIRCUT: return haircutIcon;
      case HaircutStyle.MASSAGE: return massageIcon;
      case HaircutStyle.HAIR_WASH: return washIcon;
      case HaircutStyle.PEDICURE: return pediIcon;
      case HaircutStyle.MANICURE: return washIcon;
      default: return giftIcon;
    }
  };

  const DynamicSentence = ({ isInsideCard = false }: { isInsideCard?: boolean }) => (
    <div className={`space-y-1.5 sm:space-y-2 ${isInsideCard ? 'text-lg sm:text-xl' : 'text-2xl sm:text-[34px]'} font-semibold leading-tight sm:leading-[1.15] tracking-tight text-center sm:text-left`}>
      <div className={`flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <span onClick={() => handleFieldClick('sender')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black`}>{sender}</span>
        <span className="text-[#888888] font-medium select-none">is gifting</span>
        <span onClick={() => handleFieldClick('recipient')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black`}>{recipient}</span>
      </div>
      <div className={`flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <img src={getServiceIcon(selectedStyle || HaircutStyle.HAIRCUT)} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-8 h-8 sm:w-10 sm:h-10'} object-contain select-none`} />
        <span onClick={() => handleFieldClick('quantity')} className={`${!isInsideCard ? 'cursor-pointer' : ''} text-black font-bold`}>{quantity === 0 ? '---' : `${quantity}`}</span>
        <span className="text-black font-bold select-none">{selectedStyle ? selectedStyle : '---'}</span>
        <span className="text-[#888888] font-medium select-none">sessions worth</span>
      </div>
      <div className={`flex items-center flex-wrap gap-x-1.5 sm:gap-x-2 ${isInsideCard ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-x-1.5 sm:gap-x-2">
          <img src={giftIcon} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-8 h-8 sm:w-10 sm:h-10'} object-contain select-none`} />
          <span className="select-none font-bold">{quantity === 0 || !selectedStyle ? '---' : `GH ${totalAmount}`}</span>
        </div>
        <span className="text-[#888888] font-medium select-none">at</span>
        <div className="flex items-center gap-x-1.5 sm:gap-x-2">
          <img src={salonIcon} alt="" className={`${isInsideCard ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-8 h-8 sm:w-10 sm:h-10'} object-contain select-none`} />
          <span className={`select-none font-bold ${!isInsideCard ? 'cursor-pointer' : ''}`} onClick={() => handleFieldClick('style')}>{salonName}.</span>
        </div>
      </div>
    </div>
  );

  const NavRow = ({ children, isNextDisabled = false, isBackHidden = false, isNextHidden = false }: { children?: React.ReactNode, isNextDisabled?: boolean, isBackHidden?: boolean, isNextHidden?: boolean }) => (
    <div className="w-full flex items-center gap-3 sm:gap-4">
      <button 
        onClick={goToBack} 
        className={`px-6 sm:px-8 h-14 sm:h-16 flex-shrink-0 bg-white border border-[#EAE9E4] rounded-full flex items-center justify-center text-xs sm:text-sm font-bold uppercase tracking-widest text-[#BCBCBC] hover:text-[#1A1A1A] transition-all active:scale-95 ${isBackHidden ? 'invisible pointer-events-none' : ''}`}
      >
        back
      </button>
      
      <div className="flex-1 flex justify-center">
        {children}
      </div>

      <button 
        onClick={goToNext} 
        disabled={isNextDisabled}
        className={`px-6 sm:px-8 h-14 sm:h-16 flex-shrink-0 bg-black rounded-full flex items-center justify-center text-xs sm:text-sm font-bold uppercase tracking-widest text-white transition-all active:scale-95 ${isNextDisabled ? 'opacity-20 pointer-events-none' : 'opacity-100 shadow-[0_4px_24px_rgba(0,0,0,0.15)]'} ${isNextHidden ? 'invisible pointer-events-none' : ''}`}
      >
        next
      </button>
    </div>
  );

  return (
    <div className="h-screen w-full flex justify-center bg-white overflow-hidden">
      <div className="h-full w-full max-w-[800px] flex flex-col bg-white text-black relative">
        
        {/* Header - Top aligned 30px from top */}
        <div className="w-full pt-[30px] px-6 sm:px-10 relative bg-white shrink-0">
          <div className="flex justify-between items-start w-full mb-[50px]">
            <div className="text-[18vw] sm:text-[120px] font-bold tracking-tighter flex items-baseline select-none leading-none text-black transition-all">
              gftd<span className="text-[#E11D48]">.</span>
            </div>
            <div className="text-right select-none pt-2 sm:pt-4">
              <div className="text-2xl sm:text-3xl font-bold leading-none tracking-tighter text-black">{dateStr}</div>
              <div className="text-base sm:text-lg font-medium text-[#888888] leading-none mt-1 tracking-tight">{dayStr}</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 sm:px-10 pb-8 sm:pb-12 flex flex-col">
          
          {/* Dynamic Sentence Area */}
          {activeField !== 'summary' && activeField !== 'momo' && (
            <div className="animate-fade-in transition-all shrink-0">
              <DynamicSentence />
            </div>
          )}

          {/* Interaction Area */}
          <div className="flex-1 flex flex-col items-center justify-end pb-4 sm:pb-8 pt-10">
            
            {(activeField === 'sender' || activeField === 'recipient') && (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
              />
            )}

            {/* Steps */}
            {(activeField === 'sender' || activeField === 'recipient') && (
              <div className="w-full animate-fade-in flex flex-col items-center">
                <div className="w-full flex justify-center mb-2">
                  <label className="text-[#888888] text-xs font-bold uppercase tracking-widest opacity-60">
                     {activeField === 'sender' ? "your name" : "recipient's name"}
                  </label>
                </div>
                <NavRow 
                  isBackHidden={activeField === 'sender'} 
                  isNextDisabled={!(activeField === 'sender' ? isSenderFilled : isRecipientFilled)}
                >
                  <div 
                    className={`w-full h-14 sm:h-16 bg-white border-2 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer transition-all duration-300 ${inputValue ? 'border-black' : 'border-[#EAE9E4]'}`}
                    onClick={() => inputRef.current?.focus()}
                  >
                    <span className={!inputValue ? "text-[#BCBCBC]" : ""}>
                      {inputValue || "---"}
                    </span>
                    <span className="cursor-blink" />
                  </div>
                </NavRow>
              </div>
            )}

            {activeField === 'style' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <div className="w-full bg-white border border-[#EAE9E4] rounded-[32px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-8 overflow-y-auto max-h-[350px] no-scrollbar">
                  <div className="space-y-6">
                    {Object.values(HaircutStyle).map((style) => (
                      <div key={style} onClick={() => setSelectedStyle(style)} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedStyle === style ? 'border-black' : 'border-[#EAE9E4]'}`}>
                            {selectedStyle === style && <div className="w-3 h-3 bg-black rounded-full" />}
                          </div>
                          <img src={getServiceIcon(style)} alt="" className="w-6 h-6 object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col">
                            <span className="text-base sm:text-lg font-bold tracking-tight text-[#1A1A1A] leading-tight capitalize">{style}</span>
                            <span className="text-sm font-medium text-[#888888]">GH {PRICES[style]}</span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 transition-colors ${selectedStyle === style ? 'text-black' : 'text-[#EAE9E4] group-hover:text-black'}`}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <NavRow isNextDisabled={!selectedStyle}>
                  <span className="text-[#BCBCBC] text-xs font-bold uppercase tracking-widest opacity-60">
                     select service
                  </span>
                </NavRow>
              </div>
            )}

            {activeField === 'quantity' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <div className="w-full bg-white border border-[#EAE9E4] rounded-[40px] p-8 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] capitalize">{selectedStyle}</span>
                        <span className="text-base sm:text-lg font-medium text-[#888888]">GH {unitPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#888888] text-xs font-bold uppercase tracking-widest mb-4">
                     {quantity === 0 ? 'select number of sessions' : `total GH ${totalAmount}`}
                  </span>
                  <NavRow isNextDisabled={quantity === 0}>
                    <div className="w-full h-14 sm:h-16 bg-white border border-[#EAE9E4] rounded-full flex items-center justify-between px-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      <button onClick={() => adjustQuantity(-1)} className="text-3xl font-light text-[#BCBCBC] hover:text-black transition-colors w-10 pb-1">-</button>
                      <span className="text-2xl font-bold text-[#1A1A1A]">{quantity === 0 ? '---' : quantity}</span>
                      <button onClick={() => adjustQuantity(1)} className="text-2xl font-light text-[#BCBCBC] hover:text-black transition-colors w-10">+</button>
                    </div>
                  </NavRow>
                </div>
              </div>
            )}

            {activeField === 'payment' && (
              <div className="w-full max-w-[480px] animate-fade-in flex flex-col items-center">
                <span className="text-[#888888] text-xs font-bold uppercase tracking-widest mb-4">
                   pay GH {totalAmount}
                </span>
                <NavRow isNextHidden={true}>
                  <button 
                    onClick={goToNext} 
                    className="w-full h-14 sm:h-16 bg-black rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white transition-all shadow-[0_10px_40px_rgba(0,0,0,0.2)] active:scale-95 uppercase tracking-widest"
                  >
                    authorize payment
                  </button>
                </NavRow>
              </div>
            )}

            {activeField === 'momo' && (
              <div className="w-full max-w-[440px] animate-fade-in flex flex-col items-center bg-white p-8 rounded-[40px] border border-[#EAE9E4] shadow-2xl mb-10">
                 <div className="w-16 h-16 bg-[#FEE2E2] rounded-full mb-6 flex items-center justify-center">
                    <span className="text-[#E11D48] font-bold text-lg">Momo</span>
                 </div>
                 <h3 className="text-xl font-bold mb-2 text-black">Confirm Payment</h3>
                 <p className="text-[#888888] text-center mb-8 tracking-tight">Enter your 4-digit Momo PIN to authorize GH {totalAmount} to xcutz salon.</p>
                 <input 
                   type="password" 
                   maxLength={4} 
                   value={momoPin}
                   onChange={(e) => setMomoPin(e.target.value.replace(/\D/g, ''))}
                   className="w-full text-center text-4xl tracking-[1em] font-bold border-b-2 border-black outline-none mb-8 pb-2 text-black bg-transparent"
                   autoFocus
                 />
                 <button 
                  onClick={confirmMomo}
                  disabled={isProcessing || momoPin.length < 4}
                  className={`w-full h-16 rounded-full font-bold text-xl transition-all ${isProcessing ? 'bg-[#888888]' : 'bg-[#E11D48] text-white hover:bg-black'}`}
                 >
                   {isProcessing ? 'Processing...' : 'Confirm PIN'}
                 </button>
              </div>
            )}

            {activeField === 'summary' && (
              <div className="w-full animate-fade-in flex flex-col items-center h-full max-h-full">
                <div className="w-full max-w-[480px] flex-1 flex flex-col justify-center min-h-0">
                  <div className="bg-white border border-[#EAE9E4] rounded-[40px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex flex-col items-center">
                    
                    {/* Gift Card Visual */}
                    <div className="w-full mb-8">
                      <div className="bg-[#FAF9F6] p-6 rounded-3xl border border-[#EAE9E4]">
                        <DynamicSentence isInsideCard={true} />
                      </div>
                    </div>
                    
                    {/* Codes Section */}
                    <div className="w-full pt-6 border-t border-dashed border-[#EAE9E4]">
                      <p className="text-[#888888] text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] mb-6 text-center">
                        Redemption codes
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {sessionCodes.map((code, i) => (
                          <div key={i} className="bg-[#FAF9F6] border border-[#EAE9E4] rounded-2xl p-4 flex flex-col items-center group active:scale-95 transition-transform">
                            <span className="text-[10px] uppercase font-bold text-[#BCBCBC] mb-1 tracking-wider">Session {i+1}</span>
                            <span className="font-mono text-lg font-bold tracking-widest text-black">{code}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-8 text-center text-[#BCBCBC] text-[10px] leading-relaxed tracking-tight font-bold">
                        *Present these codes at xcutz salon for each session.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Actions Section */}
                <div className="mt-8 w-full max-w-[480px] space-y-4 pb-4 shrink-0">
                  <button
                    onClick={handleSendGift}
                    className="w-full h-16 sm:h-20 bg-black rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] active:scale-95"
                  >
                    send gift
                  </button>
                  <button
                    onClick={resetApp}
                    className="w-full text-center text-sm font-bold uppercase tracking-widest text-[#BCBCBC] hover:text-black transition-colors py-2"
                  >
                    send another gift
                  </button>
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
