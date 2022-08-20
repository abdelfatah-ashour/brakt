const router = require("express").Router();
const {multerConfig} = require("../utilities/multer");
const {
  createArticle,
  getArticles,
  getOneArticleWithId,
  getArticlesWithTags,
} = require("../controller/article-controller");
const {isAuth} = require("../controller/author-controller");

router.get("/", getArticles);
router.get("/articleId", getOneArticleWithId);
router.get("/tags", getArticlesWithTags);

router.post(
  "/createArticle",
  multerConfig.single("file"),
  isAuth,
  createArticle
);

module.exports = router;
