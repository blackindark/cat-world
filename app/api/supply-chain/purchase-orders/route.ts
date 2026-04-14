import { NextRequest, NextResponse } from 'next/server';
import { createPurchaseOrder, getPurchaseOrders } from '@/lib/supply-chain/service';
import type { CreatePurchaseOrderInput } from '@/lib/supply-chain/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getPurchaseOrders());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePurchaseOrderInput;
    const created = await createPurchaseOrder(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建采购单失败' }, { status: 400 });
  }
}
