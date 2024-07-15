import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (response.ok) {
      return NextResponse.json({ valid: true }, { status: 200 });
    }
    return NextResponse.json({ valid: false }, { status: 200 });
  } catch (error) {
    console.error('Error validating image:', error);
    return NextResponse.json({ error: 'Failed to validate image' }, { status: 500 });
  }
}
