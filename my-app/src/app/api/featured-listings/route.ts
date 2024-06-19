import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const listings = await prisma.listing.findMany();
    const featuredListings = listings.filter((listing) => {
      const tags = JSON.parse(listing.tags as unknown as string);
      console.log(tags.includes('featured'));
      return tags.includes('featured');
    }).slice(0, 6); // Limit to 6 featured listings

    return NextResponse.json(featuredListings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
