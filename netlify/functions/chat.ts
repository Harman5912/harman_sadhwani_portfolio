import { answerQuestion } from '../../src/server/ai-api';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let payload: { message?: unknown; history?: unknown } = {};
  try {
    payload = (await req.json()) as { message?: unknown; history?: unknown };
  } catch {
    payload = {};
  }

  const result = await answerQuestion(payload?.message, payload?.history);
  return Response.json(result.json, { status: result.status });
};

export const config = { path: '/api/chat' };
