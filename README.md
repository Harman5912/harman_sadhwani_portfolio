<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/507d0129-0f0d-40c9-9bf4-920b6c71caa5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Gemini (the agent's brain)

```
GEMINI_API_KEY="your-key-from-aistudio.google.com/apikey"
GEMINI_MODEL="gemini-3.8-flash"   # optional; this is the default
```

The agent is grounded in `src/data/portfolio.ts` via the system instruction in
`src/server/ai-api.ts`, so it only answers from your verified portfolio data. `gemini-2.5-flash` returns a 404 for new API keys
("no longer available to new users") — use `gemini-3.8-flash` or `gemini-flash-latest`.

## ElevenLabs AI Audio (voice output + microphone input)

The floating AI agent speaks with ElevenLabs (and transcribes the microphone with ElevenLabs Scribe).
Set these in `.env.local`:

```
ELEVENLABS_API_KEY="your-key-from-elevenlabs.io/app/settings/api-keys"
# optional overrides — defaults shown
ELEVENLABS_VOICE_ID="21m00Tcm4TlvDq8ikWAM"
ELEVENLABS_TTS_MODEL="eleven_multilingual_v2"
ELEVENLABS_STT_MODEL="scribe_v1"
```

The key stays server-side only: the browser talks to proxy routes, never to ElevenLabs directly.

| Route | Purpose |
| --- | --- |
| `GET /api/voice/status` | Whether ElevenLabs is configured, plus the active voice/model |
| `GET /api/voice/list` | Voice catalogue for the in-panel AI Voice picker |
| `POST /api/voice/tts` | `{ text, voiceId? }` → `audio/mpeg` spoken reply |
| `POST /api/voice/stt` | Raw audio body → `{ transcript }` via ElevenLabs Scribe |

Without an ElevenLabs key the agent degrades gracefully: browser `speechSynthesis` for
replies and browser `SpeechRecognition` for the mic.

## Deployment

One API implementation, two runtimes — both call the shared logic in
`src/server/ai-api.ts`, so behaviour can't drift between them:

| Runtime | Entry point | Used by |
| --- | --- | --- |
| Express (`npm run dev`, `npm start`) | `server.ts` | local development, Node hosting |
| Netlify Functions | `netlify/functions/*.ts` | Netlify |

### Netlify

`netlify.toml` is checked in with the build command, publish directory, functions
directory and SPA fallback, so connecting the repo needs no manual settings.

Add the environment variables in **Site configuration → Environment variables**
(paste the block as `KEY=value` lines, unquoted):

```
GEMINI_API_KEY=your-gemini-key
GEMINI_MODEL=gemini-3.8-flash
ELEVENLABS_API_KEY=your-elevenlabs-key
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_TTS_MODEL=eleven_multilingual_v2
ELEVENLABS_STT_MODEL=scribe_v1
```

⚠️ These are **server-only** secrets. Never rename them with a `VITE_` prefix — Vite
inlines `VITE_*` values into the public JavaScript bundle, which would expose your keys
to every visitor. The function files read them from `process.env` at runtime instead.

If the variables are missing the site still deploys and the agent still works: it falls
back to its built-in portfolio answers and browser speech.
