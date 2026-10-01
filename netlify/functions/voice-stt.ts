import { transcribeAudio } from '../../src/server/ai-api';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const audio = Buffer.from(await req.arrayBuffer());
  const contentType = req.headers.get('content-type') || 'audio/webm';

  const result = await transcribeAudio(audio, contentType);
  return Response.json(result.json, { status: result.status });
};

export const config = { path: '/api/voice/stt' };
