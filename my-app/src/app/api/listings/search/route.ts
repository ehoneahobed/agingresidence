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

    if (query) {
      filters.push({
        OR: [
          { name: { contains: query } },
          { description: { contains: query} },
        ],
      });
    }

    if (category) {
      filters.push({
        category: {
          name: { contains: category },
        },
      });
    }

    if (location) {
      filters.push({
        location: {
          address: { contains: location },
        },
      });
    }

    const listings = await prisma.listing.findMany({
      where: {
        AND: filters,
      },
    });

    return NextResponse.json(listings);
  } catch (error: any) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}
