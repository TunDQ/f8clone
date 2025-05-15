const commentsModel = require("../models/comments.model");

exports.createComment = async (req, res) => {
  try {
    const { lessonId, content } = req.body;
    const userId = req.user.id;
    const newComment = new commentsModel({
      user: userId,
      lesson: lessonId,
      content,
    });
    await newComment.save();
    const comment = await newComment.populate("user", "name -_id");

    res.status(201).json({
      message: "Create Comment successfully",
      comment: comment,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
exports.getComments = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const comments = await commentsModel
      .find({ lesson: lessonId })
      .populate("user", "name");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
