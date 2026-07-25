import { SUPPORTED_LANGUAGES } from '../utils/constants';

// Dictionary fallback in case offline or network error occurs
const DEMO_TRANSLATIONS = {
  es: {
    "hello": "¡Hola!",
    "welcome": "¡Bienvenido!",
    "internship": "pasantía",
    "project": "proyecto",
    "react": "React",
    "good morning": "Buenos días",
    "thank you": "Gracias",
    "how are you?": "¿Cómo estás?",
    "i love coding": "Me encanta programar",
  },
  fr: {
    "hello": "Bonjour!",
    "welcome": "Bienvenue!",
    "internship": "stage",
    "project": "projet",
    "good morning": "Bonjour",
    "thank you": "Merci",
    "how are you?": "Comment ça va?",
    "i love coding": "J'adore coder",
  },
  de: {
    "hello": "Hallo!",
    "welcome": "Willkommen!",
    "internship": "Praktikum",
    "project": "Projekt",
    "thank you": "Danke",
    "how are you?": "Wie geht es dir?",
  },
  hi: {
    "hello": "नमस्ते!",
    "welcome": "स्वागत हे!",
    "internship": "इंटर्नशिप",
    "project": "परियोजना",
    "thank you": "धन्यवाद",
    "how are you?": "आप कैसे हैं?",
  },
  ja: {
    "hello": "こんにちは!",
    "welcome": "ようこそ!",
    "thank you": "ありがとう",
  }
};

/**
 * Free Public REST API fallback (MyMemory Translation Service)
 * Translates real sentences live without needing an API key!
 */
async function fetchFreeLiveTranslation(text, targetLangCode) {
  try {
    const encodedText = encodeURIComponent(text.trim());
    // MyMemory free public translation API
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLangCode}`);
    if (response.ok) {
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        let translated = data.responseData.translatedText;
        // MyMemory sometimes includes warning strings if daily quota is exceeded on their free tier
        if (!translated.toLowerCase().includes('mymemory') && !translated.toLowerCase().includes('quota')) {
          return {
            translatedText: translated,
            isDemo: false,
            message: 'Translated Live (Free Public Translation Service)'
          };
        }
      }
    }
  } catch (err) {
    console.warn('Free live translation network error, falling back to dictionary:', err);
  }

  // Dictionary check if network fails
  const cleanText = text.trim().toLowerCase();
  if (DEMO_TRANSLATIONS[targetLangCode] && DEMO_TRANSLATIONS[targetLangCode][cleanText]) {
    return {
      translatedText: DEMO_TRANSLATIONS[targetLangCode][cleanText],
      isDemo: true,
      message: 'Translated via Offline Phrase Dictionary'
    };
  }

  const langObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode) || { name: 'Target Language', greeting: 'Hello' };
  return {
    translatedText: `[${langObj.name}] ${text}`,
    isDemo: true,
    message: 'Demo Mode (Please enter a valid RapidAPI Key in settings)'
  };
}

/**
 * Translate text using RapidAPI (Google Translate / Deep Translate API) or live public translation
 */
export async function translateText(text, targetLanguageCode) {
  if (!text || !text.trim()) return '';

  const apiKey = localStorage.getItem('rapidapi_key') || '';
  const apiHost = localStorage.getItem('rapidapi_host') || 'google-translate1.p.rapidapi.com';
  const apiUrl = localStorage.getItem('rapidapi_url') || 'https://google-translate1.p.rapidapi.com/language/translate/v2';

  // If no RapidAPI key is set, automatically use the real live free translation service!
  if (!apiKey) {
    return await fetchFreeLiveTranslation(text, targetLanguageCode);
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
      body: new URLSearchParams({
        q: text,
        target: targetLanguageCode,
        source: 'en'
      })
    });

    if (!response.ok) {
      console.warn(`RapidAPI Error (${response.status}): Switching to free live translation fallback.`);
      const fallbackResult = await fetchFreeLiveTranslation(text, targetLanguageCode);
      return {
        ...fallbackResult,
        message: `RapidAPI Error (${response.status}) → Switched to Free Live Translation`
      };
    }

    const data = await response.json();
    
    // Extract translation from standard RapidAPI response formats
    let translated = '';
    if (data && data.data && data.data.translations && data.data.translations.length > 0) {
      translated = data.data.translations[0].translatedText;
    } else if (data && data.translations && data.translations.length > 0) {
      translated = data.translations[0].translatedText;
    } else if (data && data.translatedText) {
      translated = data.translatedText;
    } else if (typeof data === 'string') {
      translated = data;
    } else {
      const fallbackResult = await fetchFreeLiveTranslation(text, targetLanguageCode);
      return fallbackResult;
    }

    return {
      translatedText: translated,
      isDemo: false,
      message: `Successfully translated via RapidAPI (${apiHost})`
    };
  } catch (error) {
    console.error('RapidAPI Fetch Exception:', error);
    const fallbackResult = await fetchFreeLiveTranslation(text, targetLanguageCode);
    return {
      ...fallbackResult,
      message: 'Network/CORS limitation → Switched to Free Live Translation'
    };
  }
}
