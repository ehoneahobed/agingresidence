import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of PrismaClient in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  try {
    const filters: any[] = [];

    if (query && query.trim()) {
      filters.push({
        OR: [
          { name: { contains: query.trim() } },
          { description: { contains: query.trim() } },
        ],
      });
    }

    if (category && category.trim()) {
      filters.push({
        category: {
          name: { contains: category.trim() },
        },
      });
    }

    if (location && location.trim()) {
      filters.push({
        location: {
          address: { contains: location.trim() },
        },
      });
    }

    console.log('Filters applied:', JSON.stringify(filters, null, 2));

    const listings = await prisma.listing.findMany({
      where: filters.length > 0 ? { AND: filters } : {},
    });

    console.log('Listings fetched:', listings);

    if (listings.length === 0) {
      console.log('No listings found');
      return NextResponse.json({ message: 'No listings found' }, { status: 404 });
    }

    return NextResponse.json(listings);
  } catch (error: any) {
    console.error('Error fetching listings:', error.message);
    return NextResponse.json({ error: 'Failed to fetch listings', details: error.message }, { status: 500 });
  }
}
