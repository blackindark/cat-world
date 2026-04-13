import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'northstar-erp-next',
    timestamp: new Date().toISOString(),
  });
}
