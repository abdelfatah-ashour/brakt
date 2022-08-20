import { Link } from "react-router-dom";
import allTags from "../utilities/tags_types.json";
import Helmet from "../components/Helmet";
import "../assets/css/tags.css";

export default function tags() {
  return (
    <Helmet
      title="Tags"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
    >
      <div className="container">
        <div className="wrappers-tags d-flex flex-wrap justify-content-center align-items-center w-100">
          <h1 className="heading-tags w-100 text-center my-1 text-uppercase">
            tags
          </h1>
          <div className="wrapper-tags row w-100">
            {allTags.map((category) => {
              return (
                <div
                  className="categoryTag col-md-6 col-12 mb-3"
                  key={category.id}
                >
                  <h2 className="text-tag text-capitalize mb-3">
                    {category.category}
                  </h2>
                  <div className="one-category-tags d-flex flex-wrap justify-content-center align-items-start align-content-start p-1">
                    {category.allTags.map((tag, i) => {
                      return (
                        <span key={i}>
                          <Link to={`/tags/${tag}`} className="one-tag me-3">
                            #{tag}
                          </Link>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Helmet>
  );
}
