const { prisma } = require('../prisma');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, name, age, role } = req.body;
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        age,
        role: role || 'student'
      }
    });
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        semesters: true
      }
    });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        semesters: true
      }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age, role } = req.body;
    
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        age,
        role
      }
    });
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Delete user
    await prisma.user.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

// Add semester to user
const addSemesterToUser = async (req, res) => {
  try {
    const { userId, semesterId } = req.params;
    
    // Check if user and semester exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { semesters: true }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const semester = await prisma.semester.findUnique({
      where: { id: semesterId }
    });
    
    if (!semester) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    // Check if semester is already assigned to user
    if (user.semesterIds.includes(semesterId)) {
      return res.status(409).json({
        success: false,
        message: 'Semester is already assigned to this user'
      });
    }
    
    // Add semester to user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        semesters: {
          connect: { id: semesterId }
        }
      },
      include: {
        semesters: true
      }
    });
    
    res.status(200).json({
      success: true,
      message: 'Semester added to user successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding semester to user',
      error: error.message
    });
  }
};

// Remove semester from user
const removeSemesterFromUser = async (req, res) => {
  try {
    const { userId, semesterId } = req.params;
    
    // Check if user and semester exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { semesters: true }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const semester = await prisma.semester.findUnique({
      where: { id: semesterId }
    });
    
    if (!semester) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    // Check if semester is assigned to user
    if (!user.semesterIds.includes(semesterId)) {
      return res.status(404).json({
        success: false,
        message: 'Semester is not assigned to this user'
      });
    }
    
    // Remove semester from user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        semesters: {
          disconnect: { id: semesterId }
        }
      },
      include: {
        semesters: true
      }
    });
    
    res.status(200).json({
      success: true,
      message: 'Semester removed from user successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing semester from user',
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addSemesterToUser,
  removeSemesterFromUser
};