import moment from "moment";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import { DefaultRootState, RootStateOrAny, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.png";
import { ArticleShape } from "../../utilities/interfaces";
import { ToggleWishlist } from "../../utilities/useAddWishlist";
import "./oneArticle.css";

export default function Index({ article, currentWidth }: { article: any; currentWidth?: any }) {
  const { wishlist } = useSelector<DefaultRootState, { wishlist: ArticleShape[] }>((state: RootStateOrAny) => state);

  return (
    <div className={"one-article p-0 " + currentWidth} key={article._id}>
      <button className="btn-save" aria-label="saved to favorite" onClick={() => ToggleWishlist(article)}>
        {wishlist.find(item => item._id === article._id) ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
      <div className="wrapper-image">
        <img
          src={
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_API_IMAGE}/v1/image/${article.imageArticle}`
              : `/v1/image/${article.imageArticle}`
          }
          alt={article.title}
          loading="lazy"
        />
        <div className={article.category + " category"}>{article.category}</div>
      </div>
      <div className="d-flex article-details">
        <div className="article-img-user">
          <img src={user} alt={article.author.firstName + "  " + article.author.lastName} loading="lazy" />
        </div>
        <div className="details">
          <span className="text-capitalize">By: {article.author.firstName + "  " + article.author.lastName}</span>
          <span className="mx-2">⌚ {moment(article.createdAt).fromNow()}</span>
          <h6 className="title my-2">{article.title.slice(0, 55)}</h6>
          <div className="details d-flex justify-content-between align-items-baseline w-100">
            <div className="d-flex flex-wrap justify-content-evenly align-items-center">
              {article.tags.map((tag: string) => {
                return (
                  <span key={tag} className="ms-1">
                    <Link to={`/tags/${tag}`}>#{tag}</Link>
                  </span>
                );
              })}
            </div>

            <div className="save-article d-flex justify-content-evenly align-items-center">
              <Link to={`/article/${article._id}`} aria-label="read full article" rel="next">
                <BiLinkAlt /> full article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
