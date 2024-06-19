import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      fullName,
      email,
      zipCode,
      phone,
      careNeeded,
      relationToResident,
      moveInDate,
      budget,
      listingId,
    } = data;

    // Validation
    if (!fullName || !email || !zipCode || !listingId) {
      return NextResponse.json({ error: 'Full name, email, zip code, and listing ID are required' }, { status: 400 });
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        fullName,
        email,
        zipCode,
        phone,
        careNeeded,
        relationToResident,
        moveInDate: moveInDate ? new Date(moveInDate) : null,
        budget,
        listingId,
      },
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ error: 'Failed to create service request' }, { status: 500 });
  }
}
