import React from 'react';
import { Heart, Code2, Sparkles, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary-400" />
          <span>
            Built for <strong className="text-slate-300 font-semibold">Internship Evaluation</strong>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1">
            React Hooks + RapidAPI + Tailwind CSS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Client Routing: Active</span>
          </div>
          <p className="text-[11px] text-slate-600 font-mono">v1.0.0-pro</p>
        </div>
      </div>
    </footer>
  );
}
