import { NextRequest, NextResponse } from 'next/server';
import { createSupplier, getSuppliers } from '@/lib/supply-chain/service';
import type { CreateSupplierInput } from '@/lib/supply-chain/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getSuppliers());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateSupplierInput;
    const created = await createSupplier(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建供应商失败' }, { status: 400 });
  }
}
