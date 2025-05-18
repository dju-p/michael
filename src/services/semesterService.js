const { prisma } = require('../prisma');

// Service layer for semester operations
// This layer can be used for complex business logic

// Get current semester
const getCurrentSemester = async () => {
  const currentDate = new Date();
  
  return await prisma.semester.findFirst({
    where: {
      startDate: {
        lte: currentDate
      },
      endDate: {
        gte: currentDate
      }
    },
    include: {
      users: true
    }
  });
};

// Get semesters by year
const getSemestersByYear = async (year) => {
  return await prisma.semester.findMany({
    where: { year },
    include: {
      users: true
    }
  });
};

// Get semesters by term
const getSemestersByTerm = async (term) => {
  return await prisma.semester.findMany({
    where: { term },
    include: {
      users: true
    }
  });
};

module.exports = {
  getCurrentSemester,
  getSemestersByYear,
  getSemestersByTerm
};