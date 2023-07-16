const Question = require("../postQuestion");

// Create a new question
exports.postQuestion = async (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { title, content } = req.body;

  try {
    const question = new Question({
      user: req.user, // Check the user is authenticated
      title,
      content,
      isAnswered: "not_answered",
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Question posted successfully",
      question,
    });
  } catch (error) {
    console.log("Error posting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to post question",
      error: error.message,
    });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    // Fetch all questions
    const questions = await Question.fetchAllQuestions();

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.log("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};


// Answer question
exports.postAnswer = async (req, res) => {
  const questionId = req.params.id;
  const { answers, adminId } = req.body;

  try {
    const answer = await Question.findByIdAndUpdate(
      questionId,
      {
        isAnswered: "answered",
        answers,
        adminID: adminId,
      },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      message: "Answer posted successfully",
      question: answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};


module.exports = exports;
