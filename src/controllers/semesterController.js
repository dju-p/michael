const { prisma } = require('../prisma');

// Create a new semester
const createSemester = async (req, res) => {
  try {
    const { name, year, term, startDate, endDate } = req.body;
    
    const semester = await prisma.semester.create({
      data: {
        name,
        year,
        term,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });
    
    res.status(201).json({
      success: true,
      data: semester
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating semester',
      error: error.message
    });
  }
};

// Get all semesters
const getAllSemesters = async (req, res) => {
  try {
    const semesters = await prisma.semester.findMany({
      include: {
        users: true
      }
    });
    
    res.status(200).json({
      success: true,
      count: semesters.length,
      data: semesters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving semesters',
      error: error.message
    });
  }
};

// Get semester by ID
const getSemesterById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const semester = await prisma.semester.findUnique({
      where: { id },
      include: {
        users: true
      }
    });
    
    if (!semester) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: semester
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving semester',
      error: error.message
    });
  }
};

// Update semester
const updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, term, startDate, endDate } = req.body;
    
    // Check if semester exists
    const semesterExists = await prisma.semester.findUnique({
      where: { id }
    });
    
    if (!semesterExists) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    // Update semester
    const semester = await prisma.semester.update({
      where: { id },
      data: {
        name,
        year,
        term,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      }
    });
    
    res.status(200).json({
      success: true,
      data: semester
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating semester',
      error: error.message
    });
  }
};

// Delete semester
const deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if semester exists
    const semesterExists = await prisma.semester.findUnique({
      where: { id }
    });
    
    if (!semesterExists) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    // Delete semester
    await prisma.semester.delete({
      where: { id }
    });
    
    res.status(200).json({
      success: true,
      message: 'Semester deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting semester',
      error: error.message
    });
  }
};

// Get users for a semester
const getSemesterUsers = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if semester exists
    const semester = await prisma.semester.findUnique({
      where: { id },
      include: {
        users: true
      }
    });
    
    if (!semester) {
      return res.status(404).json({
        success: false,
        message: 'Semester not found'
      });
    }
    
    res.status(200).json({
      success: true,
      count: semester.users.length,
      data: semester.users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving semester users',
      error: error.message
    });
  }
};

module.exports = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
  getSemesterUsers
};