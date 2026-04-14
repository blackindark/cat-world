import { NextRequest, NextResponse } from 'next/server';
import { checkoutCart } from '@/lib/ecommerce/service';
import type { CheckoutCartInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutCartInput;
    const result = await checkoutCart(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '购物车结算失败' }, { status: 400 });
  }
}
