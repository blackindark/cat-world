import { NextResponse } from 'next/server';
import { getWarehouses } from '@/lib/supply-chain/service';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getWarehouses());
}
