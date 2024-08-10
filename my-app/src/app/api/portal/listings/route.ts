// app/api/portal/listings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') as string) || 1;
  const pageSize = parseInt(searchParams.get('pageSize') as string) || 10;
  const skip = (page - 1) * pageSize;
  const sortField = searchParams.get('sortField') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const filter = searchParams.get('filter') || '';

  try {
    const [listings, totalListings] = await Promise.all([
      prisma.listing.findMany({
        skip,
        take: pageSize,
        where: {
          name: {
            contains: filter,
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        include: {
          location: true,
          author: true,
        },
      }),
      prisma.listing.count({
        where: {
          name: {
            contains: filter,
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalListings / pageSize);

    // Log the fetched listings
    console.log('Fetched listings:', listings);

    return NextResponse.json({ listings, totalPages });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { slug, name, phone, state, image, gallery, description, website, operatingHours, tags, locationId, authorId, type_of_service, status } = await req.json();

  try {
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        slug,
        name,
        phone,
        state,
        image,
        gallery,
        description,
        website,
        operatingHours,
        tags,
        location: { connect: { id: locationId } },
        author: { connect: { id: authorId } },
        type_of_service,
        status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    return NextResponse.json({ error: 'Error updating listing' }, { status: 500 });
  }
}
