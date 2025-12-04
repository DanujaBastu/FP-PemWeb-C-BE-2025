// PATH: prisma/seeder/seeder.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding English Number Data...');

  const template = await prisma.gameTemplates.upsert({
    where: { slug: 'open-the-box' },
    update: {},
    create: {
      name: 'Open The Box',
      slug: 'open-the-box',
      description: 'Find the English word for the number',
      is_life_based: false,
      is_time_limit_based: true,
    },
  });

  const creator = await prisma.users.upsert({
    where: { email: 'admin@wordit.com' },
    update: {},
    create: {
      email: 'admin@wordit.com',
      username: 'AdminWordIT',
      password: 'hashed_password_dummy',
      role: 'ADMIN',
    },
  });

  // DATA: Angka -> Bahasa Inggris (Tanpa Pertanyaan Panjang)
  const gameJsonData = {
    items: [
      { id: 1, text: '10', options: ['Ten', 'Tin', 'Tan'], answer: 'Ten' },
      {
        id: 2,
        text: '20',
        options: ['Twelve', 'Twenty', 'Two Zero'],
        answer: 'Twenty',
      },
      {
        id: 3,
        text: '30',
        options: ['Thirteen', 'Thirty', 'Third'],
        answer: 'Thirty',
      },
      {
        id: 4,
        text: '40',
        options: ['Fourty', 'Forty', 'Fourteen'],
        answer: 'Forty',
      }, // Note: Forty yg benar
      {
        id: 5,
        text: '50',
        options: ['Fifteen', 'Fifty', 'Five-O'],
        answer: 'Fifty',
      },
      {
        id: 6,
        text: '60',
        options: ['Sixty', 'Sixteen', 'Six-Ty'],
        answer: 'Sixty',
      },
      {
        id: 7,
        text: '70',
        options: ['Seventy', 'Seven', 'Seventeen'],
        answer: 'Seventy',
      },
      {
        id: 8,
        text: '80',
        options: ['Eighteen', 'Eighty', 'Eight'],
        answer: 'Eighty',
      },
      {
        id: 9,
        text: '90',
        options: ['Nine', 'Ninety', 'Nineteen'],
        answer: 'Ninety',
      },
      {
        id: 10,
        text: '100',
        options: ['Hundred', 'One Hundred', 'Ten Ten'],
        answer: 'One Hundred',
      },
      {
        id: 11,
        text: '110',
        options: ['One Ten', 'One Hundred Ten', 'Ten One'],
        answer: 'One Hundred Ten',
      },
      {
        id: 12,
        text: '120',
        options: ['One Twenty', 'One Hundred Twenty', 'Twelve Zero'],
        answer: 'One Hundred Twenty',
      },
    ],
  };

  const game = await prisma.games.upsert({
    where: { name: 'English Numbers Challenge' },
    update: { game_json: gameJsonData },
    create: {
      name: 'English Numbers Challenge',
      description: 'Tebak bahasa Inggris dari angka yang muncul!',
      thumbnail_image: 'https://placehold.co/600x400/png?text=10=Ten',
      game_template_id: template.id,
      creator_id: creator.id,
      is_published: true,
      game_json: gameJsonData,
    },
  });

  console.log(`✅ ID GAME: ${game.id}`);
  console.log(`🔗 URL: /openthebox/play/${game.id}`);
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
