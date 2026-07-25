export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸', greeting: '¡Hola!' },
  { code: 'fr', name: 'French', flag: '🇫🇷', greeting: 'Bonjour!' },
  { code: 'de', name: 'German', flag: '🇩🇪', greeting: 'Hallo!' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', greeting: 'नमस्ते!' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', greeting: 'こんにちは!' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', greeting: '你好!' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', greeting: 'مرحبا!' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', greeting: 'Привет!' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', greeting: '안녕하세요!' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', greeting: 'Olá!' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', greeting: 'Ciao!' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', greeting: 'Merhaba!' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', greeting: 'Hallo!' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', greeting: 'Halo!' },
];

export const RAPIDAPI_PRESETS = {
  GOOGLE_TRANSLATE: {
    name: 'Google Translate API (RapidAPI)',
    host: 'google-translate1.p.rapidapi.com',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  },
  LIBRE_TRANSLATE: {
    name: 'Deep Translate API (RapidAPI)',
    host: 'deep-translate1.p.rapidapi.com',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
  }
};

export const PROJECTS_METADATA = [
  {
    id: 'translator',
    title: 'AI Text Translator',
    subtitle: 'English to Favorite Language',
    description: 'Convert English text into 14+ world languages instantly using RapidAPI integration with speech pronunciation and clipboard features.',
    path: '/translator',
    icon: 'Languages',
    color: 'from-emerald-500 to-teal-600',
    tags: ['React', 'RapidAPI', 'Tailwind CSS', 'Web Speech API'],
    stat: '14+ Languages',
  },
  {
    id: 'generator',
    title: 'Random String Generator',
    subtitle: 'Hook Mastery Showcase',
    description: 'Advanced random string and secure password generator demonstrating strict implementation of useState, useCallback, and useEffect hooks.',
    path: '/generator',
    icon: 'KeyRound',
    color: 'from-blue-500 to-indigo-600',
    tags: ['useState', 'useCallback', 'useEffect', 'Algorithms'],
    stat: 'Crypto-Grade',
  },
  {
    id: 'routing',
    title: 'Client-Side Routing',
    subtitle: 'React Router DOM v6',
    description: 'Seamless Single Page Application (SPA) architecture with dynamic layouts, active link state preservation, and zero page reloads.',
    path: '/docs',
    icon: 'Route',
    color: 'from-purple-500 to-pink-600',
    tags: ['react-router-dom', 'SPA Architecture', 'Layouts'],
    stat: 'Zero Reloads',
  }
];

export const DEFAULT_STRING_SETTINGS = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: false,
};
