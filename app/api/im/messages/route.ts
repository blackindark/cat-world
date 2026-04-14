import { NextRequest, NextResponse } from 'next/server';
import { sendImMessage } from '@/lib/im/service';
import type { SendImMessageInput } from '@/lib/im/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SendImMessageInput;
    const created = await sendImMessage(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : '发送消息失败' }, { status: 400 });
  }
}
