import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Shield, Zap, LayoutDashboard, Languages, KeyRound, Route, Star, Award, Code2 } from 'lucide-react';
import { PROJECTS_METADATA } from '../utils/constants';

export default function Dashboard({ onOpenApiKeyModal }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Languages': return Languages;
      case 'KeyRound': return KeyRound;
      case 'Route': return Route;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative glass-card rounded-3xl p-8 md:p-12 border border-slate-800 overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950">
        {/* Glow Spheres */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-bold text-primary-300 shadow-sm animate-pulse-slow">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Internship Evaluation Ready • 3 Projects in 1 Suite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Advanced React <span className="gradient-text">Internship Suite</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Welcome! This multi-tool React web application seamlessly unites all three of your internship requirements into a single, cohesive, premium architecture powered by <strong className="text-white font-semibold">Vite, Tailwind CSS, RapidAPI, and React Router DOM v6</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/translator"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 via-emerald-500 to-teal-500 hover:from-primary-600 hover:to-teal-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-primary-500/25 flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Launch Translator App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/generator"
              className="px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <span>Explore Hooks Generator</span>
              <KeyRound className="w-4 h-4 text-accent-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Evaluation Requirements Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            num: '01',
            title: 'Text Translator App',
            subtitle: 'React + Tailwind + RapidAPI',
            desc: 'Converts English input to 14+ favorite world languages. Equipped with RapidAPI key management and intelligent Demo Simulation Mode.',
            link: '/translator',
            status: 'Completed Perfectly',
            color: 'border-emerald-500/40 text-emerald-400',
            bg: 'from-emerald-500/10 to-transparent'
          },
          {
            num: '02',
            title: 'Random String Generator',
            subtitle: 'useState, useCallback, useEffect',
            desc: 'Crypto-grade password generator that auto-regenerates in real-time when slider or checkboxes change without unnecessary re-renders.',
            link: '/generator',
            status: 'Hooks Implemented',
            color: 'border-blue-500/40 text-blue-400',
            bg: 'from-blue-500/10 to-transparent'
          },
          {
            num: '03',
            title: 'Client-Side Routing',
            subtitle: 'react-router-dom SPA',
            desc: 'Zero-reload page transitions, active NavLink visual feedback, nested layouts, and centralized browser routing architecture.',
            link: '/docs',
            status: 'Active SPA Routing',
            color: 'border-purple-500/40 text-purple-400',
            bg: 'from-purple-500/10 to-transparent'
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.bg} rounded-full blur-2xl -z-10`} />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                  TASK #{item.num}
                </span>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border bg-slate-900/90 flex items-center gap-1.5 ${item.color}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-3">{item.subtitle}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/60">
              <Link
                to={item.link}
                className="w-full py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all group-hover:border-slate-700"
              >
                <span>Open Project #0{idx + 1}</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Showcase Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary-400" />
              Project Applications Suite
            </h2>
            <p className="text-xs text-slate-400">Click any card below to interact directly with the application</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_METADATA.map((project) => {
            const IconComponent = getIcon(project.icon);
            return (
              <Link
                key={project.id}
                to={project.path}
                className="glass-card rounded-3xl p-6 border border-slate-800/80 hover:border-slate-600/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${project.color} p-0.5 shadow-lg flex items-center justify-center`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {project.stat}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mb-3">{project.subtitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800/80 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-bold text-primary-400 group-hover:text-primary-300">
                    <span>Launch Application</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
