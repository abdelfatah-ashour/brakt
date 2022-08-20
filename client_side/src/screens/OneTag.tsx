import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";
import Spinner from "../components/Spinner";
import { apiAxios } from "../utilities/axios";
import { ArticleShape } from "../utilities/interfaces";

export default function OneTag() {
  const { oneTag } = useParams<{
    oneTag: string;
  }>();
  const [article, setArticle] = useState<ArticleShape[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page] = useState(1);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      await apiAxios
        .get("/v1/article/tags", {
          params: {
            tags: oneTag,
            page: page,
          },
        })
        .then(({ data }) => {
          setLoading(false);
          setArticle(data.message);
          setError(error);
        })
        .catch(() => {
          setLoading(false);
          setArticle([]);
          setError(true);
        });
    }

    fetchArticle();

    return () => {
      setArticle([]);
      setError(false);
      setLoading(false);
    };
  }, [oneTag, error, page]);

  return (
    <Helmet
      title={"#" + oneTag.toUpperCase()}
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
    >
      <main>
        {loading && <Spinner />}
        {error && (
          <div className="alert alert-danger">something went wrong!</div>
        )}
        {!error && article.length > 0 && (
          <>
            <h1 className="text-center mt-3 p-1">#{oneTag.toUpperCase()}</h1>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-start">
                {!error &&
                  article.map((item) => {
                    return (
                      <React.Fragment key={item._id}>
                        <OneArticle
                          article={item}
                          currentWidth="col-md-8 col-12"
                        />
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {!error && loading && !article.length && (
          <div className="row m-0 p-0">
            <div
              className="alert alert-light text-center mt-5 col-md-6 col-12 mx-auto"
              role="alert"
            >
              not available article match with #{oneTag}
            </div>
          </div>
        )}
      </main>
    </Helmet>
  );
}
