import React, { useState, useEffect } from 'react';
import { Languages, Volume2, Copy, Check, ArrowRight, RotateCcw, Sparkles, ShieldAlert, Globe, History, Trash2, ArrowRightLeft } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { translateText } from '../services/rapidApi';

export default function Translator({ onOpenApiKeyModal }) {
  const [inputText, setInputText] = useState('Welcome to my React internship portfolio! I love building dynamic web applications.');
  const [targetLang, setTargetLang] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('translator_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }, []);

  const saveToHistory = (source, translated, langCode) => {
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || { name: langCode, flag: '🌐' };
    const newItem = {
      id: Date.now(),
      source,
      translated,
      langName: langObj.name,
      langFlag: langObj.flag,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newItem, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('translator_history', JSON.stringify(updated));
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStatusMsg('');

    try {
      const result = await translateText(inputText, targetLang);
      setTranslatedText(result.translatedText);
      setIsDemoMode(result.isDemo);
      setStatusMsg(result.message);
      
      saveToHistory(inputText, result.translatedText, targetLang);
    } catch (err) {
      console.error(err);
      setStatusMsg('Error translating text.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger initial translation on mount
  useEffect(() => {
    handleTranslate();
  }, [targetLang]);

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = (text, langCode) => {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode || 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('translator_history');
  };

  const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-primary-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Languages className="w-4 h-4" />
            <span>Internship Requirement #1</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            AI Text <span className="gradient-text">Translator</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Convert English strings into your favorite world languages instantly using RapidAPI translation endpoints with Web Speech API pronunciation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenApiKeyModal}
            className="px-4 py-2 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-primary-500/50 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            Configure RapidAPI
          </button>
        </div>
      </div>

      {/* Main Translator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Text Box (English) */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between shadow-xl relative group hover:border-slate-700/80 transition-all">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-bold text-slate-300">
                <span>🇬🇧</span>
                <span>English (Source)</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {inputText.length} chars
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste English string here..."
              rows={6}
              className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 text-base md:text-lg resize-none focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeech(inputText, 'en-US')}
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-40"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setInputText('')}
                disabled={!inputText}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all disabled:opacity-40"
                title="Clear text"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-primary-500 via-emerald-500 to-teal-500 hover:from-primary-600 hover:to-teal-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-primary-500/25 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <span>Translate</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Target Translation Box */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between shadow-xl relative group hover:border-slate-700/80 transition-all bg-gradient-to-b from-slate-900/90 to-slate-900/40">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-xs font-bold text-primary-300">
                  <span>{selectedLangObj.flag}</span>
                  <span>{selectedLangObj.name}</span>
                </span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    Demo Mode
                  </span>
                )}
              </div>

              {/* Language Selector Dropdown */}
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-primary-500 cursor-pointer shadow-sm"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-950 text-white">
                    {lang.flag} {lang.name} ({lang.greeting})
                  </option>
                ))}
              </select>
            </div>

            <div className="min-h-[140px]">
              {isLoading ? (
                <div className="h-32 flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs font-medium animate-pulse">Contacting RapidAPI Service...</p>
                </div>
              ) : translatedText ? (
                <p className="text-white text-base md:text-lg leading-relaxed font-medium">
                  {translatedText}
                </p>
              ) : (
                <p className="text-slate-600 italic text-sm">
                  Translation output will appear here after you click translate...
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeech(translatedText, targetLang)}
                disabled={!translatedText}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-40"
                title="Listen to translation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {statusMsg && (
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  {statusMsg}
                </span>
              )}
              <button
                onClick={handleCopy}
                disabled={!translatedText}
                className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center gap-2 transition-all disabled:opacity-40 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Quick Picks */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 shadow-lg">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary-400" />
          Quick Select Favorite Languages
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {SUPPORTED_LANGUAGES.slice(0, 7).map((lang) => (
            <button
              key={lang.code}
              onClick={() => setTargetLang(lang.code)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-200 ${
                targetLang === lang.code
                  ? 'bg-primary-500/20 border-primary-500 text-white shadow-md shadow-primary-500/10 font-bold scale-105'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className="text-2xl mb-1">{lang.flag}</span>
              <span className="text-xs">{lang.name}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{lang.greeting}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Translation History Section */}
      {history.length > 0 && (
        <div className="glass-card rounded-3xl p-6 border border-slate-800/80 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-primary-400" />
              Recent Translations
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
          </div>
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-2xl shrink-0">{item.langFlag}</span>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-slate-300 truncate">{item.source}</p>
                    <p className="text-sm font-bold text-primary-300 truncate mt-0.5">{item.translated}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                  <button
                    onClick={() => {
                      setInputText(item.source);
                      setTranslatedText(item.translated);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
