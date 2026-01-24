import type { FormEvent } from 'react'
import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../auth'

export function Login() {
  const { t } = useTranslation()
  const { signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleSendLink(event?: FormEvent) {
    if (event) event.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await signInWithEmail(email)
      if (error) {
        setMessage({ type: 'error', text: 'Erro ao enviar link. Verifique o e-mail.' })
      } else {
        setMessage({ type: 'success', text: 'Link de acesso enviado! Verifique sua caixa de entrada.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro inesperado. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-navy-900 to-slate-900 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur-lg shadow-xl px-8 py-10 space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-500">{t('login.appTitle')}</p>
          <h1 className="text-2xl font-semibold text-slate-50">{t('login.title')}</h1>
          <p className="text-sm text-slate-400">
            {t('login.subtitle')}
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg flex items-center gap-3 text-sm ${
            message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSendLink} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                {t('login.emailLabel')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="input-base pl-9"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loading || message?.type === 'success'}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2"
            disabled={loading || message?.type === 'success'}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {message?.type === 'success' ? 'Link Enviado' : 'Receber Link de Acesso'}
          </button>

          {message?.type === 'success' && (
            <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2">
              <button
                type="button"
                onClick={() => handleSendLink()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-sm font-medium border border-slate-700"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Enviar novo link
              </button>
              
              <button
                type="button"
                onClick={() => setMessage(null)}
                className="w-full text-xs text-slate-500 hover:text-sky-400 transition-colors"
              >
                Usar outro e-mail
              </button>
            </div>
          )}
        </form>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          {t('login.footer')}
        </p>
      </div>
    </div>
  )
}
