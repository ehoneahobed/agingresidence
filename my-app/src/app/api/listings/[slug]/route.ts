import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Find the listing by slug
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

    // Increment the view count
    const updatedListing = await prisma.listing.update({
      where: { slug },
      data: { views: listing.views + 1 },
      include: {
        location: true,
        author: true,
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
