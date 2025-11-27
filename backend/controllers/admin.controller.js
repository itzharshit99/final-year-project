import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose  from "mongoose";

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ fullName, email, password, role });
    await newAdmin.save();

    const token = generateToken(newAdmin);
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error while registering admin" });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(admin);
    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error while logging in" });
  }
};


import Student from "../models/studentModel.js";
import Enrollment from "../models/enrollement.model.js";
import Course from "../models/courseModel.js";

export const getAdminAnalytics = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const enrolledStudentsCount = await Enrollment.distinct('student').then(ids => ids.length);

    const totalCourses = await Course.countDocuments();

    // Course-wise enrollment statistics
    const courseWiseStats = await Enrollment.aggregate([
      {
        $group: {
          _id: '$course',
          totalEnrollments: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'courseInfo'
        }
      },
      {
        $unwind: '$courseInfo'
      },
      {
        $project: {
          courseName: '$courseInfo.title',
          courseCategory: '$courseInfo.category.name',
          courseClass: '$courseInfo.class',
          totalEnrollments: 1,
          instructor: '$courseInfo.instructor',
          price: '$courseInfo.price',
          rating: '$courseInfo.rating'
        }
      },
      {
        $sort: { totalEnrollments: -1 }
      }
    ]);

    // Category-wise course statistics
    const categoryStats = await Course.aggregate([
      {
        $group: {
          _id: '$category.id',
          categoryName: { $first: '$category.name' },
          totalCourses: { $sum: 1 },
          totalEnrollments: { $sum: '$studentsEnrolled' },
          averageRating: { $avg: '$rating' },
          averagePrice: { $avg: '$price' }
        }
      },
      {
        $sort: { totalEnrollments: -1 }
      }
    ]);

    // Class-wise distribution of students
    const classStats = await Student.aggregate([
      {
        $group: {
          _id: '$currentClass',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Class-wise course distribution
    const classCourseStats = await Course.aggregate([
      {
        $group: {
          _id: '$class',
          totalCourses: { $sum: 1 },
          totalEnrollments: { $sum: '$studentsEnrolled' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Gender distribution
    const genderStats = await Student.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      }
    ]);

    // State-wise distribution
    const stateStats = await Student.aggregate([
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Recent enrollments (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentEnrollments = await Enrollment.aggregate([
      {
        $match: {
          enrolledAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$enrolledAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $limit: 30
      }
    ]);

    // Top courses by enrollment
    const topCourses = await Course.find()
      .sort({ studentsEnrolled: -1 })
      .limit(5)
      .select('title category.name class studentsEnrolled rating instructor');

    res.json({
      success: true,
      data: {
        overview: {
          totalStudents,
          enrolledStudents: enrolledStudentsCount,
          notEnrolledStudents: totalStudents - enrolledStudentsCount,
          totalCourses,
          enrollmentPercentage: totalStudents > 0 ? 
            ((enrolledStudentsCount / totalStudents) * 100).toFixed(2) : 0,
          totalEnrollments: courseWiseStats.reduce((sum, course) => sum + course.totalEnrollments, 0)
        },
        courseWiseStats,
        categoryStats,
        classStats,
        classCourseStats,
        genderStats,
        stateStats: stateStats.slice(0, 10), // Top 10 states
        recentEnrollments,
        topCourses
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data'
    });
  }
};

// Get detailed course analytics
export const getCourseAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    const courseDetails = await Course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const courseAnalytics = await Enrollment.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) }
      },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'studentInfo'
        }
      },
      {
        $unwind: '$studentInfo'
      },
      {
        $group: {
          _id: '$course',
          totalEnrollments: { $sum: 1 },
          genderDistribution: {
            $push: '$studentInfo.gender'
          },
          classDistribution: {
            $push: '$studentInfo.currentClass'
          },
          stateDistribution: {
            $push: '$studentInfo.state'
          },
          enrollmentDates: {
            $push: '$enrolledAt'
          }
        }
      },
      {
        $project: {
          totalEnrollments: 1,
          genderBreakdown: {
            male: {
              $size: {
                $filter: {
                  input: '$genderDistribution',
                  as: 'gender',
                  cond: { $eq: ['$$gender', 'Male'] }
                }
              }
            },
            female: {
              $size: {
                $filter: {
                  input: '$genderDistribution',
                  as: 'gender',
                  cond: { $eq: ['$$gender', 'Female'] }
                }
              }
            },
            other: {
              $size: {
                $filter: {
                  input: '$genderDistribution',
                  as: 'gender',
                  cond: { $eq: ['$$gender', 'Other'] }
                }
              }
            }
          },
          classBreakdown: {
            $arrayToObject: {
              $map: {
                input: '$classDistribution',
                as: 'class',
                in: {
                  k: '$$class',
                  v: {
                    $add: [1]
                  }
                }
              }
            }
          },
          stateBreakdown: {
            $arrayToObject: {
              $map: {
                input: '$stateDistribution',
                as: 'state',
                in: {
                  k: '$$state',
                  v: {
                    $add: [1]
                  }
                }
              }
            }
          },
          recentEnrollments: {
            $slice: ['$enrollmentDates', 10]
          }
        }
      }
    ]);

    const enrollmentTrend = await Enrollment.aggregate([
      {
        $match: { course: new mongoose.Types.ObjectId(courseId) }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$enrolledAt" }
          },
          enrollments: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        courseDetails,
        analytics: courseAnalytics[0] || {},
        enrollmentTrend
      }
    });

  } catch (error) {
    console.error('Course analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course analytics'
    });
  }
};

// Get category-wise analytics
export const getCategoryAnalytics = async (req, res) => {
  try {
    const { category } = req.params;

    const categoryCourses = await Course.find({ 'category.id': category })
      .sort({ studentsEnrolled: -1 });

    const categoryEnrollments = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseInfo'
        }
      },
      {
        $unwind: '$courseInfo'
      },
      {
        $match: {
          'courseInfo.category.id': category
        }
      },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          courses: { $addToSet: '$courseInfo._id' }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        category,
        totalCourses: categoryCourses.length,
        totalEnrollments: categoryEnrollments[0]?.totalEnrollments || 0,
        uniqueCourses: categoryEnrollments[0]?.courses?.length || 0,
        courses: categoryCourses
      }
    });

  } catch (error) {
    console.error('Category analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching category analytics'
    });
  }
};

// Get dashboard summary (lightweight for quick loading)
export const getDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const enrolledStudents = await Enrollment.distinct('student').then(ids => ids.length);

    // Recent activities
    const recentEnrollments = await Enrollment.find()
      .populate('student', 'firstName lastName email')
      .populate('course', 'title category.name')
      .sort({ enrolledAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        summary: {
          totalStudents,
          totalCourses,
          totalEnrollments,
          enrolledStudents,
          enrollmentRate: ((enrolledStudents / totalStudents) * 100).toFixed(2)
        },
        recentEnrollments
      }
    });

  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard summary'
    });
  }
};

