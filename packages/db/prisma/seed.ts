import {
  PrismaClient,
  Prisma,
  Role,
  EventStatus,
  EventCategory,
  EventGenre,
  EventLanguage,
  TransactionType,
  Currency,
  BankName,
} from '@prisma/client';

const prisma = new PrismaClient({ log: ['error'] });

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const daysFromNow = (d: number) =>
  new Date(Date.now() + d * 24 * 60 * 60 * 1000);

const pick = <T>(arr: T[]) => arr[rand(0, arr.length - 1)];

const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
  'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e',
  'https://images.unsplash.com/photo-1521334884684-d80222895322',
];

const LOCATIONS = [
  {
    name: 'Mumbai Convention Center',
    city: 'Mumbai',
    map: 'https://www.google.com/maps?q=Mumbai+Convention+Center',
  },
  {
    name: 'Wadia College of Engineering',
    city: 'Pune',
    map: 'https://www.google.com/maps?q=Wadia+College+of+Engineering',
  },
  {
    name: 'Bangalore Palace Grounds',
    city: 'Bangalore',
    map: 'https://www.google.com/maps?q=Bangalore+Palace+Grounds',
  },
  {
    name: 'Delhi Pragati Maidan',
    city: 'Delhi',
    map: 'https://www.google.com/maps?q=Pragati+Maidan+Delhi',
  },
  {
    name: 'Hyderabad HITEX Convention Centre',
    city: 'Hyderabad',
    map: 'https://www.google.com/maps?q=HITEX+Hyderabad',
  },
  {
    name: 'Chennai Trade Centre',
    city: 'Chennai',
    map: 'https://www.google.com/maps?q=Chennai+Trade+Centre',
  },
  {
    name: 'Kolkata Biswa Bangla Convention Centre',
    city: 'Kolkata',
    map: 'https://www.google.com/maps?q=Biswa+Bangla+Convention+Centre',
  },
];

const EVENT_TITLES = [
  'Live Music Festival',
  'Startup India Summit',
  'Stand-up Comedy Night',
  'Tech Innovators Conference',
  'Bollywood Movie Premiere',
  'Food & Wine Carnival',
  'Design Thinking Workshop',
  'Marathon Run',
  'Indie Film Screening',
  'Jazz & Blues Evening',
];

async function main() {
  console.time('Seed completed in');
  const usersData: Prisma.UserCreateManyInput[] = Array.from({ length: 20 }).map(
    (_, i) => ({
      id: `user-${i + 1}`,
      first_name: `User${i + 1}`,
      last_name: 'Demo',
      email: `user${i + 1}@mail.com`,
      password: 'Pass@123',
      role:
        i < 12
          ? Role.user
          : i < 15
          ? Role.organiser
          : i < 18
          ? Role.verifier
          : Role.admin,
      is_verified: true,
    })
  );

  await prisma.user.createMany({ data: usersData });

  const users = await prisma.user.findMany();
  const buyers = users.filter((u) => u.role === Role.user);
  const organisers = users.filter((u) => u.role === Role.organiser);
  const verifiers = users.filter((u) => u.role === Role.verifier);

  await prisma.wallet.createMany({
    data: users.map((u) => ({
      userId: u.id,
      balance: new Prisma.Decimal(rand(2000, 10000)),
      currency: Currency.INR,
    })),
  });

  await prisma.card.createMany({
    data: users.map((u, i) => ({
      userId: u.id,
      bank_name: pick(Object.values(BankName)),
      card_number: `4242-4242-4242-${1000 + i}`,
      balance: new Prisma.Decimal(rand(1000, 5000)),
    })),
  });

  const cards = await prisma.card.findMany();
  const cardByUser = new Map(cards.map((c) => [c.userId, c]));

  const events = await Promise.all(
    Array.from({ length: 30 }).map((_, i) => {
      const location = pick(LOCATIONS);
      return prisma.event.create({
        data: {
          title: `${pick(EVENT_TITLES)} ${i + 1}`,
          description:
            'Join us for an unforgettable experience with live performances, premium venues, and exclusive access.',
          banner_url: pick(EVENT_IMAGES),
          organiserId: pick(organisers).id,
          status: EventStatus.published,
          category: pick(Object.values(EventCategory)),
          genre: pick(Object.values(EventGenre)),
          language: pick(Object.values(EventLanguage)),
          location_name: location.name,
          location_url: location.map,
          is_online: false,
        },
      });
    })
  );

  const slotData: Prisma.EventSlotCreateManyInput[] = [];

  for (const event of events) {
    for (let i = 0; i < 15; i++) {
      const start = daysFromNow(rand(1, 120));
      slotData.push({
        eventId: event.id,
        start_time: start,
        end_time: new Date(start.getTime() + 2 * 60 * 60 * 1000),
        capacity: rand(50, 300),
        price: new Prisma.Decimal(rand(299, 2499)),
      });
    }
  }

  await prisma.eventSlot.createMany({ data: slotData });

  const slots = await prisma.eventSlot.findMany();

  const tickets: Prisma.TicketCreateManyInput[] = [];
  const transactions: Prisma.TransactionCreateManyInput[] = [];
  const verifications: Prisma.TicketVerificationCreateManyInput[] = [];

  for (const slot of slots) {
    const count = rand(5, 20);

    for (let i = 0; i < count; i++) {
      const buyer = pick(buyers);
      const card = cardByUser.get(buyer.id);
      if (!card) continue;

      const ticketId = crypto.randomUUID();
      const verified = Math.random() > 0.65;

      tickets.push({
        id: ticketId,
        eventSlotId: slot.id,
        userId: buyer.id,
        qr_code_data: JSON.stringify({ ticketId, slotId: slot.id }),
        signature: `sig-${ticketId}`,
        is_verified: verified,
      });

      transactions.push({
        userId: buyer.id,
        cardId: card.id,
        ticketId,
        amount: slot.price,
        type: TransactionType.PURCHASE,
        description: 'Ticket purchase',
        token: `txn-${ticketId}`,
      });

      if (verified) {
        verifications.push({
          ticketId,
          verifierId: pick(verifiers).id,
          verification_time: new Date(),
          is_successful: true,
        });
      }
    }
  }

  await prisma.ticket.createMany({ data: tickets });
  await prisma.transaction.createMany({ data: transactions });
  await prisma.ticketVerification.createMany({ data: verifications });

  console.timeEnd('Seed completed in');
}

main()
  .catch((e) => {
    console.error('Look`s like seeder FAILED! Call RonaK!!', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });