import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  answerQuestion,
  getVoiceStatus,
  listVoices,
  synthesizeSpeech,
  transcribeAudio,
  type ApiResult,
} from './src/server/ai-api';

// `.env.local` takes precedence over `.env` (dotenv never overrides already-set vars)
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Send a platform-neutral ApiResult through Express
function sendResult(res: express.Response, result: ApiResult) {
  if ('audio' in result) {
    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Length', String(result.audio.length));
    res.setHeader('Cache-Control', 'no-store');
    return res.status(result.status).send(result.audio);
  }
  return res.status(result.status).json(result.json);
}

// Minimal valid PDF generator for /Harman_Sadhwani_Resume.pdf when static file is not yet placed in /public
function generateAuthoritativeResumePdfBuffer(): Buffer {
  const lines = [
    'HARMAN SADHWANI',
    'Full-Stack Developer | AI Builder | Application Developer | Agentic AI Developer',
    'Email: sadhwaniharman@gmail.com | GitHub: github.com/Harman5912',
    'LinkedIn: linkedin.com/in/harman-sadhwani-a659a6225/',
    '------------------------------------------------------------------------',
    'EDUCATION',
    'Bachelor of Computer Applications (BCA)',
    'Focus: Software Development, Full-Stack Web, Application Development & AI Systems',
    '',
    'EXPERIENCE',
    'Full Stack AI/ML Intern - Technical Department (Duration: 4 months starting 8 June)',
    '',
    'FLAGSHIP PROJECTS',
    '1. Keys.AI - AI assistant ecosystem, application/browser/VS Code control, Ollama & Crown Code Agent',
    '   Release: https://github.com/Harman5912/KEYS.AI/releases',
    '2. ReviewBOT - AI-assisted GitHub code review platform with Firebase & local/API models',
    '   Website: https://reviewbot-web.onrender.com/',
    '3. True Blade - Upcoming Flagship Project by Crown Pierce (Coming Soon)',
    '',
    'ACHIEVEMENTS & HACKATHONS',
    "- Exuberance'26 Tech Expo: First Runner-Up (Trophy + Blue Ribbon Medal)",
    '- Hackathon 2.0 (March 2026): Second Position (Blue Ribbon Medal)',
    '- ICHIS-2026 International Conference: Second Runner-Up - Poster Presentation',
    '- National Conference: Paper Presentation / First (Enhancing Women Safety Using Technology)',
    '- Smart India Hackathon 2025: Qualified for Second Round',
    '- MSME IDEA HACKATHON 6.0: Selected for Second Round',
    '- Hackofiesta 6.0 (AISpire UP): Participation (Yellow Ribbon Medal)',
    '',
    'CERTIFICATIONS & TRAINING',
    '- Certifications: Agentic AI Development (Claude/Anthropic), Full Stack Backend (Microsoft),',
    '  Cloud Hosting Database SQL (Oracle), Python, Java',
    '- Training: Web Development, Database using SQL, Data Analyst (Excel+SQL+Python), Angular',
  ];

  const escapedLines = lines
    .map((line, idx) => {
      const safe = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
      return idx === 0 ? `(${safe}) Tj` : `0 -18 Td (${safe}) Tj`;
    })
    .join('\n');

  const streamContent = `BT\n/F1 10 Tf\n50 750 Td\n${escapedLines}\nET`;
  const pdf = `%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj << /Length ${streamContent.length} >> stream
${streamContent}
endstream endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000241 00000 n 
0000000${(295 + streamContent.length).toString().padStart(3, '0')} 00000 n 
trailer << /Size 6 /Root 1 0 R >>
startxref
${365 + streamContent.length}
%%EOF`;

  return Buffer.from(pdf, 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Serve static /public/Harman_Sadhwani_Resume.pdf if present, otherwise generated PDF
  app.get('/Harman_Sadhwani_Resume.pdf', (req, res, next) => {
    const publicPdfPath = path.join(__dirname, 'public', 'Harman_Sadhwani_Resume.pdf');
    if (fs.existsSync(publicPdfPath)) {
      return next();
    }
    const pdfBuffer = generateAuthoritativeResumePdfBuffer();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="Harman_Sadhwani_Resume.pdf"'
    );
    res.send(pdfBuffer);
  });

  // Server-side Gemini API endpoint powering the floating AI agent
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body || {};
    sendResult(res, await answerQuestion(message, history));
  });

  // ── ElevenLabs AI Audio endpoints ──────────────────────────────────────────
  // Mirrored by netlify/functions/*.ts for static hosting; both runtimes share
  // the implementation in src/server/ai-api.ts.
  app.get('/api/voice/status', (_req, res) => {
    sendResult(res, getVoiceStatus());
  });

  app.get('/api/voice/list', async (_req, res) => {
    sendResult(res, await listVoices());
  });

  app.post('/api/voice/tts', async (req, res) => {
    const { text, voiceId } = req.body || {};
    sendResult(res, await synthesizeSpeech(text, voiceId));
  });

  app.post('/api/voice/stt', express.raw({ type: '*/*', limit: '25mb' }), async (req, res) => {
    const audio = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body ?? '');
    const contentType = req.headers['content-type'] || 'audio/webm';
    sendResult(res, await transcribeAudio(audio, String(contentType)));
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
