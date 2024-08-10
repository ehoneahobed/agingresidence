import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    console.log('Webhook event received:', event);

    // Handle different event types
    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data);
        break;
      case 'user.updated':
        await handleUserUpdated(event.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(event.data);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
}

async function handleUserCreated(userData: any) {
  await prisma.user.create({
    data: {
      email: userData.email_addresses[0].email_address,
      name: userData.first_name + ' ' + userData.last_name,
      clerkId: userData.id,
    },
  });
}

async function handleUserUpdated(userData: any) {
  await prisma.user.update({
    where: { clerkId: userData.id },
    data: {
      email: userData.email_addresses[0].email_address,
      name: userData.first_name + ' ' + userData.last_name,
    },
  });
}

async function handleUserDeleted(userData: any) {
  await prisma.user.delete({
    where: { clerkId: userData.id },
  });
}
