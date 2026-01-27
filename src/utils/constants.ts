export const FOCUS_AREAS = (t: (key: string) => string) => [
  { id: 'vendas', label: t('chat.focusAreas.sales'), color: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-500/10' },
  { id: 'marketing', label: t('chat.focusAreas.marketing'), color: 'text-purple-400', border: 'border-purple-500/50', bg: 'bg-purple-500/10' },
  { id: 'financas', label: t('chat.focusAreas.finance'), color: 'text-amber-400', border: 'border-amber-500/50', bg: 'bg-amber-500/10' },
  { id: 'gestao', label: t('chat.focusAreas.management'), color: 'text-blue-400', border: 'border-blue-500/50', bg: 'bg-blue-500/10' },
  { id: 'tecnologia', label: t('chat.focusAreas.tech'), color: 'text-indigo-400', border: 'border-indigo-500/50', bg: 'bg-indigo-500/10' },
]
