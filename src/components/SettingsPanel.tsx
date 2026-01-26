import { useTranslation } from 'react-i18next'
import { X, LogOut, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../auth'

type SettingsPanelProps = {
  isOpen: boolean
  onClose: () => void
  language: string
  setLanguage: (lang: string) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toneLevel: number
  setToneLevel: (level: number) => void
  onSignOut: () => void
}

export function SettingsPanel({
  isOpen,
  onClose,
  language,
  setLanguage,
  theme,
  setTheme,
  toneLevel,
  setToneLevel,
  onSignOut,
}: SettingsPanelProps) {
  const { t } = useTranslation()
  const { updatePassword } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  async function handleUpdatePassword() {
    if (!newPassword || newPassword.length < 6) return
    setPasswordStatus('saving')
    try {
      const { error } = await updatePassword(newPassword)
      if (error) throw error
      setPasswordStatus('success')
      setNewPassword('')
      setTimeout(() => setPasswordStatus('idle'), 3000)
    } catch (e: any) {
      console.error('Password update error:', e)
      setPasswordStatus('error')
      setTimeout(() => {
        setPasswordStatus('idle')
      }, 5000)
    }
  }

  if (!isOpen) return null


  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-bio-white dark:bg-bio-deep border-l-4 border-bio-deep/10 dark:border-bio-white/10 shadow-2xl z-50 flex flex-col font-sans transition-colors duration-300">
      <div className="p-8 border-b border-bio-deep/10 dark:border-bio-white/10 flex items-center justify-between bg-bio-white dark:bg-bio-deep">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-bio-teal mb-1 font-mono">Configurações</p>
          <h2 className="text-xl font-bold text-bio-deep dark:text-bio-white tracking-tight font-mono">{t('settings.title')}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-bio-deep/50 dark:text-bio-white/50 hover:text-bio-deep dark:hover:text-bio-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-bio-white dark:bg-bio-deep">
        {/* Language & Theme Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-bio-deep/50 dark:text-bio-white/50 uppercase tracking-widest font-mono">
              {t('settings.language.label')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pt', 'en', 'es'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-3 text-[10px] font-bold uppercase tracking-widest border-2 transition-all font-mono ${
                    language === lang 
                      ? 'bg-bio-teal border-bio-teal text-bio-deep' 
                      : 'border-bio-deep/10 text-bio-deep/60 hover:border-bio-deep/30 dark:border-bio-white/10 dark:text-bio-white/60 dark:hover:border-bio-white/30'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-bio-deep/50 dark:text-bio-white/50 uppercase tracking-widest font-mono">
              {t('settings.theme.label')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['dark', 'light'] as const).map((tMode) => (
                <button
                  key={tMode}
                  onClick={() => setTheme(tMode)}
                  className={`py-3 text-[10px] font-bold uppercase tracking-widest border-2 transition-all font-mono ${
                    theme === tMode 
                      ? 'bg-bio-purple border-bio-purple text-bio-deep' 
                      : 'border-bio-deep/10 text-bio-deep/60 hover:border-bio-deep/30 dark:border-bio-white/10 dark:text-bio-white/60 dark:hover:border-bio-white/30'
                  }`}
                >
                  {tMode === 'dark' ? t('settings.theme.dark') : t('settings.theme.light')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Level Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-bio-deep/50 dark:text-bio-white/50 uppercase tracking-widest font-mono">
            {t('settings.tone.label')}
          </label>
          <div className="space-y-3">
            {[1, 2, 3].map((level) => (
              <button
                key={level}
                onClick={() => setToneLevel(level as 1 | 2 | 3)}
                className={`w-full p-4 text-left border-2 transition-all relative group font-mono ${
                  toneLevel === level 
                    ? 'bg-bio-deep dark:bg-bio-white border-bio-deep dark:border-bio-white text-bio-lime dark:text-bio-deep' 
                    : 'border-bio-deep/10 text-bio-deep/60 hover:bg-bio-deep/5 dark:border-bio-white/10 dark:text-bio-white/60 dark:hover:bg-bio-white/5'
                }`}
              >
                {toneLevel === level && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-bio-lime" />
                )}
                <p className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${toneLevel === level ? 'text-bio-lime dark:text-bio-deep' : 'text-bio-deep dark:text-bio-white'}`}>
                  {t(`settings.tone.level${level}.label`)}
                </p>
                <p className="text-[10px] leading-relaxed opacity-60">
                  {t(`settings.tone.level${level}.desc`)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Password Update Section */}
        <div className="pt-8 border-t border-bio-deep/10 dark:border-bio-white/10 space-y-4">
          <label className="text-[10px] font-bold text-bio-deep/50 dark:text-bio-white/50 uppercase tracking-widest font-mono">
            Alterar Senha
          </label>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="NOVA SENHA"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-base border-bio-deep/10 bg-bio-deep/5 text-bio-deep placeholder:text-bio-deep/30 dark:border-bio-white/10 dark:bg-bio-white/5 dark:text-bio-white dark:placeholder:text-bio-white/30"
            />
            <button
              onClick={handleUpdatePassword}
              disabled={passwordStatus === 'saving' || !newPassword}
              className="w-full bg-bio-deep dark:bg-bio-white text-bio-lime dark:text-bio-deep font-mono font-bold py-3 uppercase tracking-widest hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {passwordStatus === 'saving' ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'ATUALIZAR'}
            </button>
            {passwordStatus === 'success' && (
              <p className="text-[10px] text-bio-teal font-bold uppercase tracking-widest text-center font-mono">Senha atualizada!</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 bg-bio-white dark:bg-bio-deep border-t border-bio-deep/10 dark:border-bio-white/10">
        <button
          onClick={onSignOut}
          className="w-full border-2 border-bio-deep/20 dark:border-bio-white/20 bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-widest text-bio-deep dark:text-bio-white transition-all hover:border-bio-purple hover:text-bio-purple font-mono flex items-center justify-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('settings.logout.label')}
        </button>
      </div>
    </div>
  )
}
