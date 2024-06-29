import { NextRequest, NextResponse } from 'next/server';
import { log404Error } from '@/utils/logger';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (url) {
      log404Error(url);
      return NextResponse.json({ message: 'Logged' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error logging 404:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
