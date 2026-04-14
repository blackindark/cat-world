import { NextResponse } from 'next/server';
import { getEcommerceOverview } from '@/lib/ecommerce/service';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getEcommerceOverview());
}
