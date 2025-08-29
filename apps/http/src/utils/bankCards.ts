import db, { type BankName, BankNames } from "@repo/db";

function generateRandomCardNumber(): string {
    const prefix = "4321";
    const segments = Array.from(
        {
            length: 3,
        },
        () => Math.floor(1000 + Math.random() * 9000),
    );
    return [
        prefix,
        ...segments,
    ].join("-");
}

function getRandomBank(): BankName {
    const banks = Object.values(BankNames);
    return banks[Math.floor(Math.random() * banks.length)] as BankName;
}

function getRandomBalance(): number {
    return parseFloat((1000 + Math.random() * 49000).toFixed(2));
}

export async function createCardsForUser(userId: string) {
    const cards = Array.from(
        {
            length: 4,
        },
        () => ({
            balance: getRandomBalance(),
            bank_name: getRandomBank(),
            card_number: generateRandomCardNumber(),
            userId,
        }),
    );

    await db.card.createMany({
        data: cards,
    });

    return cards;
}
