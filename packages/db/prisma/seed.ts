// prisma/seed.ts
import { PrismaClient, Prisma, Currency, BankName, TransactionType, OTPPurpose } from '@prisma/client';

const prisma = new PrismaClient();

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function main() {
  // 1) Create 15 users (mix of roles: user, organiser, verifier, admin)
  const usersData = [
    { id: 'user-1', first_name: 'Diya', last_name: 'Chain', email: 'diya@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },
    { id: 'user-2', first_name: 'Ravi', last_name: 'Kumar', email: 'ravi.k@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },
    { id: 'user-3', first_name: 'Meera', last_name: 'Patel', email: 'meera.p@example.com', password: 'Pass@123', role: 'user' as const, is_verified: false },
    { id: 'user-4', first_name: 'Arjun', last_name: 'Singh', email: 'arjun.s@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },
    { id: 'user-5', first_name: 'Nisha', last_name: 'Verma', email: 'nisha.v@example.com', password: 'Pass@123', role: 'user' as const, is_verified: false },
    { id: 'user-6', first_name: 'Karan', last_name: 'Shah', email: 'karan.s@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },
    { id: 'user-7', first_name: 'Priya', last_name: 'Rao', email: 'priya.r@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },

    // organisers
    { id: 'user-8', first_name: 'Sonali', last_name: 'Smith', email: 'sonali@events.com', password: 'Pass@123', role: 'organiser' as const, is_verified: true },
    { id: 'user-9', first_name: 'Rahul', last_name: 'Bose', email: 'rahul@expo.com', password: 'Pass@123', role: 'organiser' as const, is_verified: true },
    { id: 'user-10', first_name: 'Anita', last_name: 'Khan', email: 'anita@fest.com', password: 'Pass@123', role: 'organiser' as const, is_verified: true },

    // verifiers
    { id: 'user-11', first_name: 'Vedang', last_name: 'Scan', email: 'vedang@capital.com', password: 'Pass@123', role: 'verifier' as const, is_verified: true },
    { id: 'user-12', first_name: 'Ishita', last_name: 'Check', email: 'ishita@verify.com', password: 'Pass@123', role: 'verifier' as const, is_verified: true },
    { id: 'user-13', first_name: 'Manav', last_name: 'Gate', email: 'manav@scan.com', password: 'Pass@123', role: 'verifier' as const, is_verified: true },

    // admin
    { id: 'user-14', first_name: 'Admin', last_name: 'Root', email: 'admin@platform.com', password: 'Admin@123', role: 'admin' as const, is_verified: true },
    // extra user
    { id: 'user-15', first_name: 'Zara', last_name: 'Ali', email: 'zara.a@example.com', password: 'Pass@123', role: 'user' as const, is_verified: true },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        password: u.password,
        role: u.role,
        is_verified: u.is_verified,
        public_key: `${u.id}-public-key`,
        encrypted_private_key: `${u.id}-encrypted-private`,
        created_at: new Date(),
      },
    });
  }

  // 2) Create 15 wallets (one per user)
  const walletCurrencyChoices: Currency[] = ['INR', 'USD', 'EUR'];
  for (let i = 1; i <= 15; i++) {
    const userId = `user-${i}`;
    await prisma.wallet.upsert({
      where: { userId },
      update: {},
      create: {
        id: `wallet-${i}`,
        userId,
        balance: new Prisma.Decimal(1000 + i * 100), // varying balances
        currency: walletCurrencyChoices[i % walletCurrencyChoices.length],
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // 3) Create 15 cards (one per user). Unique card_number per schema.
  const bankNames: BankName[] = ['yesbank', 'bob', 'hdfc', 'icic', 'kotak'];
  for (let i = 1; i <= 15; i++) {
    const userId = `user-${i}`;
    await prisma.card.upsert({
      where: { card_number: `4242-0000-0000-${1000 + i}` },
      update: {},
      create: {
        id: `card-${i}`,
        userId,
        bank_name: bankNames[i % bankNames.length],
        card_number: `4242-0000-0000-${1000 + i}`,
        balance: new Prisma.Decimal(500 + i * 100),
        created_at: new Date(),
      },
    });
  }

  // 4) Create 15 events assigned round-robin to organisers user-8, user-9, user-10
  const organisers = ['user-8', 'user-9', 'user-10'];
  const eventTitles = [
    'Capital Music Fest',
    'Tech Conference 2025',
    'Food Carnival',
    'Art & Culture Evening',
    'Startup Pitch Night',
    'Marathon 10K',
    'Film Premiere Gala',
    'Design Workshop',
    'Fashion Week Pop-up',
    'Gourmet Street Fair',
    'Indie Game Expo',
    'Green Energy Summit',
    'Book Fair & Talks',
    'Comedy Night Live',
    'Charity Auction Gala',
  ];

  for (let i = 1; i <= 15; i++) {
    const organiserId = organisers[(i - 1) % organisers.length];
    await prisma.event.upsert({
      where: { id: `event-${i}` },
      update: {},
      create: {
        id: `event-${i}`,
        organiserId,
        title: eventTitles[i - 1],
        description: `${eventTitles[i - 1]} - description and details.`,
        banner_url: `https://example.com/banners/banner-${i}.jpg`,
        status: i % 5 === 0 ? 'draft' : 'published', // a few drafts
        location_name: `Venue ${i}`,
        location_url: `https://maps.google.com/?q=Venue+${i}`,
        created_at: daysFromNow(-i), // some past, some recent
      },
    });
  }

  // 5) Create 15 event slots, one for each event
  for (let i = 1; i <= 15; i++) {
    const eventId = `event-${i}`;
    const start = daysFromNow(i); // future offsets
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
    await prisma.eventSlot.upsert({
      where: { id: `slot-${i}` },
      update: {},
      create: {
        id: `slot-${i}`,
        eventId,
        start_time: start,
        end_time: end,
        capacity: 50 + (i % 5) * 10,
        price: new Prisma.Decimal((50 + i) * 1.5),
      },
    });
  }

  // 6) Create 15 tickets (one per slot) for different users (user-1..user-15)
  for (let i = 1; i <= 15; i++) {
    const ticketId = `ticket-${i}`;
    const slotId = `slot-${i}`;
    const userId = `user-${i}`;
    const qr = JSON.stringify({ ticketId, slotId, issuedTo: userId });
    await prisma.ticket.upsert({
      where: { id: ticketId },
      update: {},
      create: {
        id: ticketId,
        eventSlotId: slotId,
        userId,
        qr_code_data: qr,
        signature: `sig-${ticketId}`,
        issued_at: new Date(),
        is_valid: true,
        is_verified: i % 3 === 0 ? true : false,
      },
    });
  }

  // 7) Create 15 transactions:
  // - First 5 as DEPOSITs to card-1..card-5
  // - Next 10 as PURCHASE for the 10 tickets
  for (let i = 1; i <= 15; i++) {
    const txnId = `txn-${i}`;
    const userId = `user-${i}`;
    const cardId = `card-${i}`;
    const amount = i <= 5 ? new Prisma.Decimal(2000 + i * 100) : new Prisma.Decimal(100 + i * 5);
    const type: TransactionType = i <= 5 ? 'DEPOSIT' : 'PURCHASE';
    const ticketId = i > 5 ? `ticket-${i - 5}` : undefined;

    await prisma.transaction.upsert({
      where: { id: txnId },
      update: {},
      create: {
        id: txnId,
        userId,
        cardId,
        amount,
        type,
        description: i <= 5 ? `Initial deposit ${i}` : `Purchase for ${ticketId}`,
        ticketId,
        token: `txn-token-${txnId}`,
        created_at: new Date(),
      },
    });

    // If DEPOSIT, also update card balance to reflect deposit
    if (type === 'DEPOSIT') {
      const card = await prisma.card.findUnique({ where: { id: cardId } });
      if (card) {
        const newBalance = card.balance.add(amount);
        await prisma.card.update({
          where: { id: cardId },
          data: { balance: newBalance },
        });
      }
    }
  }

  // 8) Create 15 ticket verifications (use verifiers user-11..user-13 round-robin)
  const verifiers = ['user-11', 'user-12', 'user-13'];
  for (let i = 1; i <= 15; i++) {
    const verifyId = `verify-${i}`;
    const ticketId = `ticket-${i}`;
    const verifierId = verifiers[(i - 1) % verifiers.length];
    await prisma.ticketVerification.upsert({
      where: { id: verifyId },
      update: {},
      create: {
        id: verifyId,
        ticketId,
        verifierId,
        verification_time: daysFromNow(-i + 1),
        is_successful: i % 4 !== 0, // a few unsuccessful
        remarks: i % 4 === 0 ? 'Failed validation' : 'Scanned successfully',
      },
    });

    // Optionally set scanned_by on ticket for some
    if (i % 2 === 0) {
      await prisma.ticket.update({
        where: { id: ticketId },
        data: { scanned_by: { connect: { id: verifierId } }, scanned_at: new Date(), is_verified: true },
      });
    }
  }

  // 9) Create 15 OTPs (mix of purposes, some linked to tickets)
  const otpPurposes: OTPPurpose[] = ['signup', 'forgot_password', 'ticket_validation'];
  for (let i = 1; i <= 15; i++) {
    await prisma.otp.create({
      data: {
        id: `otp-${i}`,
        userId: `user-${((i - 1) % 15) + 1}`,
        ticketId: i % 3 === 0 ? `ticket-${i}` : undefined,
        ticketVerificationId: i % 5 === 0 ? `verify-${i}` : undefined,
        otp_code: (100000 + i).toString(),
        purpose: otpPurposes[i % otpPurposes.length],
        is_used: i % 4 === 0,
        expires_at: daysFromNow(7 + i),
        created_at: new Date(),
      },
    });
  }

  // 10) Create 15 PasswordResetTokens for different users
  for (let i = 1; i <= 15; i++) {
    await prisma.passwordResetToken.create({
      data: {
        id: `pwdres-${i}`,
        userId: `user-${i}`,
        token: `pwd-token-${i}`,
        expires_at: daysFromNow(3 + i),
        created_at: new Date(),
      },
    });
  }

  // 11) Create 15 JwtTokens for users
  for (let i = 1; i <= 15; i++) {
    await prisma.jwtToken.create({
      data: {
        id: `jwt-${i}`,
        userId: `user-${i}`,
        token: `jwt-token-${i}`,
        issued_at: new Date(),
        expires_at: daysFromNow(30 + i),
        is_revoked: false,
      },
    });
  }

  // 12) Sanity check: create a few more transactions linking to wallets (PAYOUTs) and refunds
  for (let i = 16; i <= 18; i++) {
    const uid = `user-${((i - 1) % 15) + 1}`;
    const cid = `card-${((i - 1) % 15) + 1}`;
    await prisma.transaction.create({
      data: {
        id: `txn-extra-${i}`,
        userId: uid,
        cardId: cid,
        amount: new Prisma.Decimal(250 + i),
        type: i % 2 === 0 ? 'REFUND' : 'PAYOUT',
        description: i % 2 === 0 ? 'Refund issued' : 'Payout to organiser wallet',
        token: `txn-token-extra-${i}`,
        created_at: new Date(),
      },
    });
  }

  console.log('Seeding complete: created 15 records for each major model where applicable.');
}

main()
  .then(() => {
    console.log('Seed completed successfully.');
  })
  .catch((e) => {
    console.error('Seed has failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
