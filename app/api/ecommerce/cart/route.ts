import { NextRequest, NextResponse } from 'next/server';
import { addCartItem, getCartItems } from '@/lib/ecommerce/service';
import type { AddCartItemInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getCartItems());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AddCartItemInput;
    const created = await addCartItem(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '加入购物车失败' }, { status: 400 });
  }
}
