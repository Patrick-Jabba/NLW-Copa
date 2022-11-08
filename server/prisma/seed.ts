import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: "John Doe",
  //     email: "johndoe2@gmail.com",
  //     avatarUrl: "https://github.com/patrick-jabba.png",
  //   },
  // });

  // const pool = await prisma.pool.create({
  //   data: {
  //     title: "Example pool",
  //     code: "BOL1234",
  //     ownerId: user.id,
  //     participants: {
  //       create: {
  //         userId: user.id,
  //       },
  //     },
  //   },
  // });

  await prisma.game.create({
    data: {
      date: "2022-11-21T10:00:00.885Z",
      firstTeamCountryCode: "GB",
      secondTeamCountryCode: "IR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T13:00:00.885Z",
      firstTeamCountryCode: "SN",
      secondTeamCountryCode: "NL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T16:00:00.885Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "GB-WLS",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-20T13:00:00.885Z",
      firstTeamCountryCode: "QA",
      secondTeamCountryCode: "EC",
    },
  });
}

main();
