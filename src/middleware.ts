import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { ip, nextUrl } = req;

  nextUrl.searchParams.set('clientIp', ip || '127.0.0.1');

  return NextResponse.rewrite(nextUrl);
}
