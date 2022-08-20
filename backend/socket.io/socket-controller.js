const Article = require("../model/article-model");
const {v4} = require("uuid");

async function addComment(data) {
  try {
    const {articleId, content, username, userId} = data;
    await Article.findByIdAndUpdate(
      articleId,
      {
        $addToSet: {
          comments: {
            _id: v4(),
            username,
            userId,
            content,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteComment(data) {
  try {
    const {articleId, commentId} = data;

    await Article.findByIdAndUpdate(
      articleId,
      {
        $pull: {
          comments: {
            _id: commentId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function addLike(data) {
  try {
    const {articleId, userId, username} = data;

    await Article.findByIdAndUpdate(
      articleId,
      {
        $addToSet: {
          like: {
            _id: v4(),
            username,
            userId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function addUnLike(data) {
  try {
    const {articleId, userId, username} = data;

    await Article.findByIdAndUpdate(
      articleId,
      {
        $addToSet: {
          unlike: {
            _id: v4(),
            username,
            userId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function cancelLike(data) {
  try {
    const {articleId, userId} = data;
    await Article.findByIdAndUpdate(
      articleId,
      {
        $pull: {
          like: {
            userId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

async function cancelUnlike(data) {
  try {
    const {articleId, userId} = data;
    await Article.findByIdAndUpdate(
      articleId,
      {
        $pull: {
          unlike: {
            userId,
          },
        },
      },
      {new: true},
      error => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addComment,
  deleteComment,
  addLike,
  addUnLike,
  cancelLike,
  cancelUnlike,
};
