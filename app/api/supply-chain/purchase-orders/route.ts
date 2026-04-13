import { NextResponse } from 'next/server';
import { getPurchaseOrders } from '@/lib/supply-chain/service';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getPurchaseOrders());
}
