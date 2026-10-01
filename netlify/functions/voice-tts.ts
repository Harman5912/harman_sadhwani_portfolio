import { synthesizeSpeech } from '../../src/server/ai-api';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let payload: { text?: unknown; voiceId?: unknown } = {};
  try {
    payload = (await req.json()) as { text?: unknown; voiceId?: unknown };
  } catch {
    payload = {};
  }

  const result = await synthesizeSpeech(payload?.text, payload?.voiceId);

  if ('audio' in result) {
    return new Response(new Uint8Array(result.audio), {
      status: result.status,
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'no-store',
      },
    });
  }

  return Response.json(result.json, { status: result.status });
};

export const config = { path: '/api/voice/tts' };
