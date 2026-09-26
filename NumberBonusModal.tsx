import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, ArrowRight, Eye, CheckCircle2, RotateCcw } from 'lucide-react';
import { NumberBonusItem } from './types';
import { NUMBERS_DATA } from './data';
import { playCorrectSound, playClickSound, speakSpanish } from './audio';

interface NumberBonusModalProps {
  currentQuestionId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NumberBonusModal: React.FC<NumberBonusModalProps> = ({
  currentQuestionId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const targetItem: NumberBonusItem = useMemo(() => {
    const item = NUMBERS_DATA.find((n) => n.id === currentQuestionId);
    return item || NUMBERS_DATA[0];
  }, [currentQuestionId]);

  // Is the answer revealed?
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  // User's self evaluation: 'correct' | 'wrong' | null
  const [evaluation, setEvaluation] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsRevealed(false);
      setEvaluation(null);
    }
  }, [isOpen, targetItem]);

  if (!isOpen) return null;

  const handleReveal = () => {
    playClickSound();
    setIsRevealed(true);
    // Pronounce the Spanish number when revealed
    speakSpanish(targetItem.spanish);
  };

  const handleAudio = () => {
    speakSpanish(targetItem.spanish);
  };

  const handleSelfGrade = (isCorrectGuess: boolean) => {
    playClickSound();
    if (isCorrectGuess) {
      setEvaluation('correct');
      playCorrectSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      onSuccess();
    } else {
      setEvaluation('wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-500/70 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.25)] p-6 sm:p-8 text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-indigo-800/80">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Բոնուսային Փուլ • Բանավոր կռահում
              </div>
              <div className="text-[11px] text-indigo-300">
                Adivina el número en español (№ {targetItem.id} / 20)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors"
          >
            Բաց թողնել ✕
          </button>
        </div>

        {/* Central Display: ONLY DIGITS SHOWN */}
        <div className="my-6 text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Թիվը (ցուցադրված է միայն թվանշաններով)
          </div>

          {/* Big number digit card */}
          <div className="py-6 px-8 rounded-2xl bg-indigo-950/90 border-2 border-amber-500/60 shadow-inner flex flex-col items-center justify-center gap-2">
            <span className="text-5xl sm:text-6xl font-black font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-500 drop-shadow-md">
              {targetItem.number}
            </span>
            <span className="text-xs font-semibold text-indigo-300 bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-700/50 mt-1">
              🗣️ Ասեք այս թիվը իսպաներենով բանավոր
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-3">
            Նախ ասեք թիվը բանավոր (կամ մտքում), հետո սեղմեք կոճակը՝ ստուգելու համար։
          </p>
        </div>

        {/* Reveal Button or Revealed Answer */}
        {!isRevealed ? (
          <div className="flex justify-center mb-4">
            <button
              onClick={handleReveal}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Eye className="w-4 h-4 text-slate-950" />
              <span>Տեսնել պատասխանը (Ստուգել)</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-6 animate-fadeIn">
            {/* The revealed Spanish text & Armenian translation */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-indigo-900/80 to-indigo-950 border-2 border-amber-400/80 text-center shadow-lg">
              <div className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold mb-1">
                🇪🇸 Իսպաներեն պատասխանը՝
              </div>
              <div className="flex items-center justify-center gap-2.5 my-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-wide">
                  « {targetItem.spanish} »
                </span>
                <button
                  onClick={handleAudio}
                  title="Կրկին լսել արտասանությունը"
                  className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 active:scale-95 transition-all"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs text-amber-200/90 mt-2 pt-2 border-t border-indigo-800">
                🇦🇲 Հայերեն՝ <strong>{targetItem.armenianNote}</strong>
              </div>
            </div>

            {/* Self evaluation buttons */}
            {evaluation === null ? (
              <div className="space-y-2">
                <div className="text-center text-xs font-semibold text-slate-300">
                  Ճի՞շտ էիք ասել բանավոր.
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSelfGrade(true)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-400 shadow-md transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Այո, ճիշտ ասացի!</span>
                  </button>

                  <button
                    onClick={() => handleSelfGrade(false)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-600 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Սխալվեցի (կրկնել)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {evaluation === 'correct' ? (
                  <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-bold animate-bounce">
                    🎉 ¡Muy bien! Դուք ճիշտ կռահեցիք բանավոր (+100 բոնուս)
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-950/80 border border-amber-500/60 rounded-xl text-amber-200 text-xs">
                    👍 Ոչինչ, լսեք արտասանությունը 🔊 և փորձեք բարձրաձայն կրկնել։
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-end pt-2 border-t border-indigo-900/60">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-900 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all border border-indigo-800"
          >
            <span>Շարունակել խաղը</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
