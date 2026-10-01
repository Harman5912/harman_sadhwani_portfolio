/**
 * Platform-neutral AI API for the floating agent.
 *
 * This module holds the real logic behind the app's API surface and returns plain
 * results, so the exact same behaviour can be served by two different runtimes:
 *   - `server.ts` (Express, local dev / Node hosting)
 *   - `netlify/functions/*.ts` (Netlify Functions, static hosting)
 *
 * API keys are read from `process.env` only and are never returned to the browser.
 */

import { GoogleGenAI } from '@google/genai';
import { portfolioData } from '../data/portfolio';

export type JsonResult = { status: number; json: unknown };
export type AudioResult = { status: number; audio: Buffer; contentType: string };
export type ApiResult = JsonResult | AudioResult;

const SYSTEM_INSTRUCTION = `You are Harman's AI Agent, the official voice-enabled assistant embedded inside Harman Sadhwani's Solar-Punk Digital Laboratory & Portfolio Website. You are pinned to the right side of the screen and your replies are spoken aloud to visitors.
Answer questions ONLY using the verified portfolioData JSON provided below.
CRITICAL RULES:
- Never fabricate companies, employment dates, awards, project statistics, user counts, revenue, certifications, links, or rankings.
- Clearly distinguish between formal Certifications and Technical Training when asked.
- For True Blade (by Crown Pierce), state that it is an upcoming flagship project marked "Coming Soon" and do not invent technical specifications.
- Keep answers conversational, concise, warm, and clearly structured — they are read aloud, so avoid heavy markup or long URLs.

VERIFIED PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}
`;

// ── Secrets ───────────────────────────────────────────────────────────────────

// Placeholders from .env.example / copy-pasted templates must not count as real
// keys, otherwise the app would keep calling a provider that always rejects it
// instead of cleanly falling back to its offline behaviour.
const PLACEHOLDER_KEY_PATTERN = /^(my_|your_|replace|change_?me|placeholder|todo|xxx)/i;

function readSecret(name: 'GEMINI_API_KEY' | 'ELEVENLABS_API_KEY'): string | null {
  const key = process.env[name]?.trim();
  if (!key || PLACEHOLDER_KEY_PATTERN.test(key)) return null;
  return key;
}

// ── Gemini (the agent's brain) ────────────────────────────────────────────────

const getGeminiApiKey = () => readSecret('GEMINI_API_KEY');

// Gemini is intermittently overloaded (503) or rate limited (429 — the free tier
// allows only a handful of requests per minute); retry those transient failures so
// the agent does not fall back to canned answers on the first hiccup.
function retryDelayMs(error: unknown, attempt: number): number {
  const status = (error as { status?: number })?.status;
  const message = error instanceof Error ? error.message : String(error ?? '');
  // Google states the wait in the error text, e.g. "Please retry in 12.2s"
  const suggested = message.match(/retry in ([\d.]+)\s*s/i);
  if (suggested) {
    const delay = Number(suggested[1]) * 1000;
    if (Number.isFinite(delay) && delay > 0) return Math.min(delay + 250, 9000);
  }
  return status === 429 ? 2000 * attempt : 400 * attempt;
}

async function generateContentWithRetry(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  attempts = 3
) {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
        },
      });
    } catch (error) {
      lastError = error;
      const status = (error as { status?: number })?.status;
      const detail = error instanceof Error ? error.message : String(error ?? '');
      // A daily free-tier quota will not recover while the visitor waits — fail fast
      // so the client's grounded local answer appears immediately instead of stalling.
      if (/PerDay/i.test(detail)) throw error;
      if (status !== 503 && status !== 429) throw error;
      if (attempt < attempts) {
        const delay = retryDelayMs(error, attempt);
        console.warn(
          `Gemini ${status} — retry ${attempt}/${attempts - 1} in ${
            Math.round(delay / 100) / 10
          }s`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function answerQuestion(
  message: unknown,
  history: unknown
): Promise<JsonResult> {
  if (!message || typeof message !== 'string') {
    return { status: 400, json: { error: 'Message is required' } };
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return { status: 503, json: { error: 'Gemini API key not configured' } };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const conversationContext = Array.isArray(history)
      ? history
          .map((h: { role?: string; content?: string }) => `${h.role}: ${h.content}`)
          .join('\n')
      : '';

    const prompt = conversationContext
      ? `Previous conversation:\n${conversationContext}\n\nUser question: ${message}`
      : message;

    const response = await generateContentWithRetry(
      ai,
      process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      prompt
    );

    return { status: 200, json: { reply: response.text || '' } };
  } catch (error) {
    console.error('Gemini API error:', error);
    return { status: 500, json: { error: 'Failed to generate AI response' } };
  }
}

// ── ElevenLabs AI Audio (voice output + microphone transcription) ─────────────

// Read lazily: this module is imported before `dotenv.config()` runs in server.ts
const elevenLabsBaseUrl = () =>
  process.env.ELEVENLABS_API_URL?.trim() || 'https://api.elevenlabs.io';
// Roger is one of the few premade voices the ElevenLabs FREE tier allows via API.
// Most library voices (e.g. "Rachel", 21m00Tcm4TlvDq8ikWAM) fail there with
// 402 payment_required — verified against a free key: Rachel 402, Roger 200.
const DEFAULT_ELEVENLABS_VOICE_ID = 'CwhRBWXzGAHq8TQ4Fs17'; // "Roger"
const DEFAULT_ELEVENLABS_TTS_MODEL = 'eleven_multilingual_v2';
const DEFAULT_ELEVENLABS_STT_MODEL = 'scribe_v1';
const MAX_SPOKEN_CHARACTERS = 2000;

const getElevenLabsApiKey = () => readSecret('ELEVENLABS_API_KEY');

const elevenLabsVoiceId = () =>
  process.env.ELEVENLABS_VOICE_ID?.trim() || DEFAULT_ELEVENLABS_VOICE_ID;
const elevenLabsTtsModel = () =>
  process.env.ELEVENLABS_TTS_MODEL?.trim() || DEFAULT_ELEVENLABS_TTS_MODEL;
const elevenLabsSttModel = () =>
  process.env.ELEVENLABS_STT_MODEL?.trim() || DEFAULT_ELEVENLABS_STT_MODEL;

function extensionForAudioType(contentType: string): string {
  if (contentType.includes('mp4') || contentType.includes('aac')) return 'mp4';
  if (contentType.includes('ogg')) return 'ogg';
  if (contentType.includes('wav')) return 'wav';
  if (contentType.includes('mpeg') || contentType.includes('mp3')) return 'mp3';
  return 'webm';
}

// Lets the floating agent know whether high-fidelity AI audio is available,
// so it can fall back to browser speech synthesis when it is not.
export function getVoiceStatus(): JsonResult {
  const configured = Boolean(getElevenLabsApiKey());
  return {
    status: 200,
    json: {
      configured,
      engine: configured ? 'elevenlabs' : 'browser',
      tts: configured,
      stt: configured,
      voiceId: elevenLabsVoiceId(),
      ttsModel: elevenLabsTtsModel(),
      sttModel: elevenLabsSttModel(),
    },
  };
}

// ElevenLabs voice catalogue powering the in-panel voice picker
export async function listVoices(): Promise<JsonResult> {
  const apiKey = getElevenLabsApiKey();
  if (!apiKey) {
    return {
      status: 503,
      json: { error: 'ElevenLabs API key not configured', voices: [] },
    };
  }

  try {
    const upstream = await fetch(`${elevenLabsBaseUrl()}/v1/voices`, {
      headers: { 'xi-api-key': apiKey },
    });

    if (!upstream.ok) {
      console.error('ElevenLabs voices error:', upstream.status, await upstream.text());
      return {
        status: 502,
        json: { error: 'Failed to load ElevenLabs voices', voices: [] },
      };
    }

    const data = (await upstream.json()) as {
      voices?: Array<{
        voice_id?: string;
        name?: string;
        category?: string;
        labels?: Record<string, string>;
      }>;
    };

    const voices = (Array.isArray(data?.voices) ? data.voices : [])
      .filter((voice) => typeof voice?.voice_id === 'string')
      .map((voice) => ({
        id: voice.voice_id as string,
        name: voice.name || 'Unnamed voice',
        category: voice.category || '',
        accent: voice.labels?.accent || '',
        description: voice.labels?.description || '',
      }))
      .slice(0, 40);

    return { status: 200, json: { voices, voiceId: elevenLabsVoiceId() } };
  } catch (error) {
    console.error('ElevenLabs voices error:', error);
    return {
      status: 500,
      json: { error: 'Failed to load ElevenLabs voices', voices: [] },
    };
  }
}

// Speech synthesis — returns ElevenLabs audio for the agent's spoken replies
export async function synthesizeSpeech(
  text: unknown,
  voiceId: unknown
): Promise<ApiResult> {
  const apiKey = getElevenLabsApiKey();
  if (!apiKey) {
    return { status: 503, json: { error: 'ElevenLabs API key not configured' } };
  }

  const spokenText = typeof text === 'string' ? text.trim() : '';
  if (!spokenText) {
    return { status: 400, json: { error: 'Text is required' } };
  }

  const requestedVoiceId =
    typeof voiceId === 'string' && voiceId.trim()
      ? voiceId.trim()
      : elevenLabsVoiceId();

  try {
    const upstream = await fetch(
      `${elevenLabsBaseUrl()}/v1/text-to-speech/${encodeURIComponent(
        requestedVoiceId
      )}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: spokenText.slice(0, MAX_SPOKEN_CHARACTERS),
          model_id: elevenLabsTtsModel(),
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.75,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!upstream.ok) {
      console.error('ElevenLabs TTS error:', upstream.status, await upstream.text());
      return { status: 502, json: { error: 'ElevenLabs speech synthesis failed' } };
    }

    return {
      status: 200,
      audio: Buffer.from(await upstream.arrayBuffer()),
      contentType: 'audio/mpeg',
    };
  } catch (error) {
    console.error('ElevenLabs TTS error:', error);
    return { status: 500, json: { error: 'ElevenLabs speech synthesis failed' } };
  }
}

// Speech to text — transcribes microphone recordings via ElevenLabs Scribe
export async function transcribeAudio(
  audio: Buffer,
  contentType: string
): Promise<JsonResult> {
  const apiKey = getElevenLabsApiKey();
  if (!apiKey) {
    return { status: 503, json: { error: 'ElevenLabs API key not configured' } };
  }

  if (!audio.length) {
    return { status: 400, json: { error: 'Audio recording is required' } };
  }

  try {
    const form = new FormData();
    form.append('model_id', elevenLabsSttModel());
    form.append('tag_audio_events', 'false');
    form.append(
      'file',
      new Blob([new Uint8Array(audio)], { type: contentType }),
      `question.${extensionForAudioType(contentType)}`
    );

    const upstream = await fetch(`${elevenLabsBaseUrl()}/v1/speech-to-text`, {
      method: 'POST',
      headers: { 'xi-api-key': apiKey },
      body: form,
    });

    if (!upstream.ok) {
      console.error('ElevenLabs STT error:', upstream.status, await upstream.text());
      return { status: 502, json: { error: 'ElevenLabs transcription failed' } };
    }

    const data = (await upstream.json()) as {
      text?: string;
      transcript?: string;
      language_code?: string;
    };
    const transcript = (data?.text || data?.transcript || '').trim();

    return {
      status: 200,
      json: { transcript, language: data?.language_code ?? null },
    };
  } catch (error) {
    console.error('ElevenLabs STT error:', error);
    return { status: 500, json: { error: 'ElevenLabs transcription failed' } };
  }
}
