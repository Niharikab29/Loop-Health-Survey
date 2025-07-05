import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Clock } from 'lucide-react';

interface SurveyWidgetProps {
  onStartSurvey: () => void;
  isVisible: boolean;
  onClose: () => void;
  onRemindLater?: () => void;
}

const SurveyWidget: React.FC<SurveyWidgetProps> = ({ onStartSurvey, isVisible, onClose, onRemindLater }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showRemindDialog, setShowRemindDialog] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);
  const [isGentleBouncing, setIsGentleBouncing] = useState(false);
  const gentleBounceIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible && popupRef.current) {
      popupRef.current.classList.add('creative-popup');
    }
  }, [isVisible]);

  useEffect(() => {
    if (showRemindDialog) {
      const timer = setTimeout(() => setShowRemindDialog(false), 4400);
      return () => clearTimeout(timer);
    }
  }, [showRemindDialog]);

  useEffect(() => {
    if (isVisible && !hidePopup) {
      setIsGentleBouncing(true); // Initial bounce
      gentleBounceIntervalRef.current = window.setInterval(() => {
        setIsGentleBouncing(false);
        setTimeout(() => setIsGentleBouncing(true), 50); // retrigger
      }, 4000);
      return () => {
        if (gentleBounceIntervalRef.current) clearInterval(gentleBounceIntervalRef.current);
        setIsGentleBouncing(false);
      };
    } else {
      if (gentleBounceIntervalRef.current) clearInterval(gentleBounceIntervalRef.current);
      setIsGentleBouncing(false);
    }
  }, [isVisible, hidePopup]);

  const handleRemindLater = () => {
    setShowRemindDialog(true);
    setHidePopup(true);
    if (onRemindLater) onRemindLater();
  };

  const handleDialogClose = () => {
    setShowRemindDialog(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {!hidePopup && isVisible && (
        <div
          ref={popupRef}
          className={`bg-white rounded-2xl shadow-2xl border border-gray-100 px-5 pt-6 pb-5 max-w-sm w-full relative creative-gradient${isGentleBouncing ? ' gentle-bounce' : ''}`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 pr-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-left tracking-tight leading-snug" style={{lineHeight: '1.25'}}>
                Help us improve your experience!
              </h3>
            </div>
            <button
              onClick={onClose}
              className="self-start text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full mt-0.5"
              aria-label="Close survey popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-start mb-4">
            <span className="inline-flex items-center text-gray-700 font-normal text-sm">
              <Clock className="w-4 h-4 mr-1 text-gray-500" />
              Only takes 60 seconds
            </span>
          </div>
          <button
            onClick={onStartSurvey}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 group text-base shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 creative-cta mb-2"
          >
            <span>Start now</span>
            <ArrowRight className="w-5 h-5 cta-arrow-animate" style={{ marginTop: '-1.5px', verticalAlign: 'middle' }} />
          </button>
          <div className="text-center mt-1">
            <button
              onClick={handleRemindLater}
              className="text-xs text-gray-500 underline hover:text-teal-600 focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              Remind me later
            </button>
          </div>
        </div>
      )}
      {showRemindDialog && (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-md px-6 py-4 text-sm text-gray-800 font-normal animate-fadeInDialog w-full max-w-xs relative flex items-center gap-3" style={{ minHeight: '48px', lineHeight: 1.6 }}>
          <span className="text-base" style={{opacity:0.7, flexShrink: 0}}>😊</span>
          <span className="flex-1 pr-6 break-words">We'll remind you in 7 days. Meanwhile, reach out via support if you need anything</span>
          <button
            onClick={handleDialogClose}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none"
            aria-label="Close dialog"
            style={{ background: 'none', border: 'none' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <style>{`
        .creative-gradient {
          background: linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%);
        }
        @keyframes fadeInDialog {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeInDialog {
          animation: fadeInDialog 0.4s cubic-bezier(0.23, 1.1, 0.32, 1);
        }
        @keyframes gentleBounce {
          0% { transform: translateY(0); }
          20% { transform: translateY(-3px); }
          50% { transform: translateY(2px); }
          80% { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
        .gentle-bounce {
          animation: gentleBounce 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes ctaArrowSlide {
          0% { transform: translateX(0); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        .cta-arrow-animate {
          animation: ctaArrowSlide 2.7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SurveyWidget;