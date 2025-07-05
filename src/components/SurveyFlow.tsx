import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react';
import ReactDOM from 'react-dom';

interface SurveyFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (responses: SurveyResponse[]) => void;
}

interface SurveyResponse {
  question: string;
  answer: string;
  questionId: string;
}

const questions = [
  {
    id: 'benefits_satisfaction',
    question: 'How satisfied are your employees with Loop Health benefits?',
    type: 'rating',
    leftLabel: '😞 Poor',
    rightLabel: 'Excellent 🤩',
  },
  {
    id: 'employee_friction',
    question: 'What is the biggest friction point your employees face when using Loop Health?',
    type: 'multiselect',
    options: [
      'Finding the right doctor/provider',
      "Understanding what's covered",
      'Claim reimbursement process',
      'Getting pre-approvals',
      'Using the app/website',
      'No major friction',
    ],
    addOther: true,
  },
  {
    id: 'support_helpfulness',
    question: 'How helpful is Loop Health support when you need help?',
    type: 'rating',
    leftLabel: 'Not helpful',
    rightLabel: 'Very helpful',
  },
  {
    id: 'dashboard_missing_info',
    question: 'Is there any important info or report missing from the dashboard that would help you in your work?',
    type: 'text',
    placeholder: 'Type your answer',
  },
  {
    id: 'hr_tools_integration',
    question: 'Do you wish Loop Health worked better with your other HR tools?',
    type: 'multiselect',
    options: [
      'Yes, with HR management software',
      'Yes, with payroll systems',
      'Yes, for exporting/importing data',
      'No, it works well',
      'Not sure',
    ],
    addOther: false,
  },
  {
    id: 'change_or_add',
    question: "Anything else you'd like to change or improve about Loop Health?",
    type: 'text',
    placeholder: 'Type your answer',
  },
];

const SurveyFlow: React.FC<SurveyFlowProps> = ({ isOpen, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customText, setCustomText] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiKey, setEmojiKey] = useState(0); // For re-triggering animation
  const [customInputError, setCustomInputError] = useState('');
  const customInputWordLimit = 5;
  const [showThankYou, setShowThankYou] = useState(false);
  const [ratingComment, setRatingComment] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{left: number, top: number} | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [isModalExiting, setIsModalExiting] = useState(false);
  const [isModalImploding, setIsModalImploding] = useState(false);

  // Initialize emoji on mount for rating questions
  useEffect(() => {
    const question = questions[currentQuestion];
    if (question.type === 'rating') {
      setTimeout(() => {
        setShowEmoji(true);
      }, 300);
    } else {
      setShowEmoji(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (showTooltip && nextBtnRef.current) {
      const rect = nextBtnRef.current.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8 // 8px margin below button
      });
    } else if (!showTooltip) {
      setTooltipPos(null);
    }
  }, [showTooltip]);

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => setShowThankYou(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

  // Move conditional return after all hooks
  if (!isOpen && !showThankYou) return null;

  const getEmojiForRating = (rating: number) => {
    if (rating === 1) return '😞';
    if (rating === 2) return '😐';
    if (rating === 3) return '🙂';
    if (rating === 4) return '😊';
    return '🤩';
  };

  const getRatingLabel = (rating: number) => {
    if (rating === 1) return 'Poor';
    if (rating === 2) return 'Below Average';
    if (rating === 3) return 'Average';
    if (rating === 4) return 'Good';
    return 'Excellent';
  };

  const handleRatingChange = (value: string) => {
    setCurrentAnswer(value);
    setShowEmoji(false);
    
    // Trigger emoji animation after a brief delay
    setTimeout(() => {
      setShowEmoji(true);
      setEmojiKey(prev => prev + 1); // Force re-render for animation
    }, 150);
  };

  const handleNext = () => {
    // Only animate for questions 0-5 (1-6 in UI)
    if (currentQuestion >= 0 && currentQuestion < 5) {
      setIsSliding(true);
      setTimeout(() => {
        setIsSliding(false);
        goToNextQuestion();
      }, 400); // match animation duration
    } else {
      goToNextQuestion();
    }
  };

  const goToNextQuestion = () => {
    const question = questions[currentQuestion];
    let answerToSave = '';
    if (question.type === 'multiselect') {
      const allAnswers = [...selectedOptions];
      if (customText.trim()) {
        allAnswers.push(customText.trim());
      }
      answerToSave = allAnswers.join(', ');
    } else if (question.type === 'rating') {
      answerToSave = currentAnswer as string;
      if (ratingComment.trim()) {
        answerToSave += ` | Comment: ${ratingComment.trim()}`;
      }
    } else {
      answerToSave = currentAnswer as string;
    }
    if (answerToSave.toString().trim()) {
      const newResponse: SurveyResponse = {
        question: question.question,
        answer: answerToSave,
        questionId: question.id
      };
      const updatedResponses = [...responses, newResponse];
      setResponses(updatedResponses);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAnswer(questions[currentQuestion + 1].type === 'rating' ? "" : '');
        setSelectedOptions([]);
        setCustomText('');
        setShowCustomInput(false);
        setShowEmoji(false);
        setRatingComment('');
      } else {
        // Animate modal implode, then show thank you
        setIsModalImploding(true);
        setTimeout(() => {
          setIsModalImploding(false);
          onComplete(updatedResponses);
          onClose();
          setTimeout(() => setShowThankYou(true), 350); // Show thank you after modal implodes
        }, 600); // match implode animation duration
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevResponse = responses[currentQuestion - 1];
      if (prevResponse) {
        const prevQuestion = questions[currentQuestion - 1];
        if (prevQuestion.type === 'multiselect') {
          const answers = prevResponse.answer.split(', ');
          const standardOptions = answers.filter(answer => 
            prevQuestion.options?.includes(answer)
          );
          const customOption = answers.find(answer => 
            !prevQuestion.options?.includes(answer)
          );
          setSelectedOptions(standardOptions);
          setCustomText(customOption || '');
          setShowCustomInput(!!customOption);
        } else {
          setCurrentAnswer(prevResponse.answer);
        }
      }
      setResponses(responses.slice(0, -1));
      setShowEmoji(false);
    }
  };

  const handleMultiSelectToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleCustomOptionAdd = () => {
    if (customText.trim()) {
      setShowCustomInput(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentRating = parseInt(currentAnswer as string) || 3;

  const canProceed = () => {
    if (question.type === 'multiselect') {
      return selectedOptions.length > 0 || customText.trim();
    }
    if (question.type === 'rating') {
      return currentAnswer !== "" || ratingComment.trim().length > 0;
    }
    return (currentAnswer as string).trim();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl max-h-[700px] flex flex-col overflow-hidden">
            {/* Removed Color Flash Layer for consistent animation */}
            {/* Modal Card */}
            <div className={`bg-white rounded-lg shadow-xl w-full h-full flex flex-col overflow-hidden z-10 transition-all duration-500
  ${isModalImploding ? 'animate-modal-implode' : isModalExiting ? 'animate-modal-exit' : 'animate-modal-enter'}`}>
              {/* Header - Fixed */}
              <div className="p-6 border-b border-gray-200 flex-shrink-0 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-gray-900">Help us improve your experience!</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="font-medium">{Math.round(progress)}% Complete</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gray-300 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              
              {/* Content - Scrollable, fixed height for consistent modal size */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className={`p-6 h-full flex flex-col transition-transform duration-400 ease-in-out ${isSliding ? 'animate-slide-left-once' : ''}`}>
                  {/* Question - Most Prominent */}
                  <h3 className="text-xl font-bold text-gray-900 mb-6 leading-tight">
                    {question.question}
                  </h3>
                  {/* For multi-select, make options area scrollable if too many options */}
                  {question.type === 'multiselect' ? (
                    <div className="space-y-3 h-[220px] overflow-y-auto pr-1">
                      <p className="text-sm text-gray-600 mb-4 font-medium">Select all that apply:</p>
                      {question.options?.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleMultiSelectToggle(option)}
                          className={`w-full p-4 text-left rounded-lg border transition-all ${
                            selectedOptions.includes(option)
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              selectedOptions.includes(option)
                                ? 'border-teal-500 bg-teal-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedOptions.includes(option) && (
                                <CheckCircle className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span className="font-medium">{option}</span>
                          </div>
                        </button>
                      ))}
                      {/* Custom Option - input with word count validation */}
                      {question.addOther && (
                        <input
                          type="text"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Add other..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none font-medium"
                        />
                      )}
                    </div>
                  ) : (
                    <>
                      {question.type === 'rating' && (
                        <div className="space-y-6">
                          {/* Rating Scale - Pixel-perfect two-track slider, no overlap, handle reaches ends */}
                          <div className="space-y-4">
                            <div className="flex justify-between text-sm font-medium text-gray-600 px-1">
                              <span className="flex items-center gap-1">{question.leftLabel}</span>
                              <span className="flex items-center gap-1">{question.rightLabel}</span>
                            </div>
                            <div className="relative w-full h-6 flex items-center">
                              {/* Filled Track */}
                              <div
                                className="absolute h-3 bg-teal-600 rounded-lg"
                                style={{
                                  left: 0,
                                  width: `${((currentRating - 1) / 4) * 100}%`,
                                  zIndex: 1,
                                }}
                              />
                              {/* Unfilled Track */}
                              <div
                                className="absolute h-3 bg-gray-200 rounded-lg"
                                style={{
                                  left: `${((currentRating - 1) / 4) * 100}%`,
                                  right: 0,
                                  zIndex: 0,
                                }}
                              />
                              {/* Slider */}
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={currentAnswer || ""}
                                onChange={(e) => handleRatingChange(e.target.value)}
                                className="w-full h-3 bg-transparent appearance-none slider"
                                style={{ position: 'relative', zIndex: 2 }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                              {[1, 2, 3, 4, 5].map(num => (
                                <span key={num} className={currentRating === num ? 'text-teal-600 font-bold' : ''}>
                                  {num}
                                </span>
                              ))}
                            </div>
                            <div style={{ minHeight: '80px' }}>
                              <div>
                                <div className="text-center">
                                  <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-md text-base font-medium">
                                    {`${currentRating}/5 - ${getRatingLabel(currentRating)}`}
                                  </span>
                                </div>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    value={ratingComment || ''}
                                    onChange={e => setRatingComment(e.target.value)}
                                    placeholder="Add a comment (optional)"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none text-sm bg-gray-50"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'text' && (
                        <div className="space-y-2">
                          <textarea
                            value={currentAnswer as string}
                            onChange={e => setCurrentAnswer(e.target.value)}
                            placeholder={question.placeholder || 'Type your answer...'}
                            rows={5}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none font-medium resize-none text-base bg-gray-50"
                          />
                          <div className="text-xs text-gray-400 text-right">
                            {`${(currentAnswer as string).length}/500`}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Footer - Fixed */}
              <div className="p-6 border-t border-gray-200 flex-shrink-0 bg-gray-50">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBack}
                    disabled={currentQuestion === 0}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium ${
                      currentQuestion === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <div className="relative" onMouseEnter={() => {
                    if (!canProceed() && question.type === 'rating') setShowTooltip(true);
                  }} onMouseLeave={() => setShowTooltip(false)} onClick={() => {
                    if (!canProceed() && question.type === 'rating') setShowTooltip(true);
                  }}>
                    <button
                      ref={nextBtnRef}
                      onClick={canProceed() ? handleNext : undefined}
                      disabled={!canProceed()}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all relative ${
                        canProceed()
                          ? 'bg-teal-600 hover:bg-teal-700 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {/* Tooltip for disabled Next button - Portal, positioned in viewport */}
                    {showTooltip && !canProceed() && question.type === 'rating' && tooltipPos && ReactDOM.createPortal(
                      <div
                        style={{
                          position: 'fixed',
                          left: tooltipPos.left,
                          top: tooltipPos.top,
                          transform: 'translateX(-50%)',
                          zIndex: 9999
                        }}
                        className="px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg w-fit min-w-[200px] max-w-[90vw] break-words text-center animate-fadeInTooltip"
                      >
                        Please move the scaler to select an input
                        <style>{`
                          @keyframes fadeInTooltip {
                            0% { opacity: 0; transform: translateY(8px) scale(0.98); }
                            100% { opacity: 1; transform: translateY(0) scale(1); }
                          }
                          .animate-fadeInTooltip {
                            animation: fadeInTooltip 0.2s cubic-bezier(0.23, 1.1, 0.32, 1);
                          }
                        `}</style>
                      </div>,
                      document.body
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showThankYou && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-thankyou-scale-in">
            <div className="text-3xl mb-4 animate-emoji-pulse">🤗</div>
            <h2 className="text-xl font-bold mb-2 text-gray-900 text-center">Thank you for your feedback!</h2>
            <p className="text-gray-600 mb-6 text-center">We appreciate you taking the time to help us improve. Your input makes a difference</p>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
              onClick={() => setShowThankYou(false)}
            >
              Close
            </button>
          </div>
          <style>{`
            @keyframes thankyouScaleIn {
              0% { opacity: 0; transform: scale(0); }
              70% { opacity: 1; transform: scale(1.08); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-thankyou-scale-in {
              animation: thankyouScaleIn 0.55s cubic-bezier(0.23, 1.1, 0.32, 1);
            }
            @keyframes emojiPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.18); }
            }
            .animate-emoji-pulse {
              animation: emojiPulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            @keyframes modalExit {
              0% { opacity: 1; transform: translateY(0) scale(1); }
              100% { opacity: 0; transform: translateY(60px) scale(0.98); }
            }
            @keyframes modalEnter {
              0% { opacity: 0; transform: translateY(-20px) scale(0.98); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-modal-exit {
              animation: modalExit 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
            }
            .animate-modal-enter {
              animation: modalEnter 0.5s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes modalImplode {
              0% { opacity: 1; transform: scale(1); border-radius: 1rem; }
              80% { opacity: 0.7; transform: scale(0.7); border-radius: 2rem; }
              100% { opacity: 0; transform: scale(0); border-radius: 50%; }
            }
            .animate-modal-implode {
              animation: modalImplode 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
            }
          `}</style>
        </div>
      )}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base font-medium animate-fadeInToast">
          Thanks for your feedback!
          <style>{`
            @keyframes fadeInToast {
              0% { opacity: 0; transform: translateY(20px) scale(0.98); }
              60% { opacity: 1; transform: translateY(-4px) scale(1.03); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fadeInToast {
              animation: fadeInToast 0.5s cubic-bezier(0.23, 1.1, 0.32, 1);
            }
          `}</style>
        </div>
      )}
      <style>{`
        @keyframes slideLeftOnce {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-60px); }
        }
        .animate-slide-left-once {
          animation: slideLeftOnce 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default SurveyFlow;