import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch listings from the database
    const listings = await prisma.listing.findMany();
    
    // Filter listings to get featured ones
    const featuredListings = listings.filter((listing) => {
      try {
        // Directly access tags if it's a JSON field
        const tags = listing.tags as string[]; // assuming tags is an array of strings
        console.log('Tags:', tags); // Debugging log
        return tags.includes('featured');
      } catch (error) {
        console.error('Error processing tags:', error);
        return false;
      }
    }).slice(0, 6); // Limit to 6 featured listings

    // Return the featured listings as a JSON response
    return NextResponse.json(featuredListings, { status: 200 });
  } catch (error) {
    console.error('Error fetching listings:', error); // Debugging log
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
