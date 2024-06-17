// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.listing.deleteMany();
    await prisma.category.deleteMany();
    await prisma.author.deleteMany();
    await prisma.location.deleteMany();

    // Create sample data
    const author = await prisma.author.create({
        data: {
            name: 'Platform Owner',
            email: 'owner@example.com',
            password: 'securepassword', // Make sure to hash passwords in a real application
        },
    });

    const category = await prisma.category.create({
        data: {
            name: 'Assisted Living',
            slug: 'assisted-living',
            description: 'Assisted living facilities for seniors',
            image: 'https://placehold.co/600x400',
        },
    });

    const location1 = await prisma.location.create({
        data: {
            latitude: 42.3601,
            longitude: -71.0589,
            address: '123 Main Street, Boston, MA',
        },
    });

    const location2 = await prisma.location.create({
        data: {
            latitude: 29.7604,
            longitude: -95.3698,
            address: '456 Elm Street, Houston, TX',
        },
    });

    await prisma.listing.createMany({
        data: [
            {
                slug: 'edelweiss-assisted-living',
                name: 'Edelweiss Assisted Living',
                phone: '(857) 547-2000',
                views: 57,
                state: 'MA',
                image: 'https://placehold.co/600x400',
                gallery: JSON.stringify(['https://placehold.co/600x400', 'https://placehold.co/600x400']),
                description: '<p><strong>Edelweiss Assisted Living</strong> offers a comfortable and secure environment for seniors, providing a variety of services and amenities tailored to meet their unique needs.</p>',
                rating: 4.5,
                website: 'https://edelweiss-assisted-living.com',
                operatingHours: '9 AM - 5 PM',
                tags: JSON.stringify(['popular', 'featured']),
                categoryId: category.id,
                locationId: location1.id,
                authorId: author.id,
            },
            {
                slug: 'golden-years-assisted-living',
                name: 'Golden Years Assisted Living',
                phone: '(409) 745-9096',
                views: 30,
                state: 'TX',
                image: 'https://placehold.co/600x400',
                gallery: JSON.stringify(['https://placehold.co/600x400', 'https://placehold.co/600x400']),
                description: '<p><strong>Golden Years Assisted Living</strong> provides personalized care and support for seniors. Our facility offers a warm, home-like atmosphere with modern amenities and professional care services.</p>',
                rating: 4.7,
                website: 'https://golden-years-assisted-living.com',
                operatingHours: '8 AM - 6 PM',
                tags: JSON.stringify(['new', 'featured']),
                categoryId: category.id,
                locationId: location2.id,
                authorId: author.id,
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
