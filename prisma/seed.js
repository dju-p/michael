const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function main() {
  // Seed users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      age: 20,
      role: 'student'
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
      age: 21,
      role: 'student'
    }
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'professor@example.com' },
    update: {},
    create: {
      email: 'professor@example.com',
      name: 'Professor Johnson',
      age: 45,
      role: 'teacher'
    }
  });

  // Seed semesters
  // Now using the compound unique fields in the 'where' clause for upsert
  const semester1 = await prisma.semester.upsert({
    where: {
      name: 'Fall 2023',
      year: 2023,
      term: 'Fall'
    },
    update: {},
    create: {
      name: 'Fall 2023',
      year: 2023,
      term: 'Fall',
      startDate: new Date('2023-08-15'),
      endDate: new Date('2023-12-15')
    }
  });

  const semester2 = await prisma.semester.upsert({
    where: {
      name: 'Spring 2024',
      year: 2024,
      term: 'Spring'
    },
    update: {},
    create: {
      name: 'Spring 2024',
      year: 2024,
      term: 'Spring',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15')
    }
  });

  // Connect users and semesters
  // These operations correctly use the auto-generated ObjectIds
  await prisma.user.update({
    where: { id: user1.id },
    data: {
      semesters: {
        connect: [{ id: semester1.id }, { id: semester2.id }]
      }
    }
  });

  await prisma.user.update({
    where: { id: user2.id },
    data: {
      semesters: {
        connect: [{ id: semester1.id }]
      }
    }
  });

  await prisma.user.update({
    where: { id: user3.id },
    data: {
      semesters: {
        connect: [{ id: semester1.id }, { id: semester2.id }]
      }
    }
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


// async function main() {
//   // Seed users
//   const user1 = await prisma.user.upsert({
//     where: { email: 'john@example.com' },
//     update: {},
//     create: {
//       email: 'john@example.com',
//       name: 'John Doe',
//       age: 20,
//       role: 'student'
//     }
//   });

//   const user2 = await prisma.user.upsert({
//     where: { email: 'jane@example.com' },
//     update: {},
//     create: {
//       email: 'jane@example.com',
//       name: 'Jane Smith',
//       age: 21,
//       role: 'student'
//     }
//   });

//   const user3 = await prisma.user.upsert({
//     where: { email: 'professor@example.com' },
//     update: {},
//     create: {
//       email: 'professor@example.com',
//       name: 'Professor Johnson',
//       age: 45,
//       role: 'teacher'
//     }
//   });

//   // Seed semesters
//   // Use a unique field like 'name' in the 'where' clause for upserting semesters.
//   // Prisma will generate the `id` (ObjectId) automatically on creation.
//   const semester1 = await prisma.semester.upsert({
//     where: { name: 'Fall 2023' }, // Changed: Use 'name' as unique identifier
//     update: {},
//     create: {
//       name: 'Fall 2023',
//       year: 2023,
//       term: 'Fall',
//       startDate: new Date('2023-08-15'),
//       endDate: new Date('2023-12-15')
//     }
//   });

//   const semester2 = await prisma.semester.upsert({
//     where: { name: 'Spring 2024' }, // Changed: Use 'name' as unique identifier
//     update: {},
//     create: {
//       name: 'Spring 2024',
//       year: 2024,
//       term: 'Spring',
//       startDate: new Date('2024-01-15'),
//       endDate: new Date('2024-05-15')
//     }
//   });

//   // Connect users and semesters
//   await prisma.user.update({
//     where: { id: user1.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }, { id: semester2.id }] // These are now valid ObjectIds
//       }
//     }
//   });

//   await prisma.user.update({
//     where: { id: user2.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }] // This is now a valid ObjectId
//       }
//     }
//   });

//   await prisma.user.update({
//     where: { id: user3.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }, { id: semester2.id }] // These are now valid ObjectIds
//       }
//     }
//   });

//   console.log('Database has been seeded!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// async function main() {
//   // Seed users
//   const user1 = await prisma.user.upsert({
//     where: { email: 'john@example.com' },
//     update: {},
//     create: {
//       email: 'john@example.com',
//       name: 'John Doe',
//       age: 20,
//       role: 'student'
//     }
//   });

//   const user2 = await prisma.user.upsert({
//     where: { email: 'jane@example.com' },
//     update: {},
//     create: {
//       email: 'jane@example.com',
//       name: 'Jane Smith',
//       age: 21,
//       role: 'student'
//     }
//   });

//   const user3 = await prisma.user.upsert({
//     where: { email: 'professor@example.com' },
//     update: {},
//     create: {
//       email: 'professor@example.com',
//       name: 'Professor Johnson',
//       age: 45,
//       role: 'teacher'
//     }
//   });

//   // Seed semesters
//   const semester1 = await prisma.semester.upsert({
//     where: { id: '1' },
//     update: {},
//     create: {
//       name: 'Fall 2023',
//       year: 2023,
//       term: 'Fall',
//       startDate: new Date('2023-08-15'),
//       endDate: new Date('2023-12-15')
//     }
//   });

//   const semester2 = await prisma.semester.upsert({
//     where: { id: '2' },
//     update: {},
//     create: {
//       name: 'Spring 2024',
//       year: 2024,
//       term: 'Spring',
//       startDate: new Date('2024-01-15'),
//       endDate: new Date('2024-05-15')
//     }
//   });

//   // Connect users and semesters
//   await prisma.user.update({
//     where: { id: user1.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }, { id: semester2.id }]
//       }
//     }
//   });

//   await prisma.user.update({
//     where: { id: user2.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }]
//       }
//     }
//   });

//   await prisma.user.update({
//     where: { id: user3.id },
//     data: {
//       semesters: {
//         connect: [{ id: semester1.id }, { id: semester2.id }]
//       }
//     }
//   });

//   console.log('Database has been seeded!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });