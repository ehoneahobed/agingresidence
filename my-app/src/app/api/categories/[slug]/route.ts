// app/api/categories/[slug]/route.ts
// Get Listings by Category
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
            location: true,
            author: true,
          },
        },
      },
    });
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category.listings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
