import { NextRequest, NextResponse } from 'next/server';
import { createReceipt, getReceipts } from '@/lib/supply-chain/service';
import type { CreateReceiptInput } from '@/lib/supply-chain/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getReceipts());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateReceiptInput;
    const created = await createReceipt(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '收货入库失败' }, { status: 400 });
  }
}
