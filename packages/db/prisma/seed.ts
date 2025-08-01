import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
//Note id must be a string and not an INT so i have done it
async function main() {
  const user = await prisma.user.upsert({
    where: { email:"diya@example.com" },
    update: {},
    create: {
      id: 'user-1',
      first_name: 'Diya',
      last_name: 'Chain',
      email: 'diya@example.com',
      password: 'Pass@123',
      role: 'user',
      is_verified: true,
      public_key: 'public-key-alice',
      encrypted_private_key: 'encrypted-private-key-alice',
    },
  });

  const organiser = await prisma.user.upsert({
    where:{email:"sonali@events.com"},
    update:{},
    create: {
      id: 'organiser-1',
      first_name: 'Sonali',
      last_name: 'Smith',
      email: 'sonali@events.com',
      password: 'Pass@123',
      role: 'organiser',
      is_verified: true,
      public_key: 'public-key-bob',
      encrypted_private_key: 'encrypted-private-key-bob',
    },
  });

  const verifier = await prisma.user.upsert({
    where:{email:"vedang@capital.com"},
    update:{},
    create: {
      id: 'verifier-1', //auto generated in endpoints as I have set to uuid 
      first_name: 'Vedang',
      last_name: 'Scan',
      email: 'vedang@capital.com',
      password: 'Pass@123',
      role: 'verifier',
      is_verified: true,
      public_key: 'public-key-verifier',
      encrypted_private_key: 'encrypted-private-key-verifier',
    },
  });

  await prisma.event.createMany({
    data: [
      {
        id: 'event-1',
        organiserId: organiser.id,
        title: 'Capital Music Fest',
        description: 'A night of live music and performances.',
        banner_url: 'https://example.com/banner1.jpg',
        status: 'published',
        location_name: 'City Arena',
        location_url: 'https://maps.google.com/?q=City+Arena',
        created_at: new Date(),
      },
      {
        id: 'event-2',
        organiserId: organiser.id,
        title: 'Tech Conference 2025',
        description: 'Explore the future of technology.',
        banner_url: 'https://example.com/banner2.jpg',
        status: 'published',
        location_name: 'Tech Convention Center',
        location_url: 'https://maps.google.com/?q=Tech+Convention+Center',
        created_at: new Date(),
      },
      {
        id: 'event-3',
        organiserId: organiser.id,
        title: 'Food Carnival',
        description: 'A celebration of food and flavors.',
        banner_url: 'https://example.com/banner3.jpg',
        status: 'draft',
        location_name: 'Downtown Park',
        location_url: 'https://maps.google.com/?q=Downtown+Park',
        created_at: new Date(),
      },
    ],
  });

  const slots = await Promise.all([
    prisma.eventSlot.create({
      data: {
        id: 'slot-1',
        eventId: 'event-1',
        start_time: new Date(Date.now() + 86400000),
        end_time: new Date(Date.now() + 90000000),
        capacity: 100,
      },
    }),
    prisma.eventSlot.create({
      data: {
        id: 'slot-2',
        eventId: 'event-2',
        start_time: new Date(Date.now() + 172800000),
        end_time: new Date(Date.now() + 180000000),
        capacity: 50,
      },
    }),
    prisma.eventSlot.create({
      data: {
        id: 'slot-3',
        eventId: 'event-3',
        start_time: new Date(Date.now() + 259200000),
        end_time: new Date(Date.now() + 265000000),
        capacity: 150,
      },
    }),
  ]);

  await prisma.card.createMany({
    data: [
      {
        id: 'card-1',
        userId: user.id,
        bank_name: 'icic',
        card_number: '1111-2222-3333-4444',
        balance: new Prisma.Decimal(500),
      },
      {
        id: 'card-2',
        userId: user.id,
        bank_name: 'hdfc',
        card_number: '2222-2222-3333-4444',
        balance: new Prisma.Decimal(5000),
      },
      {
        id: 'card-3',
        userId: user.id,
        bank_name: 'kotak',
        card_number: '3333-2222-3333-4444',
        balance: new Prisma.Decimal(740),
      },
    ],
  });

  await prisma.transaction.create({
    data: {
      id: 'txn-deposit-1',
      userId: user.id,
      cardId: 'card-1',
      amount: new Prisma.Decimal(1500),
      type: 'DEPOSIT',
      bank_name: 'icic',
      description: 'Initial top-up via HDFC Bank',
    },
  });

  await prisma.card.update({
    where: { id: 'card-1' },
    data: {
      balance: new Prisma.Decimal(2000), // previous 500 + 1500 deposit Its always decimals
    },
  });

  for (let i = 1; i <= 3; i++) {
    const ticket = await prisma.ticket.create({
      data: {
        id: `ticket-${i}`,
        eventSlotId: `slot-${i}`,
        userId: user.id,
        qr_code_data: `{"ticketId":"ticket-${i}","payload":"event-${i}","signature":"signed-data-${i}"}`,
        signature: `signed-data-${i}`,
        issued_at: new Date(),
        is_valid: true,
      },
    });

    await prisma.transaction.create({
      data: {
        id: `txn-${i}`,
        userId: user.id,
        cardId: 'card-1',
        ticketId: ticket.id,
        amount: new Prisma.Decimal(100),
        type: 'PURCHASE',
        description: `Ticket ${i} purchase`,
      },
    });

    await prisma.ticketVerification.create({
      data: {
        id: `verify-${i}`,
        ticketId: ticket.id,
        verifierId: verifier.id,
        verification_time: new Date(),
        is_successful: true,
        remarks: 'Scanned successfully',
      },
    });
  }
}

main()
  .then(() => console.log("Seed completed successfully."))
  .catch((e) => {
    console.error("Seed has failed:", e);
  })
  .finally(() => prisma.$disconnect());
