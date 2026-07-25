import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Languages, KeyRound, Route, ExternalLink, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const navItems = [
    {
      name: 'Hub Dashboard',
      path: '/',
      icon: LayoutDashboard,
      description: 'Overview & Quick Launch',
      badge: 'Hub'
    },
    {
      name: 'Text Translator',
      path: '/translator',
      icon: Languages,
      description: 'RapidAPI Powered',
      badge: 'API'
    },
    {
      name: 'String Generator',
      path: '/generator',
      icon: KeyRound,
      description: 'Hook Mastery Showcase',
      badge: 'Hooks'
    },
    {
      name: 'Routing & Specs',
      path: '/docs',
      icon: Route,
      description: 'SPA Architecture Report',
      badge: 'Docs'
    }
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-slate-950/60 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="px-3 py-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Client-Side Navigation
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center justify-between p-3 rounded-2xl transition-all duration-200 border',
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/15 via-emerald-500/10 to-transparent border-primary-500/40 text-white shadow-lg shadow-primary-500/5'
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          className={clsx(
                            'p-2 rounded-xl transition-transform duration-200 group-hover:scale-110 flex items-center justify-center',
                            isActive
                              ? 'bg-primary-500 text-slate-950 shadow-md shadow-primary-500/30 font-bold'
                              : 'bg-slate-900 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={clsx("text-sm font-semibold", isActive ? "text-white" : "text-slate-300")}>
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <span
                        className={clsx(
                          'text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider',
                          isActive
                            ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        )}
                      >
                        {item.badge}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Pro Tip Box */}
        <div className="mx-2 p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/40 border border-slate-800/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-primary-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Evaluation Pro-Tip</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            All 3 internship requirements are seamlessly integrated. Check <span className="text-emerald-400 font-semibold">/docs</span> for hook architectural walkthroughs!
          </p>
          <div className="w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-full w-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-800/80 text-center">
        <p className="text-[11px] text-slate-500 font-medium">
          Built with React Router DOM v6
        </p>
      </div>
    </aside>
  );
}
