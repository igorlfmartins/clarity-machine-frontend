import { X, Mic, MicOff } from 'lucide-react';
import { LiveVisualizer } from './LiveVisualizer';
import { useLiveAudio } from '../hooks/useLiveAudio';

interface LiveModeProps {
  onClose: () => void;
  systemInstruction: string;
  token?: string;
}

export function LiveMode({ onClose, systemInstruction, token }: LiveModeProps) {
  const {
    isSpeaking,
    volume,
    isMuted,
    setIsMuted,
    isConnected,
    connectionStatus,
    debugUrl
  } = useLiveAudio({ systemInstruction, token });

  return (
    <div className="fixed inset-0 z-50 bg-bio-deep/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 bg-cross-pattern font-sans">
      <button 
        onClick={onClose}
        className="absolute top-12 right-12 text-bio-white/50 hover:text-bio-lime p-3 border border-transparent hover:border-bio-lime/20 transition-all"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-16">
        <div className="relative">
          <div className="absolute -inset-4 border border-bio-teal/20 animate-pulse" />
          <div className="absolute -inset-8 border border-bio-purple/10 animate-pulse delay-75" />
          <LiveVisualizer isSpeaking={isSpeaking} volume={volume} />
        </div>

        <div className="flex flex-col items-center gap-8 w-full max-w-md">
          <div className="w-full p-8 bg-bio-deep border border-bio-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-8 bg-bio-teal" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-bio-white/50 font-bold font-mono">Modo Voz</p>
                <p className={`text-sm font-bold tracking-widest font-mono ${
                  connectionStatus === 'Sistema Online' 
                    ? 'text-bio-lime' 
                    : connectionStatus.includes('Erro') || connectionStatus.includes('Negada')
                      ? 'text-red-500' 
                      : 'text-bio-purple'
                }`}>
                  {connectionStatus.toUpperCase()}
                </p>
                {connectionStatus !== 'Sistema Online' && (
                   <p className="text-[9px] text-bio-white/40 font-mono break-all max-w-[200px]">{debugUrl}</p>
                )}
              </div>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-5 transition-all border ${
                  isMuted 
                    ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-bio-deep border-bio-white/10 text-bio-teal hover:border-bio-teal'
                }`}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <div className="flex-1 h-1.5 bg-bio-white/10 relative overflow-hidden">
              <div 
                className="h-full bg-bio-teal transition-all duration-300" 
                style={{ width: isConnected ? '100%' : '30%' }} 
              />
            </div>
            <div className="flex-1 h-1.5 bg-bio-white/10 relative overflow-hidden">
              <div 
                className="h-full bg-bio-purple transition-all duration-300" 
                style={{ width: isSpeaking ? '100%' : '0%' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
