import { NextRequest, NextResponse } from 'next/server';
import { createAfterSalesTicket, getAfterSalesTickets } from '@/lib/ecommerce/service';
import type { CreateAfterSalesInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getAfterSalesTickets());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateAfterSalesInput;
    const result = await createAfterSalesTicket(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建售后失败' }, { status: 400 });
  }
}
