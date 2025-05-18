const { prisma } = require('../prisma');

// Service layer for user operations
// This layer can be used for complex business logic

// Get user with semesters
const getUserWithSemesters = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      semesters: true
    }
  });
};

// Get users by role
const getUsersByRole = async (role) => {
  return await prisma.user.findMany({
    where: { role },
    include: {
      semesters: true
    }
  });
};

// Get users by semester
const getUsersBySemester = async (semesterId) => {
  return await prisma.user.findMany({
    where: {
      semesterIds: {
        has: semesterId
      }
    }
  });
};

module.exports = {
  getUserWithSemesters,
  getUsersByRole,
  getUsersBySemester
};