// app/api/portal/listings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // console.log(listing)
    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching listing' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { name, phone, state, locationId, authorId } = await req.json();

  try {
    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        name,
        phone,
        state,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        location: { connect: { id: locationId } },
        author: { connect: { id: authorId } },
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updatedListing);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating listing' }, { status: 500 });
  }
}
