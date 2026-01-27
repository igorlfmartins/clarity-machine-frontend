import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useSettings() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [toneLevel, setToneLevel] = useState(3);

  // Load settings on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('consultoria_language') || 'en';
    const savedTheme = (localStorage.getItem('consultoria_theme') as 'light' | 'dark') || 'dark';
    const savedTone = parseInt(localStorage.getItem('consultoria_tone') || '1', 10);
    
    setLanguage(savedLang);
    setTheme(savedTheme);
    setToneLevel(savedTone);
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('consultoria_theme', theme);
  }, [theme]);

  // Sync language to i18next
  useEffect(() => {
    localStorage.setItem('consultoria_language', language);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Sync tone to localStorage
  useEffect(() => {
    localStorage.setItem('consultoria_tone', toneLevel.toString());
  }, [toneLevel]);

  return {
    language,
    setLanguage,
    theme,
    setTheme,
    toneLevel,
    setToneLevel,
  };
}
