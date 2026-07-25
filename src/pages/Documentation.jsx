import React from 'react';
import { Route, Code, ShieldCheck, Sparkles, BookOpen, Layers, GitBranch, Cpu, Zap, CheckCircle } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-950">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Internship Architecture Report</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white">
          Technical Specifications <span className="gradient-text">&amp; Hook Analysis</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
          A comprehensive breakdown of how React Router DOM, RapidAPI, and core React Hooks (<code className="text-purple-300 font-mono text-xs">useState</code>, <code className="text-purple-300 font-mono text-xs">useCallback</code>, <code className="text-purple-300 font-mono text-xs">useEffect</code>) were engineered in this suite.
        </p>
      </div>

      {/* Section 1: Client-Side Routing */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800/80 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">1. Client-Side Routing (`react-router-dom` v6)</h2>
            <p className="text-xs text-slate-400">Single Page Application (SPA) architecture without browser reloads</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Routing Architecture
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The application wraps the top-level tree with <code className="text-purple-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">&lt;BrowserRouter&gt;</code> and defines centralized routes inside <code className="text-purple-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono">&lt;Routes&gt;</code> in <code className="text-slate-200">App.jsx</code>.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
              <li><strong className="text-slate-200">`/` (Dashboard)</strong>: Interactive Hub overview and project launcher.</li>
              <li><strong className="text-slate-200">`/translator`</strong>: The AI Text Translator Application.</li>
              <li><strong className="text-slate-200">`/generator`</strong>: The Random String & Password Generator.</li>
              <li><strong className="text-slate-200">`/docs`</strong>: Architectural report and specifications.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <p className="text-purple-400 font-bold">// Sidebar Navigation with &lt;NavLink&gt;</p>
            <p className="text-slate-400">&lt;<span className="text-emerald-400">NavLink</span> to="/generator"</p>
            <p className="text-slate-400 pl-4">className=&#123;(&#123; isActive &#125;) =&gt;</p>
            <p className="text-slate-300 pl-8">isActive ? <span className="text-amber-300">'bg-primary-500 text-white'</span></p>
            <p className="text-slate-400 pl-8">: <span className="text-amber-300">'text-slate-400'</span></p>
            <p className="text-slate-400 pl-4">&#125;&gt;</p>
            <p className="text-slate-400 pl-4">String Generator</p>
            <p className="text-slate-400">&lt;/<span className="text-emerald-400">NavLink</span>&gt;</p>
          </div>
        </div>
      </div>

      {/* Section 2: React Hooks Mastery */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800/80 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">2. Hook Mastery Showcase (`useState`, `useCallback`, `useEffect`)</h2>
            <p className="text-xs text-slate-400">Strict implementation in the Random String Generator</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* useState Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                1. useState
              </span>
              <h4 className="text-sm font-bold text-white mt-3">State Management</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Manages slider length (4-64), character option checkboxes (uppercase, lowercase, numbers, symbols), generated output string, copy toast status, and history stack.
              </p>
            </div>
            <div className="text-[10px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              const [length, setLength] = useState(16);
            </div>
          </div>

          {/* useCallback Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2. useCallback
              </span>
              <h4 className="text-sm font-bold text-white mt-3">Algorithmic Memoization</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Wraps the core cryptographic generation loop. This ensures the function identity remains stable across re-renders unless a dependency (length or checkbox) changes.
              </p>
            </div>
            <div className="text-[10px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              useCallback(() =&gt; generate(), [deps]);
            </div>
          </div>

          {/* useEffect Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-mono font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                3. useEffect
              </span>
              <h4 className="text-sm font-bold text-white mt-3">Reactive Side-Effects</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Listens to the memoized <code className="text-amber-300 font-mono">generateString</code> callback and auto-executes whenever any parameter changes. Also attaches window keyboard listeners (Spacebar).
              </p>
            </div>
            <div className="text-[10px] font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-slate-300">
              useEffect(() =&gt; generateString(), [fn]);
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: RapidAPI Integration */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800/80 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">3. RapidAPI Translation &amp; Fallback Simulation</h2>
            <p className="text-xs text-slate-400">English to favorite world languages with zero downtime</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              To guarantee that evaluators and interviewers can test the application instantly without needing an immediate RapidAPI key or facing rate-limiting CORS errors, we built a two-tier architecture:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Live RapidAPI Mode</strong>: When a key is entered in the API Settings Drawer, Axios/Fetch makes POST requests with <code className="text-emerald-300 font-mono">X-RapidAPI-Key</code> headers.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Demo Simulation Mode</strong>: When left blank or if rate-limited, an intelligent local fallback simulator translates phrases with simulated network latency and Web Speech API pronunciation.</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <p className="text-emerald-400 font-bold">// Fetch request in rapidApi.js</p>
            <p className="text-slate-400">const response = await fetch(url, &#123;</p>
            <p className="text-slate-300 pl-4">method: <span className="text-amber-300">'POST'</span>,</p>
            <p className="text-slate-300 pl-4">headers: &#123;</p>
            <p className="text-slate-400 pl-8">'X-RapidAPI-Key': apiKey,</p>
            <p className="text-slate-400 pl-8">'X-RapidAPI-Host': apiHost</p>
            <p className="text-slate-300 pl-4">&#125;</p>
            <p className="text-slate-400">&#125;);</p>
          </div>
        </div>
      </div>
    </div>
  );
}
