import { NextRequest, NextResponse } from 'next/server';
import { createImGroup } from '@/lib/im/service';
import type { CreateImGroupInput } from '@/lib/im/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateImGroupInput;
    const created = await createImGroup(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '创建群聊失败' }, { status: 400 });
  }
}
