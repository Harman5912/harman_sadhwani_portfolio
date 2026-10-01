import { listVoices } from '../../src/server/ai-api';

export default async (_req: Request): Promise<Response> => {
  const result = await listVoices();
  return Response.json(result.json, { status: result.status });
};

export const config = { path: '/api/voice/list' };
