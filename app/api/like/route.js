import { contar, curtir } from '@/lib/likes';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const mvd = new URL(req.url).searchParams.get('mvd') || '';
  return Response.json({ mvd, n: await contar(mvd) });
}

export async function POST(req) {
  const { mvd } = await req.json().catch(() => ({}));
  if (!mvd) return Response.json({ ok: false, erro: 'sem mvd' }, { status: 400 });
  const n = await curtir(mvd);
  // `null` = nêo há contador configurado. Nêo é erro do visitante, e a tela nêo
  // deve acusar falha por isso — some o número e pronto.
  return Response.json({ ok: n !== null, n: n ?? 0 });
}
