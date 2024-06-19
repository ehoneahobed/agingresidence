import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { state: string } }) {
  const { state } = params;
  console.log(state)
  
  if (!state) {
    return NextResponse.json({ error: 'State is required' }, { status: 400 });
  }

  try {
    const stateAbbreviation = state.toUpperCase();
    const listings = await prisma.listing.findMany({
      where: {
        state: stateAbbreviation,
      },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
