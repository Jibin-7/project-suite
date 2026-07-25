import React from 'react';
import { Key, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Navbar({ onOpenApiKeyModal, isApiKeySet }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 via-emerald-400 to-accent-500 p-0.5 shadow-lg shadow-primary-500/20 flex items-center justify-center animate-pulse-slow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              Internship<span className="gradient-text font-extrabold">Suite</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-Tool React Application • Evaluation Ready
            </p>
          </div>
        </div>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-3">
          {/* RapidAPI Status Badge */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
              isApiKeySet
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 animate-bounce-subtle'
            }`}
          >
            {isApiKeySet ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">RapidAPI: Active</span>
                <span className="md:hidden">Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">RapidAPI: Demo Mode</span>
                <span className="md:hidden">Demo</span>
              </>
            )}
          </button>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className="glass-button flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-md hover:text-white hover:border-slate-600"
            title="Configure RapidAPI Key"
          >
            <Key className="w-3.5 h-3.5 text-primary-400" />
            <span className="hidden sm:inline">API Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
