// app/api/listings/[slug]/route.ts
// Get Single Listing
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        location: true,
        author: true,
      },
    });
    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
