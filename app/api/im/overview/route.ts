import { NextResponse } from 'next/server';
import { getImOverview } from '@/lib/im/service';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getImOverview());
}
