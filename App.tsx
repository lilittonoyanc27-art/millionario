import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Hash,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Check,
  Percent,
} from 'lucide-react';
import { QUESTIONS_DATA, NUMBERS_DATA, PRIZE_LADDER } from './data';
import { OptionItem } from './types';
import { NumberBonusModal } from './NumberBonusModal';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playFanfareSound,
  speakSpanish,
  toggleMute,
  getIsMuted,
} from './audio';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionKey, setSelectedOptionKey] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCurrentAnswerCorrect, setIsCurrentAnswerCorrect] = useState<boolean | null>(null);

  // Translation visibility toggles
  const [showQuestionTranslation, setShowQuestionTranslation] = useState<boolean>(false);
  const [revealedOptionsTranslations, setRevealedOptionsTranslations] = useState<Record<string, boolean>>({});

  // 50:50 Lifeline
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [used5050, setUsed5050] = useState<boolean>(false);

  // Audience lifeline
  const [usedAudience, setUsedAudience] = useState<boolean>(false);
  const [showAudienceStats, setShowAudienceStats] = useState<boolean>(false);
  const [audienceStats, setAudienceStats] = useState<Record<string, number>>({});

  // Bonus modal
  const [isBonusModalOpen, setIsBonusModalOpen] = useState<boolean>(false);
  const [bonusScore, setBonusScore] = useState<number>(0);

  // Numbers table modal (all 20 numbers study reference)
  const [showNumbersTable, setShowNumbersTable] = useState<boolean>(false);

  // Sound muted state
  const [muted, setMuted] = useState<boolean>(getIsMuted());

  // Game completed state
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  // Ladder sidebar toggle on mobile
  const [showMobileLadder, setShowMobileLadder] = useState<boolean>(false);

  const currentQ = QUESTIONS_DATA[currentQuestionIndex];
  const currentNumberItem = NUMBERS_DATA[currentQuestionIndex] || NUMBERS_DATA[0];

  const handleToggleMute = () => {
    const newMuted = toggleMute();
    setMuted(newMuted);
  };

  // Switch question
  const goToQuestion = (index: number) => {
    playClickSound();
    setCurrentQuestionIndex(index);
    setSelectedOptionKey(null);
    setIsAnswerSubmitted(false);
    setIsCurrentAnswerCorrect(null);
    setShowQuestionTranslation(false);
    setRevealedOptionsTranslations({});
    setEliminatedOptions([]);
    setShowAudienceStats(false);
    setShowMobileLadder(false);
  };

  // Option selection
  const handleSelectOption = (opt: OptionItem) => {
    if (isAnswerSubmitted) return;
    playClickSound();
    setSelectedOptionKey(opt.key);
    setIsAnswerSubmitted(true);

    if (opt.isCorrect) {
      setIsCurrentAnswerCorrect(true);
      playCorrectSound();
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
      });

      // After 600ms open the numbers mini-game bonus
      setTimeout(() => {
        setIsBonusModalOpen(true);
      }, 700);
    } else {
      setIsCurrentAnswerCorrect(false);
      playWrongSound();
    }
  };

  // Move to next question
  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex < QUESTIONS_DATA.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    } else {
      setIsGameCompleted(true);
      playFanfareSound();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  // Retry current question
  const handleRetryQuestion = () => {
    playClickSound();
    setSelectedOptionKey(null);
    setIsAnswerSubmitted(false);
    setIsCurrentAnswerCorrect(null);
    setShowAudienceStats(false);
  };

  // Toggle question translation
  const handleToggleQuestionTranslation = () => {
    playClickSound();
    setShowQuestionTranslation((prev) => !prev);
  };

  // Toggle option translation
  const handleToggleOptionTranslation = (key: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound();
    setRevealedOptionsTranslations((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Lifeline: 50:50
  const handleUse5050 = () => {
    if (used5050 || isAnswerSubmitted) return;
    playClickSound();
    setUsed5050(true);

    // Pick 2 wrong options to eliminate
    const wrongOptions = currentQ.options.filter((o) => !o.isCorrect).map((o) => o.key);
    const shuffledWrong = [...wrongOptions].sort(() => 0.5 - Math.random());
    setEliminatedOptions(shuffledWrong.slice(0, 2));
  };

  // Lifeline: Ask Audience
  const handleUseAudience = () => {
    if (usedAudience || isAnswerSubmitted) return;
    playClickSound();
    setUsedAudience(true);

    // Generate biased stats favoring the correct option
    const correctPercent = Math.floor(Math.random() * 20) + 65; // 65-84%
    const remaining = 100 - correctPercent;
    const wrongKeys = currentQ.options.filter((o) => !o.isCorrect).map((o) => o.key);

    const share1 = Math.floor(Math.random() * (remaining - 4));
    const share2 = Math.floor(Math.random() * (remaining - share1 - 2));
    const share3 = remaining - share1 - share2;

    const stats: Record<string, number> = {
      [currentQ.correctKey]: correctPercent,
      [wrongKeys[0]]: share1,
      [wrongKeys[1]]: share2,
      [wrongKeys[2]]: share3,
    };

    setAudienceStats(stats);
    setShowAudienceStats(true);
  };

  // Pronounce Spanish dialog
  const handleSpeakQuestion = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToSpeak = `${currentQ.esDialog.speaker1} ${currentQ.esDialog.speaker2}`;
    speakSpanish(textToSpeak);
  };

  // Restart whole game
  const handleRestart = () => {
    playClickSound();
    setCurrentQuestionIndex(0);
    setSelectedOptionKey(null);
    setIsAnswerSubmitted(false);
    setIsCurrentAnswerCorrect(null);
    setShowQuestionTranslation(false);
    setRevealedOptionsTranslations({});
    setEliminatedOptions([]);
    setUsed5050(false);
    setUsedAudience(false);
    setShowAudienceStats(false);
    setBonusScore(0);
    setIsGameCompleted(false);
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#0c1329]/95 backdrop-blur-md border-b border-indigo-900/60 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300">
              <Trophy className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
                  Ո՞վ է ուզում դառնալ միլիոնատեր
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-900/70 border border-indigo-700 text-indigo-200 rounded">
                  Español & Հայերեն
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Անժամանակ ուսուցողական խաղ • 20 մակարդակ + իսպաներեն թվեր
              </p>
            </div>
          </div>

          {/* Controls: Audio, Numbers dictionary, Ladder toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNumbersTable(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-xs text-amber-300 font-medium transition-colors"
              title="20 Թվերի աղյուսակ (Números 100-1000)"
            >
              <Hash className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Թվերի ցանկ</span>
              <span className="md:hidden">100-1000</span>
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors"
              title={muted ? 'Միացնել ձայնը' : 'Անջատել ձայնը'}
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => setShowMobileLadder(!showMobileLadder)}
              className="lg:hidden px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold"
            >
              {currentQ.prizeMoney}
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center Area: Question & Lifelines & Options (Col 8/12) */}
        <main className="lg:col-span-8 flex flex-col gap-5">
          {/* Lifelines & Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900/90 via-indigo-950/70 to-slate-900/90 border border-indigo-900/80 p-3 sm:p-4 rounded-2xl shadow-md">
            {/* Question Progress indicator */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-black text-xs">
                ՀԱՐՑ {currentQuestionIndex + 1} / 20
              </span>
              <span className="text-sm font-semibold text-amber-300 font-mono">
                {currentQ.prizeMoney}
              </span>
              {bonusScore > 0 && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-400 bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  +{bonusScore} բոնուսային միավոր
                </span>
              )}
            </div>

            {/* Lifelines */}
            <div className="flex items-center gap-2">
              {/* 50:50 */}
              <button
                onClick={handleUse5050}
                disabled={used5050 || isAnswerSubmitted}
                title="50:50 — Հեռացնել 2 սխալ տարբերակ"
                className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider border transition-all ${
                  used5050
                    ? 'opacity-30 border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed line-through'
                    : 'bg-indigo-900/80 hover:bg-amber-500 hover:text-slate-950 border-amber-500/50 text-amber-300 shadow-sm active:scale-95'
                }`}
              >
                50 : 50
              </button>

              {/* Ask Audience */}
              <button
                onClick={handleUseAudience}
                disabled={usedAudience || isAnswerSubmitted}
                title="Դահլիճի օգնություն (Տոկոսային քվեարկություն)"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  usedAudience
                    ? 'opacity-30 border-slate-700 bg-slate-900 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-900/80 hover:bg-amber-500 hover:text-slate-950 border-amber-500/50 text-amber-300 shadow-sm active:scale-95'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Դահլիճ</span>
              </button>

              {/* Audio Listen */}
              <button
                onClick={handleSpeakQuestion}
                title="Լսել իսպաներեն երկխոսության արտասանությունը"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 transition-all active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Լսել</span>
              </button>

              {/* Numbers round shortcut */}
              <button
                onClick={() => setIsBonusModalOpen(true)}
                title="Կռահիր թիվը (Այս հարցի թիվը՝ 100-1000)"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 transition-all active:scale-95"
              >
                <Hash className="w-3.5 h-3.5 text-amber-400" />
                <span>Թիվ #{currentQuestionIndex + 1}</span>
              </button>
            </div>
          </div>

          {/* Audience Poll Modal / Stats Display if active */}
          {showAudienceStats && (
            <div className="bg-indigo-950/90 border border-amber-500/50 rounded-2xl p-4 shadow-lg animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Percent className="w-4 h-4" /> Դահլիճի ձայները (Votación del público):
                </span>
                <button
                  onClick={() => setShowAudienceStats(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {currentQ.options.map((opt) => {
                  const percent = audienceStats[opt.key] || 0;
                  return (
                    <div key={opt.key} className="bg-slate-900/80 p-2 rounded-xl text-center border border-indigo-900">
                      <div className="text-xs font-black text-amber-300 uppercase">{opt.key})</div>
                      <div className="h-16 w-full bg-slate-800 rounded-md overflow-hidden flex items-end my-1">
                        <div
                          className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-b transition-all duration-700"
                          style={{ height: `${percent}%` }}
                        />
                      </div>
                      <div className="text-xs font-bold text-white">{percent}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUESTION CARD (Clickable to reveal / toggle Armenian translation) */}
          <div
            onClick={handleToggleQuestionTranslation}
            role="button"
            tabIndex={0}
            className={`relative group cursor-pointer select-none rounded-3xl p-6 sm:p-8 transition-all border-2 ${
              showQuestionTranslation
                ? 'bg-gradient-to-b from-[#111a3b] to-[#0c142c] border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
                : 'bg-gradient-to-b from-[#0f1738] to-[#090e24] border-indigo-700/80 hover:border-amber-400/70 shadow-xl'
            }`}
          >
            {/* Corner diamond/hexagon styled indicators */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-indigo-900 border border-amber-500/60 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow">
              {showQuestionTranslation ? 'ՀԱՅԵՐԵՆ ԹԱՐԳՄԱՆՈՒԹՅՈՒՆԸ ԲԱՑՎԱԾ Է' : 'ՍԵՂՄԵՔ ՀԱՐՑԻՆ՝ ԹԱՐԳՄԱՆՈՒԹՅԱՆ ՀԱՄԱՐ'}
            </div>

            {/* Spanish Dialog (Primary) */}
            <div className="space-y-3 mb-3">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">🇪🇸</span> Իսպաներեն երկխոսություն (Español):
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  {showQuestionTranslation ? 'Փակել հայերենը' : 'Կտտացրեք՝ բացելու հայերենը'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800/60 text-base sm:text-lg font-medium leading-relaxed text-slate-100 space-y-2">
                <p className="text-amber-100/90">{currentQ.esDialog.speaker1}</p>
                <p className="text-white font-semibold">{currentQ.esDialog.speaker2}</p>
              </div>
            </div>

            {/* Armenian Translation Section (Revealed on click) */}
            {showQuestionTranslation && (
              <div className="pt-3 border-t border-amber-500/30 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-2">
                  <span className="text-base">🇦🇲</span> Հայերեն թարգմանություն՝
                </div>
                <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/40 text-sm sm:text-base leading-relaxed text-amber-100 space-y-2">
                  <p>{currentQ.hyDialog.speaker1}</p>
                  <p className="font-semibold text-white">{currentQ.hyDialog.speaker2}</p>
                </div>
              </div>
            )}

            {/* Click hint footer */}
            <div className="mt-3 text-center">
              <span className="text-[11px] text-slate-400/80 group-hover:text-slate-200 transition-colors">
                👆 Սեղմեք այս դաշտին ցանկացած պահի՝ հայերեն թարգմանությունը միացնելու/անջատելու համար
              </span>
            </div>
          </div>

          {/* 4 Answer Options (Millionaire Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt) => {
              const isEliminated = eliminatedOptions.includes(opt.key);
              const isSelected = selectedOptionKey === opt.key;
              const isRevealedArmenian = !!revealedOptionsTranslations[opt.key];

              if (isEliminated) {
                return (
                  <div
                    key={opt.key}
                    className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-600 opacity-40 select-none flex items-center justify-between"
                  >
                    <span className="font-bold font-mono uppercase text-slate-600">{opt.key}) ———</span>
                  </div>
                );
              }

              // Styling according to game state
              let cardStyle =
                'bg-gradient-to-r from-[#0c142c] to-[#0f1738] border-indigo-700/80 text-white hover:border-amber-400 hover:from-indigo-900/60 hover:to-indigo-950/80 hover:shadow-[0_0_18px_rgba(245,158,11,0.2)]';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  cardStyle =
                    'bg-gradient-to-r from-emerald-950 to-emerald-900 border-emerald-400 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-pulse';
                } else if (isSelected && !opt.isCorrect) {
                  cardStyle =
                    'bg-gradient-to-r from-rose-950 to-rose-900 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
                } else {
                  cardStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                cardStyle = 'bg-amber-500/20 border-amber-400 text-amber-200';
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt)}
                  role="button"
                  tabIndex={0}
                  className={`group relative p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between gap-2 ${cardStyle}`}
                >
                  {/* Top line: Key and Spanish option */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-mono font-black text-amber-300 text-sm">
                        {opt.key.toUpperCase()}
                      </span>
                      <span className="text-base sm:text-lg font-bold tracking-wide">
                        {opt.es}
                      </span>
                    </div>

                    {/* Status icons or Armenian peek button */}
                    <div className="flex items-center gap-1.5">
                      {isAnswerSubmitted && opt.isCorrect && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold">
                          <Check className="w-3.5 h-3.5" /> Ճիշտ
                        </span>
                      )}
                      {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-extrabold">
                          <XCircle className="w-3.5 h-3.5" /> Սխալ
                        </span>
                      )}

                      {/* Clickable translation badge for the option */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleOptionTranslation(opt.key, e)}
                        className={`text-[11px] px-2 py-1 rounded-md border transition-all ${
                          isRevealedArmenian
                            ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                            : 'bg-indigo-950/70 text-indigo-300 border-indigo-700/60 hover:text-amber-300 hover:border-amber-400'
                        }`}
                        title="Կտտացրեք՝ տեսնելու հայերեն թարգմանությունը"
                      >
                        🇦🇲 {isRevealedArmenian ? 'Թաքցնել' : 'Թարգմանել'}
                      </button>
                    </div>
                  </div>

                  {/* Armenian translation row (shown when toggled or after answer submitted) */}
                  {(isRevealedArmenian || isAnswerSubmitted) && (
                    <div className="text-xs font-medium text-amber-300/90 bg-black/30 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center justify-between">
                      <span>Հայերեն՝ <strong>{opt.hy}</strong></span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(opt.es);
                        }}
                        className="p-1 rounded hover:bg-white/10 text-amber-300"
                        title="Լսել բառը"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result Feedback Banner & Continue Buttons */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 animate-fadeIn flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isCurrentAnswerCorrect
                  ? 'bg-gradient-to-r from-emerald-950/90 to-slate-900 border-emerald-500/70 shadow-lg'
                  : 'bg-gradient-to-r from-amber-950/80 via-slate-900 to-rose-950/80 border-amber-500/70 shadow-lg'
              }`}
            >
              <div className="space-y-1 text-center sm:text-left">
                {isCurrentAnswerCorrect ? (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 font-extrabold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ¡Respuesta Correcta! Հիանալի պատասխան։
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {currentQ.explanation}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-300 font-extrabold text-base">
                      <HelpCircle className="w-5 h-5 text-amber-400" />
                      Պատասխանը սխալ էր, բայց խաղը շարունակվում է։
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Ճիշտ տարբերակն է՝ <strong className="text-emerald-400">{currentQ.correctKey.toUpperCase()}) {currentQ.options.find(o => o.isCorrect)?.es}</strong> — {currentQ.explanation}
                    </p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {!isCurrentAnswerCorrect && (
                  <button
                    onClick={handleRetryQuestion}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-indigo-700 bg-indigo-950 hover:bg-indigo-900 text-xs font-bold text-slate-200 transition-colors"
                  >
                    Կրկին փորձել
                  </button>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Շարունակել</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Answer Letter Indicator at the bottom (straight/upright, extra small font, only the letter) */}
          <div className="pt-3 pb-1 border-t border-indigo-900/40 flex items-center justify-between text-[10px] text-slate-600/80 select-none">
            <span className="text-[9px] text-slate-500">
              հուշում՝
            </span>
            <div
              className="inline-block font-mono text-[9px] font-medium text-slate-500 bg-indigo-950/40 border border-indigo-900/60 hover:text-amber-400 hover:border-amber-500/40 transition-colors px-1.5 py-0.5 rounded cursor-default"
              title="Ճիշտ պատասխանի տառը"
            >
              {currentQ.correctKey}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Millionaire Money Ladder & Question Navigator (Col 4/12) */}
        <aside
          className={`lg:col-span-4 bg-[#0a0f26]/95 border border-indigo-900/90 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 lg:static fixed inset-x-3 bottom-3 top-20 z-40 overflow-y-auto lg:overflow-visible lg:block ${
            showMobileLadder ? 'block' : 'hidden'
          }`}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex items-center justify-between pb-3 border-b border-indigo-800">
            <span className="font-bold text-amber-300 text-sm">Մրցանակային սանդղակ</span>
            <button
              onClick={() => setShowMobileLadder(false)}
              className="px-2.5 py-1 bg-slate-800 text-white rounded text-xs"
            >
              Փակել ✕
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-indigo-900/80">
            <span>Մակարդակ / Հարց</span>
            <span>Մրցանակ</span>
          </div>

          {/* 20 Levels List (from 20 down to 1) */}
          <div className="space-y-1 max-h-[620px] overflow-y-auto pr-1">
            {[...PRIZE_LADDER].map((prize, idx) => {
              const qIndex = 19 - idx; // 19 down to 0
              const isCurrent = qIndex === currentQuestionIndex;
              const isPassed = qIndex < currentQuestionIndex;
              const isMilestone = qIndex === 4 || qIndex === 9 || qIndex === 14 || qIndex === 19;

              let rowStyle = 'bg-transparent text-slate-400 hover:bg-indigo-950/60';

              if (isCurrent) {
                rowStyle =
                  'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25 scale-[1.02] border border-amber-300';
              } else if (isPassed) {
                rowStyle = 'text-emerald-400 bg-emerald-950/20';
              } else if (isMilestone) {
                rowStyle = 'text-amber-300 font-bold bg-amber-950/20 border border-amber-500/20';
              }

              return (
                <button
                  key={qIndex}
                  onClick={() => goToQuestion(qIndex)}
                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${rowStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-right font-bold text-[11px]">
                      {qIndex + 1}
                    </span>
                    <span className="text-[11px] font-sans">
                      {isCurrent ? '▶ ' : isPassed ? '✓ ' : '• '}
                      Հարց {qIndex + 1}
                    </span>
                  </div>
                  <span className="font-bold tracking-wider">{prize}</span>
                </button>
              );
            })}
          </div>

          {/* Current number corresponding to this question (Digits only with oral challenge) */}
          <div className="mt-3 pt-3 border-t border-indigo-900/80 bg-indigo-950/40 p-3 rounded-2xl border border-indigo-800/40">
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-1 flex items-center justify-between">
              <span>Բանավոր թիվ #{currentNumberItem.id}՝</span>
              <span className="text-[10px] text-slate-400">100-1000</span>
            </div>
            <div className="flex items-center justify-between gap-2 my-1">
              <span className="text-2xl font-black font-mono text-amber-300">
                {currentNumberItem.number}
              </span>
              <button
                onClick={() => setIsBonusModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Բացել բանավոր կռահման փուլը"
              >
                <span>🗣️ Կռահել</span>
              </button>
            </div>
            <div className="text-[10px] text-slate-400">
              Ասեք թիվը իսպաներենով և ստուգեք ինքներդ ձեզ
            </div>
          </div>
        </aside>
      </div>

      {/* Bonus Number Guessing Modal (Triggered on every correct answer or on demand) */}
      <NumberBonusModal
        currentQuestionId={currentQ.id}
        isOpen={isBonusModalOpen}
        onClose={() => setIsBonusModalOpen(false)}
        onSuccess={() => setBonusScore((prev) => prev + 100)}
      />

      {/* All 20 Numbers Dictionary Modal */}
      {showNumbersTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c142c] via-[#090e24] to-[#070b19] border-2 border-amber-500/70 rounded-3xl p-6 text-white max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-indigo-800">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-amber-300">
                    20 Թվերը 100-ից մինչև 1000 իսպաներենով
                  </h3>
                  <p className="text-xs text-slate-400">
                    Números de 100 a 1000 con respuestas en español y armenio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNumbersTable(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
              >
                Փակել ✕
              </button>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
              {NUMBERS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/60 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-black text-xs flex items-center justify-center">
                      {item.id}
                    </span>
                    <div>
                      <div className="text-base font-black text-amber-300 font-mono tracking-wide">
                        {item.number}{' '}
                        <span className="text-sm font-sans font-semibold text-white">
                          — {item.spanish}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        🇦🇲 {item.armenianNote}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakSpanish(item.spanish)}
                    className="p-2 rounded-lg bg-indigo-900/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-colors"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-indigo-800 flex justify-end">
              <button
                onClick={() => setShowNumbersTable(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
              >
                Հասկանալի է
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory / Grand Prize Modal if all 20 questions completed */}
      {isGameCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#111a3b] via-[#0d142d] to-[#070b19] border-2 border-amber-400 rounded-3xl p-8 text-center text-white shadow-[0_0_80px_rgba(245,158,11,0.4)]">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-500/40 mb-4 animate-bounce">
              <Trophy className="w-10 h-10 text-slate-950" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 mb-2">
              ¡FELICIDADES! ԴՈՒՔ ՄԻԼԻՈՆԱՏԵՐ ԵՔ:
            </h2>

            <p className="text-sm text-slate-300 mb-6">
              Դուք հաջողությամբ անցաք բոլոր 20 իսպաներեն-հայերեն հարցերը և թվերի բոնուսային փուլերը։
            </p>

            <div className="p-4 bg-indigo-950/80 border border-amber-500/40 rounded-2xl mb-6">
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Վաստակած մրցանակ
              </div>
              <div className="text-3xl font-black text-white font-mono mt-1">
                1,000,000 ֏
              </div>
              {bonusScore > 0 && (
                <div className="text-xs text-amber-300 mt-1">
                  + {bonusScore} բոնուսային միավոր թվերի կռահումից
                </div>
              )}
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
            >
              <RotateCcw className="w-4 h-4" />
              Խաղալ կրկին (Jugar de nuevo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
