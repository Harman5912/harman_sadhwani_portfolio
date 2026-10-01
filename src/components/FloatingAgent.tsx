import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Mic, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { GoldenSunIcon } from './GoldenSunMotif';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

interface AgentVoice {
  id: string;
  name: string;
  category?: string;
  accent?: string;
  description?: string;
}

type VoiceEngine = 'elevenlabs' | 'browser';

const OPENING_MESSAGE =
  "Hey, I'm Harman's AI agent. Tap the mic and talk, or type a question — I'll answer out loud about his projects (Keys.AI, ReviewBOT, Crown Code), skills, awards, or availability.";

const SUGGESTED_QUESTIONS = [
  'Tell me about Keys.AI.',
  'What is Crown Code?',
  'What awards has Harman won?',
  'Is Harman available for internships?',
];

const SIGNAL_BARS = [40, 78, 58, 92, 46, 84, 70, 100, 54, 80, 88, 50, 74, 90, 62, 82];

const MAX_RECORDING_MS = 20000;
const MIN_RECORDING_MS = 400;

function buildLocalGroundedAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('keys.ai') || q.includes('keys ai')) {
    return `**Keys.AI** is Harman's flagship AI assistant ecosystem focused on intelligent computer interaction, AI-powered automation, application control, browser control, VS Code interaction, and model integration across cloud APIs and local Ollama models. Releases: https://github.com/Harman5912/KEYS.AI/releases.`;
  }

  if (q.includes('reviewbot') || q.includes('review bot')) {
    return `**ReviewBOT** is Harman's AI-assisted GitHub code review platform designed to analyze repositories and help developers identify, understand, and improve code with Firebase persistence and multi-model selection. Live platform: https://reviewbot-web.onrender.com/`;
  }

  if (q.includes('crown code') || q.includes('crown pierce') || q.includes('crown')) {
    return `**Crown Pierce** is Harman's flagship product studio (https://crown-pierce-co.netlify.app/). Its engineering suite includes the **Crown Code Terminal Agent** (autonomous CLI & IDE code agent) and the upcoming **True Blade** release.`;
  }

  if (q.includes('true blade')) {
    return `**True Blade** is an upcoming project under **Crown Pierce** displayed in the Minor Projects & Lab Divisions alongside Harman's conference research prototypes, hackathon systems, and 100+ catalogue builds.`;
  }

  if (
    q.includes('hackathon') ||
    q.includes('achievement') ||
    q.includes('award') ||
    q.includes('certificate') ||
    q.includes('win')
  ) {
    return `Harman's 8 verified certificate-backed awards and milestones:\n· **Exuberance'26 – Tech Expo**: First Runner-Up (Trophy + Blue Ribbon Medal)\n· **Hackathon 2.0 (March 2026)**: Second Position (Blue Ribbon Medal)\n· **ICHIS-2026 International Conference**: Second Runner-Up – Poster Presentation\n· **National Conference – Women Skill Development**: Paper Presentation / First\n· **Smart India Hackathon (SIH 2025)**: Qualified for Second Round\n· **MSME IDEA HACKATHON 6.0**: Selected for Second Round\n· **Hackofiesta 6.0 (AISpire UP Hackathon)**: Participation (Microsoft & Deloitte)\n· **15th International Conference – Science, Tech & Management**: Certificate of Participation`;
  }

  if (
    q.includes('intern') ||
    q.includes('available') ||
    q.includes('opportunity') ||
    q.includes('experience') ||
    q.includes('hire') ||
    q.includes('contact')
  ) {
    return `Yes! Harman is currently **Available for Opportunities** (internships, full-stack developer roles, and AI builder roles). He served as a **Full Stack AI/ML Intern** in the Technical Department. Reach him at **sadhwaniharman@gmail.com** or on LinkedIn (https://www.linkedin.com/in/harman-sadhwani-a659a6225/).`;
  }

  if (
    q.includes('skill') ||
    q.includes('technolog') ||
    q.includes('strongest') ||
    q.includes('stack')
  ) {
    return `Harman's technical stack spans 7 core domains:\n· **Programming**: Python, Java, JavaScript, TypeScript, C, SQL\n· **AI & Agentic Systems**: Generative AI, AI Agents, LLM Integration, Ollama, AI APIs\n· **Frontend**: HTML, CSS, JavaScript, Angular, React\n· **Backend**: Python, REST APIs, Authentication, Database Integration\n· **Database**: SQL, Firebase, Database Design, Cloud Databases\n· **Tools & Cloud**: Git, GitHub, VS Code, Netlify, Render\n· **Data**: Excel, SQL, Python, Data Analysis`;
  }

  return `Harman Sadhwani is a BCA developer, Full-Stack Developer, AI Builder, and Founder of **Crown Pierce**. He created **Keys.AI**, **ReviewBOT**, and the **Crown Code Terminal Agent**, served as a **Full Stack AI/ML Intern**, and holds 8 verified competition & conference certificates including **Exuberance'26 (1st Runner-Up)**, **Hackathon 2.0 (2nd Position)**, and **ICHIS-2026 (2nd Runner-Up)**.`;
}

function stripForSpeech(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[·•▲■▸→]/g, ' ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function FloatingAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: OPENING_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEngine, setVoiceEngine] = useState<VoiceEngine>('browser');
  const [voices, setVoices] = useState<AgentVoice[]>([]);
  const [voiceId, setVoiceId] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const voiceEnabledRef = useRef(voiceEnabled);
  const voiceEngineRef = useRef<VoiceEngine>('browser');
  const voiceIdRef = useRef('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordStartedAtRef = useRef(0);
  const recordTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    voiceEngineRef.current = voiceEngine;
  }, [voiceEngine]);

  useEffect(() => {
    voiceIdRef.current = voiceId;
  }, [voiceId]);

  const pushNotice = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `ai-${Date.now()}`, role: 'assistant', content },
    ]);
  }, []);

  const releaseAudioElement = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onplay = null;
      audio.onended = null;
      audio.onerror = null;
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  const stopAudioPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      try {
        audio.pause();
      } catch {
        /* noop */
      }
    }
    releaseAudioElement();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [releaseAudioElement]);

  // Browser fallback voice — used when ElevenLabs audio is not available
  const speakWithBrowserVoice = useCallback((clean: string) => {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      !clean
    ) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'en-US';
    utterance.rate = 1.03;
    utterance.pitch = 1;
    const available = window.speechSynthesis.getVoices();
    const preferred =
      available.find((v) =>
        /samantha|aria|jenny|zira|google us english|female|natural/i.test(v.name)
      ) || available.find((v) => v.lang?.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  // Speak a reply: ElevenLabs AI audio first, browser speech synthesis second
  const speak = useCallback(
    async (text: string) => {
      if (!voiceEnabledRef.current) return;
      const clean = stripForSpeech(text);
      if (!clean) return;

      stopAudioPlayback();

      if (voiceEngineRef.current === 'elevenlabs') {
        try {
          const response = await fetch('/api/voice/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: clean,
              voiceId: voiceIdRef.current || undefined,
            }),
          });

          if (response.ok) {
            const blob = await response.blob();
            if (!voiceEnabledRef.current) return;
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audioUrlRef.current = url;
            audioRef.current = audio;
            audio.onplay = () => setIsSpeaking(true);
            audio.onended = () => {
              setIsSpeaking(false);
              releaseAudioElement();
            };
            audio.onerror = () => {
              releaseAudioElement();
              setIsSpeaking(false);
              speakWithBrowserVoice(clean);
            };
            await audio.play();
            return;
          }

          // No ElevenLabs key configured server-side — downgrade quietly
          if (response.status === 503) setVoiceEngine('browser');
        } catch {
          // Network or autoplay failure — fall through to browser speech
        }
      }

      if (!voiceEnabledRef.current) return;
      speakWithBrowserVoice(clean);
    },
    [releaseAudioElement, speakWithBrowserVoice, stopAudioPlayback]
  );

  // Discover whether ElevenLabs AI audio is configured, and load its voice catalogue
  useEffect(() => {
    let cancelled = false;

    const loadVoiceEngine = async () => {
      try {
        const response = await fetch('/api/voice/status');
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled || !data?.configured) return;

        setVoiceEngine('elevenlabs');
        if (typeof data.voiceId === 'string') setVoiceId(data.voiceId);

        try {
          const listResponse = await fetch('/api/voice/list');
          if (!listResponse.ok) return;
          const listData = await listResponse.json();
          if (cancelled || !Array.isArray(listData?.voices)) return;
          setVoices(
            listData.voices.filter((voice: AgentVoice) => Boolean(voice?.id))
          );
        } catch {
          // The picker simply stays hidden; the default voice is still used
        }
      } catch {
        // Keep browser speech synthesis as the voice engine
      }
    };

    void loadVoiceEngine();
    return () => {
      cancelled = true;
    };
  }, []);

  // Allow other parts of the app to open the agent via a window event
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-ai-agent', handleOpen);
    return () => window.removeEventListener('open-ai-agent', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, open]);

  // Tear down audio, mic stream and recorder on unmount
  useEffect(() => {
    return () => {
      if (recordTimeoutRef.current) {
        window.clearTimeout(recordTimeoutRef.current);
        recordTimeoutRef.current = null;
      }
      const recorder = mediaRecorderRef.current;
      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onstop = null;
        try {
          if (recorder.state !== 'inactive') recorder.stop();
        } catch {
          /* noop */
        }
        mediaRecorderRef.current = null;
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      try {
        recognitionRef.current?.stop?.();
      } catch {
        /* noop */
      }
    };
  }, []);

  const sendQuestion = useCallback(
    async (questionText: string) => {
      const trimmed = questionText.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
      };

      const updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);
      setInput('');
      setIsLoading(true);

      let reply: string | null = null;
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: updatedHistory.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.reply === 'string' && data.reply.trim()) {
            reply = data.reply.trim();
          }
        }
      } catch {
        // Fall back to the local grounded synthesizer below
      }

      if (!reply) {
        reply = buildLocalGroundedAnswer(trimmed);
      }

      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'assistant', content: reply as string },
      ]);
      setIsLoading(false);
      void speak(reply);
    },
    [isLoading, messages, speak]
  );

  const stopMicStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startBrowserRecognition = useCallback(() => {
    const SR =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;
    if (!SR) {
      pushNotice(
        'Voice input is not supported in this browser — please type your question instead.'
      );
      return;
    }

    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      if (transcript.trim()) void sendQuestion(transcript.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  }, [pushNotice, sendQuestion]);

  // Upload the recording to ElevenLabs Scribe for transcription
  const transcribeRecording = useCallback(
    async (mimeType: string) => {
      const chunks = chunksRef.current;
      chunksRef.current = [];
      stopMicStream();

      const durationMs = Date.now() - recordStartedAtRef.current;
      const blob = new Blob(chunks, { type: mimeType });
      if (durationMs < MIN_RECORDING_MS || blob.size === 0) {
        setIsListening(false);
        return;
      }

      try {
        const response = await fetch('/api/voice/stt', {
          method: 'POST',
          headers: { 'Content-Type': mimeType },
          body: blob,
        });

        if (response.ok) {
          const data = await response.json();
          const transcript =
            typeof data?.transcript === 'string' ? data.transcript.trim() : '';
          setIsListening(false);
          if (transcript) {
            void sendQuestion(transcript);
          } else {
            pushNotice(
              'I could not make out that audio — please try again or type your question.'
            );
          }
          return;
        }
      } catch {
        // Fall through to the browser recognizer below
      }

      setIsListening(false);
      startBrowserRecognition();
    },
    [pushNotice, sendQuestion, startBrowserRecognition, stopMicStream]
  );

  const stopRecording = useCallback(() => {
    if (recordTimeoutRef.current) {
      window.clearTimeout(recordTimeoutRef.current);
      recordTimeoutRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      try {
        recorder.stop();
      } catch {
        setIsListening(false);
        stopMicStream();
      }
      return;
    }

    setIsListening(false);
    stopMicStream();
  }, [stopMicStream]);

  const startRecording = useCallback(async () => {
    const mediaDevices =
      typeof navigator !== 'undefined' ? navigator.mediaDevices : undefined;

    if (!mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      startBrowserRecognition();
      return;
    }

    try {
      const stream = await mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const preferredTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg',
      ];
      const mimeType = preferredTypes.find((type) => {
        try {
          return MediaRecorder.isTypeSupported(type);
        } catch {
          return false;
        }
      });

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      chunksRef.current = [];
      recordStartedAtRef.current = Date.now();
      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        void transcribeRecording(recorder.mimeType || mimeType || 'audio/webm');
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsListening(true);
      recordTimeoutRef.current = window.setTimeout(
        () => stopRecording(),
        MAX_RECORDING_MS
      );
    } catch {
      setIsListening(false);
      stopMicStream();
      pushNotice('Microphone access was blocked — please type your question instead.');
    }
  }, [
    pushNotice,
    startBrowserRecognition,
    stopMicStream,
    stopRecording,
    transcribeRecording,
  ]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      try {
        recognitionRef.current?.stop?.();
      } catch {
        /* noop */
      }
      stopRecording();
      return;
    }

    if (voiceEngineRef.current === 'elevenlabs') {
      void startRecording();
      return;
    }

    startBrowserRecognition();
  }, [isListening, startBrowserRecognition, startRecording, stopRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleReset = () => {
    stopAudioPlayback();
    setMessages([{ id: 'welcome', role: 'assistant', content: OPENING_MESSAGE }]);
    setInput('');
  };

  const handleVoiceToggle = () => {
    setVoiceEnabled((enabled) => {
      if (enabled) stopAudioPlayback();
      return !enabled;
    });
  };

  const renderFormattedContent = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      const segments = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
          {segments.map((seg, segIdx) => {
            if (seg.startsWith('**') && seg.endsWith('**')) {
              return (
                <strong key={segIdx} className="font-bold text-[#b8860b]">
                  {seg.slice(2, -2)}
                </strong>
              );
            }
            return <React.Fragment key={segIdx}>{seg}</React.Fragment>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed right-2 z-[60] top-1/2 -translate-y-1/2 sm:right-4">
      <AnimatePresence mode="wait">
        {!open ? (
          /* Collapsed Launcher Orb pinned to the right edge */
          <motion.div
            key="launcher"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="flex flex-col items-center gap-1.5"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open Harman's AI agent"
              className="group relative flex h-14 w-14 items-center justify-center border-2 border-[#12110e] bg-[#12110e] text-[#fcf6b5] shadow-[4px_4px_0px_#d4af37] transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span
                className="absolute inset-0 -z-10 animate-ping border-2 border-[#d4af37]"
                aria-hidden="true"
              />
              <GoldenSunIcon size={26} spinning={isLoading || isListening} />
              <span className="absolute -right-1 -top-1 h-3 w-3 border border-[#12110e] bg-emerald-400" />
            </button>
            <span className="border border-[#12110e] bg-[#fcf6b5] px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#12110e] shadow-[2px_2px_0px_#12110e]">
              AI Agent
            </span>
          </motion.div>
        ) : (
          /* Expanded Conversational Panel */
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="flex w-[min(92vw,370px)] max-h-[82dvh] flex-col overflow-hidden border-2 border-[#12110e] bg-white shadow-[10px_10px_0px_#d4af37]"
            role="dialog"
            aria-label="Harman's AI Agent"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b-2 border-[#12110e] bg-[#12110e] px-3 py-2.5 text-[#fcf6b5]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#fcf6b5] bg-[#d4af37] text-[#12110e]">
                  <GoldenSunIcon size={16} spinning={isLoading} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xs font-black text-white">
                    HARMAN&apos;S AI AGENT
                  </h3>
                  <p className="truncate font-mono text-[9px] text-[#d4af37]">
                    {isListening
                      ? 'LISTENING…'
                      : isSpeaking
                      ? 'SPEAKING…'
                      : isLoading
                      ? 'THINKING…'
                      : voiceEngine === 'elevenlabs'
                      ? 'ONLINE · ELEVENLABS VOICE'
                      : 'ONLINE · TALK OR TYPE'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  aria-label={voiceEnabled ? 'Mute voice replies' : 'Unmute voice replies'}
                  title={voiceEnabled ? 'Voice replies: ON' : 'Voice replies: OFF'}
                  className="flex h-7 w-7 items-center justify-center border border-[#fcf6b5]/40 bg-black/30 hover:bg-[#d4af37] hover:text-[#12110e] transition-colors cursor-pointer"
                >
                  {voiceEnabled ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                  className="flex h-7 w-7 items-center justify-center border border-[#fcf6b5]/40 bg-black/30 hover:bg-[#d4af37] hover:text-[#12110e] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopAudioPlayback();
                    setOpen(false);
                  }}
                  aria-label="Close AI agent"
                  className="flex h-7 w-7 items-center justify-center border border-[#fcf6b5]/40 bg-black/30 hover:bg-[#d4af37] hover:text-[#12110e] transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Animated signal strip */}
            <div className="flex h-5 items-end gap-0.5 border-b-2 border-[#12110e] bg-[#12110e] px-3 py-0.5">
              {SIGNAL_BARS.map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: isSpeaking || isListening || isLoading
                      ? [`${h}%`, `${(h + 45) % 100}%`, `${h}%`]
                      : `${Math.max(22, Math.floor(h * 0.4))}%`,
                  }}
                  transition={{
                    duration: 0.45,
                    repeat: isSpeaking || isListening || isLoading ? Infinity : 0,
                    delay: i * 0.03,
                  }}
                  className="w-1 bg-[#d4af37]"
                />
              ))}
            </div>

            {/* Transcript */}
            <div
              ref={scrollRef}
              className="flex-1 min-h-[180px] max-h-[42dvh] overflow-y-auto space-y-3 bg-[#f8f5ec] px-3.5 py-3 pixel-matrix-bg"
              aria-live="polite"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[88%] border-2 border-[#12110e] px-3 py-2 text-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#12110e] font-medium text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]'
                          : 'bg-white text-[#12110e] shadow-[3px_3px_0px_#12110e]'
                      }`}
                    >
                      {renderFormattedContent(msg.content)}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 border-2 border-[#12110e] bg-white px-3 py-2 shadow-[3px_3px_0px_#d4af37]">
                    <span className="font-mono text-[10px] font-bold text-[#b8860b]">
                      DECODING_SIGNAL…
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ElevenLabs voice selector */}
            {voices.length > 0 && (
              <div className="flex items-center gap-2 border-t-2 border-[#12110e] bg-[#fcf6b5] px-3 py-1.5">
                <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-wider text-[#12110e]">
                  AI Voice
                </span>
                <select
                  value={voiceId}
                  onChange={(e) => setVoiceId(e.target.value)}
                  aria-label="Choose the agent's ElevenLabs voice"
                  className="min-w-0 flex-1 cursor-pointer border border-[#12110e] bg-white px-1.5 py-1 font-mono text-[10px] font-bold uppercase text-[#12110e] focus:outline-none"
                >
                  {voices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name}
                      {voice.accent ? ` · ${voice.accent}` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-1 border-t-2 border-[#12110e] bg-white px-3 py-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendQuestion(q)}
                  className="border border-[#12110e] bg-[#f8f5ec] px-2 py-0.5 font-mono text-[9px] font-bold text-[#12110e] hover:bg-[#fcf6b5] disabled:opacity-40 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t-2 border-[#12110e] bg-white px-3 py-2.5"
            >
              <button
                type="button"
                onClick={toggleListening}
                aria-label={isListening ? 'Stop listening' : 'Speak to the agent'}
                title={
                  isListening
                    ? 'Stop and transcribe'
                    : voiceEngine === 'elevenlabs'
                    ? 'Speak (ElevenLabs transcription)'
                    : 'Speak to the agent'
                }
                className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#12110e] transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-[#d4af37] text-[#12110e] shadow-[2px_2px_0px_#12110e]'
                    : 'bg-[#f8f5ec] text-[#12110e] hover:bg-[#fcf6b5]'
                }`}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask or talk to the agent…"
                aria-label="Ask Harman's AI agent a question"
                className="flex-1 border-2 border-[#12110e] bg-[#f8f5ec] px-3 py-2 font-mono text-xs text-[#12110e] placeholder:text-[#12110e]/45 focus:bg-[#fcf6b5]/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="btn-gold sheen inline-flex shrink-0 items-center gap-1.5 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider disabled:opacity-40 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
