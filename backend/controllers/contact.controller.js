import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, mobile, category, subject, message, preferredLanguage } = req.body;

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      mobile,
      category,
      subject,
      message,
      preferredLanguage,
    });

    // Save to database
    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: savedContact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, preferredLanguage } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (preferredLanguage) filter.preferredLanguage = preferredLanguage;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchContacts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchRegex = new RegExp(query, "i");

    const contacts = await Contact.find({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
        { category: searchRegex },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments({
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { subject: searchRegex },
        { message: searchRegex },
        { category: searchRegex },
      ],
    });

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get category-wise analysis
export const getCategoryAnalysis = async (req, res) => {
  try {
    const { timeframe = "all" } = req.query; // all, today, week, month, year

    // Calculate date range based on timeframe
    let startDate;
    const endDate = new Date();

    switch (timeframe) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case "year":
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate = null; // all time
    }

    // Build match stage for aggregation
    const matchStage = startDate
      ? { createdAt: { $gte: startDate, $lte: endDate } }
      : {};

    // Category-wise aggregation
    const categoryAnalysis = await Contact.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          latestSubmission: { $max: "$createdAt" },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          latestSubmission: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Language-wise aggregation
    const languageAnalysis = await Contact.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$preferredLanguage",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          language: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // Monthly trend for current year
    const monthlyTrend = await Contact.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1),
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInHindi: [
                  "जनवरी",
                  "फरवरी",
                  "मार्च",
                  "अप्रैल",
                  "मई",
                  "जून",
                  "जुलाई",
                  "अगस्त",
                  "सितम्बर",
                  "अक्टूबर",
                  "नवम्बर",
                  "दिसम्बर",
                ],
              },
              in: {
                $arrayElemAt: ["$$monthsInHindi", { $subtract: ["$_id.month", 1] }],
              },
            },
          },
          year: "$_id.year",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { year: 1, month: 1 } },
    ]);

    // Total statistics
    const totalStats = {
      totalContacts: await Contact.countDocuments(matchStage),
      totalCategories: categoryAnalysis.length,
      timeframe: timeframe,
    };

    res.status(200).json({
      success: true,
      data: {
        totalStats,
        categoryAnalysis,
        languageAnalysis,
        monthlyTrend,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get detailed category report
export const getCategoryDetailedReport = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Validate category
    const validCategories = [
      "छात्र / Student",
      "अभिभावक / Parent",
      "शिक्षक / Teacher",
      "स्कूल प्रशासन / School Admin",
      "अन्य / Other",
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const contacts = await Contact.find({ category })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments({ category });

    // Additional statistics for this category
    const categoryStats = await Contact.aggregate([
      { $match: { category } },
      {
        $group: {
          _id: "$preferredLanguage",
          count: { $sum: 1 },
        },
      },
    ]);

    const languageDistribution = categoryStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        category,
        contacts,
        statistics: {
          totalContacts: total,
          languageDistribution,
        },
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Total contacts
    const totalContacts = await Contact.countDocuments();

    // Today's contacts
    const todaysContacts = await Contact.countDocuments({
      createdAt: { $gte: today },
    });

    // This week's contacts
    const weeklyContacts = await Contact.countDocuments({
      createdAt: { $gte: lastWeek },
    });

    // This month's contacts
    const monthlyContacts = await Contact.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    // Category distribution
    const categoryDistribution = await Contact.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          percentage: {
            $round: [
              {
                $multiply: [
                  { $divide: [{ $sum: 1 }, totalContacts] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Language distribution
    const languageDistribution = await Contact.aggregate([
      {
        $group: {
          _id: "$preferredLanguage",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent contacts (last 5)
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email category subject createdAt");

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalContacts,
          todaysContacts,
          weeklyContacts,
          monthlyContacts,
        },
        categoryDistribution,
        languageDistribution,
        recentContacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};