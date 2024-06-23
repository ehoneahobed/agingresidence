// src/app/api/listings/similar/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Find the current listing with its categories
    const currentListing = await prisma.listing.findUnique({
      where: { slug },
      include: { categoryListing: { include: { category: true } } },
    });

    if (!currentListing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Get the category IDs
    const categoryIds = currentListing.categoryListing.map(cl => cl.categoryId);

    // Find similar listings that share at least one category with the current listing
    const similarListings = await prisma.listing.findMany({
      where: {
        id: { not: currentListing.id },
        categoryListing: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      },
      take: 5, // Limit the number of similar listings
      include: {
        location: true,
        author: true,
      },
    });

    return NextResponse.json(similarListings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch similar listings' }, { status: 500 });
  }
}
