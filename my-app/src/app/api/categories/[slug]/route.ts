// app/api/categories/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        listings: {
          include: {
            listing: {
              include: {
                location: true,
                author: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    const listings = category.listings.map((categoryListing) => categoryListing.listing);

    return NextResponse.json(listings, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching category listings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
