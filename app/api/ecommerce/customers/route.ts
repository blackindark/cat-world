import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, getCustomers } from '@/lib/ecommerce/service';
import type { CreateCustomerInput } from '@/lib/ecommerce/types';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(await getCustomers());
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateCustomerInput;
    const created = await createCustomer(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建顾客失败' }, { status: 400 });
  }
}
