import React, { useState, useEffect } from 'react';
import { Key, X, Check, Shield, ExternalLink, Sparkles, HelpCircle, Zap, Globe } from 'lucide-react';
import { RAPIDAPI_PRESETS } from '../utils/constants';

export default function ApiKeyModal({ isOpen, onClose, onSaveKey }) {
  const [apiKey, setApiKey] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('GOOGLE_TRANSLATE');
  const [customHost, setCustomHost] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedKey = localStorage.getItem('rapidapi_key') || '';
      const savedHost = localStorage.getItem('rapidapi_host') || RAPIDAPI_PRESETS.GOOGLE_TRANSLATE.host;
      const savedUrl = localStorage.getItem('rapidapi_url') || RAPIDAPI_PRESETS.GOOGLE_TRANSLATE.url;

      setApiKey(savedKey);
      setCustomHost(savedHost);
      setCustomUrl(savedUrl);

      if (savedHost === RAPIDAPI_PRESETS.LIBRE_TRANSLATE.host) {
        setSelectedPreset('LIBRE_TRANSLATE');
      } else {
        setSelectedPreset('GOOGLE_TRANSLATE');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    const preset = RAPIDAPI_PRESETS[presetKey];
    setCustomHost(preset.host);
    setCustomUrl(preset.url);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('rapidapi_key', apiKey.trim());
    localStorage.setItem('rapidapi_host', customHost.trim());
    localStorage.setItem('rapidapi_url', customUrl.trim());

    onSaveKey(apiKey.trim());
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem('rapidapi_key');
    onSaveKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700/80 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                RapidAPI Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Configure your API key or use Free Live Translation Mode
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-5">
          {/* Preset Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select RapidAPI Provider
            </label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(RAPIDAPI_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePresetChange(key)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                    selectedPreset === key
                      ? 'bg-primary-500/15 border-primary-500 text-white shadow-lg shadow-primary-500/10 font-semibold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold">{preset.name.split(' (')[0]}</p>
                  <p className="text-[10px] text-slate-500 truncate">{preset.host}</p>
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                X-RapidAPI-Key
                <span className="text-[10px] text-primary-400 normal-case font-normal">(Optional)</span>
              </label>
              {apiKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[11px] text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Clear Key
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste your RapidAPI key here..."
                className="w-full bg-slate-950/80 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all font-mono"
              />
            </div>
          </div>

          {/* How it works info box */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>How Translation Works in This App:</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 pl-4 list-disc leading-relaxed">
              <li><strong className="text-slate-300">With RapidAPI Key:</strong> Requests are sent directly to <code className="text-emerald-300 font-mono text-[10px]">{customHost}</code> with standard RapidAPI authentication headers.</li>
              <li><strong className="text-slate-300">Without Key (Default):</strong> Automatically connects to the free, live <strong className="text-primary-300">MyMemory Public REST API</strong> to translate <em className="text-slate-200">any real sentence</em> in real time without CORS issues!</li>
            </ul>
          </div>

          {/* Advanced Host & URL */}
          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                API Host Endpoint
              </label>
              <input
                type="text"
                value={customHost}
                onChange={(e) => setCustomHost(e.target.value)}
                className="w-full bg-slate-900/40 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none focus:border-slate-700"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all active:scale-95"
            >
              {showSavedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Save & Apply
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
