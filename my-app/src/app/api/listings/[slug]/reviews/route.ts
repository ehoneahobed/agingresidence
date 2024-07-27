import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      text,
      rating,
      listingId,
      reviewerName,
      reviewerEmail,
      relationship,
      careType,
      foodRating,
      activitiesRating,
      staffRating,
      facilityRating,
      valueRating,
    } = body;

    // console.log(`req body:`, body);

    const review = await prisma.review.create({
      data: {
        text,
        rating,
        listingId: Number(listingId),
        reviewerName,
        reviewerEmail,
        relationship,
        careType,
        foodRating,
        activitiesRating,
        staffRating,
        facilityRating,
        valueRating,
        approved: false, // Reviews need to be approved before being displayed
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  // console.log(`slug: ${slug}`); // slug in here represents the listingId

  try {
    const reviews = await prisma.review.findMany({
      where: { listingId: Number(slug), approved: true },
    });

    console.log(`reviews:`, reviews);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
