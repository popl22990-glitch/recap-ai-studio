import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
serve(async req => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const body = await req.json().catch(() => ({}));
  const provider = Deno.env.get('AI_PROVIDER') || 'openai-compatible';
  if (provider === 'openai-compatible' && !Deno.env.get('OPENAI_API_KEY')) return Response.json({ok:false,error:'AI provider key is not configured yet.'},{status:503});
  return Response.json({ok:true,provider,stage:body.stage||'recap',message:'Provider adapter ready. Add the provider secret and render worker to enable live processing.'});
});
