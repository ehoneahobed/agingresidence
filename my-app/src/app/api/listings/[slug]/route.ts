import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function validateImage(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (error) {
    console.error('Error validating image:', error);
    return false;
  }
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Find the listing by slug
    const listing = await prisma.listing.findUnique({
      where: { slug },
      include: {
        location: true,
        author: true,
      },
    });
    if (!listing) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
    }

    // Increment the view count
    const updatedListing = await prisma.listing.update({
      where: { slug },
      data: { views: listing.views + 1 },
      include: {
        location: true,
        author: true,
      },
    });

    // Validate images
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const gallery = updatedListing.gallery as string[];

    const validImages = gallery && gallery.length > 0 ? await Promise.all(
      gallery.map(async (image: string) => {
        const imageUrl = `${baseUrl}${image}`;
        const isValid = await validateImage(imageUrl);
        return isValid ? image : null;
      })
    ).then(results => results.filter(Boolean) as string[]) : [];

    return NextResponse.json({
      ...updatedListing,
      images: validImages,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
