import React, { useState, useCallback, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck, Sparkles, Sliders, Hash, Lock, AlertTriangle, Zap, History, Trash2, Code } from 'lucide-react';
import { DEFAULT_STRING_SETTINGS } from '../utils/constants';

export default function Generator() {
  // ==========================================
  // 1. useState Hooks (Managing Application State)
  // ==========================================
  const [length, setLength] = useState(DEFAULT_STRING_SETTINGS.length);
  const [includeUppercase, setIncludeUppercase] = useState(DEFAULT_STRING_SETTINGS.uppercase);
  const [includeLowercase, setIncludeLowercase] = useState(DEFAULT_STRING_SETTINGS.lowercase);
  const [includeNumbers, setIncludeNumbers] = useState(DEFAULT_STRING_SETTINGS.numbers);
  const [includeSymbols, setIncludeSymbols] = useState(DEFAULT_STRING_SETTINGS.symbols);
  const [customPrefix, setCustomPrefix] = useState('');
  const [generatedString, setGeneratedString] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [strength, setStrength] = useState({ label: 'Strong', color: 'text-emerald-400', bar: 75, bg: 'bg-emerald-500' });
  const [hookHighlight, setHookHighlight] = useState('useEffect'); // For interactive tutorial demo

  // ==========================================
  // 2. useCallback Hook (Memoizing Generator Logic)
  // ==========================================
  const generateString = useCallback(() => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Fallback if user unchecks all boxes
    if (!charset) {
      setGeneratedString('Please check at least one character type!');
      setStrength({ label: 'Invalid', color: 'text-red-400', bar: 10, bg: 'bg-red-500' });
      return;
    }

    let result = customPrefix;
    const remainingLength = Math.max(1, length - customPrefix.length);
    const array = new Uint32Array(remainingLength);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < remainingLength; i++) {
      result += charset[array[i] % charset.length];
    }

    setGeneratedString(result);

    // Calculate Entropy / Strength Score
    let score = 0;
    if (length >= 8) score += 20;
    if (length >= 14) score += 20;
    if (length >= 20) score += 20;
    if (includeUppercase && includeLowercase) score += 15;
    if (includeNumbers) score += 10;
    if (includeSymbols) score += 15;

    if (score <= 30) {
      setStrength({ label: 'Weak', color: 'text-red-400', bar: 25, bg: 'bg-red-500' });
    } else if (score <= 60) {
      setStrength({ label: 'Moderate', color: 'text-amber-400', bar: 50, bg: 'bg-amber-500' });
    } else if (score <= 85) {
      setStrength({ label: 'Strong', color: 'text-emerald-400', bar: 75, bg: 'bg-emerald-500' });
    } else {
      setStrength({ label: 'Unbreakable', color: 'text-teal-300 font-extrabold', bar: 100, bg: 'bg-gradient-to-r from-emerald-400 to-teal-400' });
    }

    // Add to history
    setHistory((prev) => {
      const filtered = prev.filter((s) => s.text !== result);
      return [{ id: Date.now(), text: result, strength: score > 85 ? 'Unbreakable' : score > 60 ? 'Strong' : 'Moderate' }, ...filtered].slice(0, 8);
    });
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, customPrefix]);

  // ==========================================
  // 3. useEffect Hook (Auto-triggering & Keyboard Listeners)
  // ==========================================
  useEffect(() => {
    // Whenever dependencies of generateString change, auto-regenerate!
    generateString();
  }, [generateString]);

  useEffect(() => {
    // Add keyboard listener: press Spacebar to regenerate quickly
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        generateString();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateString]);

  const handleCopy = () => {
    if (!generatedString || generatedString.startsWith('Please')) return;
    navigator.clipboard.writeText(generatedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-accent-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <KeyRound className="w-4 h-4" />
            <span>Internship Requirement #2</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Random String <span className="gradient-text">&amp; Password Generator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time string generation powered by cryptographic algorithms and strict React hook implementation (<code className="text-accent-300 font-mono text-xs">useState</code>, <code className="text-accent-300 font-mono text-xs">useCallback</code>, <code className="text-accent-300 font-mono text-xs">useEffect</code>).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-2xl bg-accent-500/10 border border-accent-500/30 text-xs font-bold text-accent-300 flex items-center gap-1.5 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-accent-400 animate-pulse" />
            Live Auto-Regeneration
          </span>
        </div>
      </div>

      {/* Main Display & Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Output Display Card (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary-400" />
                Generated Output
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800 ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
            </div>

            {/* String Display Box */}
            <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 md:p-6 mb-6 flex items-center justify-between gap-4 shadow-inner relative group min-h-[90px]">
              <p className="font-mono text-lg md:text-2xl font-bold text-white tracking-wider break-all leading-relaxed select-all">
                {generatedString}
              </p>
            </div>

            {/* Strength Meter Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Entropy Score</span>
                <span>{strength.bar}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${strength.bg}`}
                  style={{ width: `${strength.bar}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
              <button
                onClick={generateString}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all active:scale-95 shadow-md group"
              >
                <RefreshCw className="w-4 h-4 text-accent-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>Regenerate (Space)</span>
              </button>

              <button
                onClick={handleCopy}
                disabled={generatedString.startsWith('Please')}
                className="px-8 py-2.5 rounded-2xl bg-gradient-to-r from-accent-500 via-primary-500 to-emerald-500 hover:from-accent-600 hover:to-emerald-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-accent-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy String</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hook Interactive Showcase Box */}
          <div className="glass-card rounded-3xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-accent-400" />
                Hook Architecture Breakdown
              </h3>
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {['useState', 'useCallback', 'useEffect'].map((hook) => (
                  <button
                    key={hook}
                    onClick={() => setHookHighlight(hook)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      hookHighlight === hook
                        ? 'bg-accent-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {hook}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
              {hookHighlight === 'useState' && (
                <div>
                  <p className="text-accent-400 font-bold mb-1">// 1. useState: Manages slider length and checkbox toggles</p>
                  <p className="text-slate-400">const [length, setLength] = <span className="text-primary-300">useState</span>(16);</p>
                  <p className="text-slate-400">const [includeSymbols, setIncludeSymbols] = <span className="text-primary-300">useState</span>(true);</p>
                  <p className="text-slate-500 mt-2 text-[11px] font-sans">Every slider movement triggers an immediate React state update.</p>
                </div>
              )}
              {hookHighlight === 'useCallback' && (
                <div>
                  <p className="text-accent-400 font-bold mb-1">// 2. useCallback: Memoizes generator algorithm</p>
                  <p className="text-slate-400">const generateString = <span className="text-primary-300">useCallback</span>(() =&gt; &#123;</p>
                  <p className="text-slate-500 pl-4">/* Crypto random value generation */</p>
                  <p className="text-slate-400">&#125;, [length, includeUppercase, includeNumbers...]);</p>
                  <p className="text-slate-500 mt-2 text-[11px] font-sans">Prevents unnecessary function re-creation across re-renders unless options change.</p>
                </div>
              )}
              {hookHighlight === 'useEffect' && (
                <div>
                  <p className="text-accent-400 font-bold mb-1">// 3. useEffect: Automatically executes generation</p>
                  <p className="text-slate-400"><span className="text-primary-300">useEffect</span>(() =&gt; &#123;</p>
                  <p className="text-slate-300 pl-4">generateString(); <span className="text-slate-500">// Instant auto-update!</span></p>
                  <p className="text-slate-400">&#125;, [generateString]);</p>
                  <p className="text-slate-500 mt-2 text-[11px] font-sans">Observes the memoized callback and triggers seamlessly whenever dependencies change.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Configuration Controls (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-accent-400" />
              Customization Options
            </h3>

            {/* Length Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">String Length</label>
                <span className="px-3 py-1 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-300 font-mono text-sm font-bold">
                  {length} chars
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>4 (Min)</span>
                <span>16 (Default)</span>
                <span>64 (Max)</span>
              </div>
            </div>

            {/* Custom Prefix */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Custom Prefix <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={customPrefix}
                onChange={(e) => setCustomPrefix(e.target.value)}
                placeholder="e.g. REACT_, DEV_"
                maxLength={8}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-accent-500"
              />
            </div>

            {/* Checkbox Toggles */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Character Types
              </label>

              {[
                { label: 'Uppercase Letters (A-Z)', state: includeUppercase, setter: setIncludeUppercase, example: 'ABC' },
                { label: 'Lowercase Letters (a-z)', state: includeLowercase, setter: setIncludeLowercase, example: 'abc' },
                { label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers, example: '123' },
                { label: 'Symbols (!@#$%^&*)', state: includeSymbols, setter: setIncludeSymbols, example: '#$&' },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    item.state
                      ? 'bg-slate-900/80 border-slate-700 text-white shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 text-primary-500 focus:ring-0 cursor-pointer accent-primary-500"
                    />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                    {item.example}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* History List */}
          {history.length > 0 && (
            <div className="glass-card rounded-3xl p-6 border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-accent-400" />
                  Recent Generation History
                </h3>
                <button
                  onClick={() => setHistory([])}
                  className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setGeneratedString(item.text);
                      navigator.clipboard.writeText(item.text);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 flex items-center justify-between gap-2 cursor-pointer transition-all group"
                    title="Click to copy & restore"
                  >
                    <p className="font-mono text-xs text-slate-300 truncate font-medium group-hover:text-primary-300">
                      {item.text}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-semibold text-slate-400 shrink-0">
                      {item.strength}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
