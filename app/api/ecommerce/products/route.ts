import { NextRequest, NextResponse } from 'next/server';
import { createProduct, getProducts } from '@/lib/ecommerce/service';
import type { CreateProductInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getProducts());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateProductInput;
    const created = await createProduct(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建商品失败' }, { status: 400 });
  }
}
