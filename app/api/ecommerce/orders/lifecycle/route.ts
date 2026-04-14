import { NextRequest, NextResponse } from 'next/server';
import { updateOrderLifecycle } from '@/lib/ecommerce/service';
import type { UpdateOrderLifecycleInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as UpdateOrderLifecycleInput;
    const result = await updateOrderLifecycle(body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '订单流转失败' }, { status: 400 });
  }
}
