import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/home.css";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetchArticles";
import { ArticleShape, TagsShape } from "../utilities/interfaces";
import Tags from "../utilities/tags_types.json";

export const articlesLinks = ["general", "technology", "healthy", "sports"];

export default function Home() {
  const [allArticles, setAllArticles] = useState({
    currentFilter: "general",
    page: 1,
  });

  const { loading, apiData, error } = useFetch("GET", "/article", allArticles.currentFilter, "All", allArticles.page);
  console.log("loading, apiData, error", loading, apiData, error);

  const toggleHotTags = (): void => {
    const elem = document.getElementById("hotTags");
    elem?.classList.toggle("toggleHotTags");
    return;
  };

  const handleFilter = (category: string) => {
    setAllArticles({
      ...allArticles,
      currentFilter: category,
    });
  };

  return (
    <Helmet
      title="Brakt"
      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam atque corporis amet quam fuga nostrum nisi ipsam facilis quos, odit, consectetur, nobis cumque minus expedita? Nam dolor ex inventore ducimus.">
      <main className="home">
        <div className="hotTags" id="hotTags">
          <button className="open-tab-tags" onClick={toggleHotTags}>
            #🔥
          </button>
          <button className="close-tab-tags" onClick={toggleHotTags}>
            x
          </button>
          <ul className="list-unstyled text-center">
            {Tags.map((collect: TagsShape): React.ReactNode => {
              return collect.allTags.map((tag, i) => {
                return (
                  i <= 3 && (
                    <li key={i}>
                      <Link to={"/tags/" + tag}># {tag}</Link>
                    </li>
                  )
                );
              });
            })}
          </ul>
        </div>
        {/* start main article's */}
        <div className="main-articles d-flex justify-content-start">
          <div className="container-articles w-100">
            {/* start nav articles */}
            <div className="nav-articles d-flex justify-content-start align-items-center">
              <div className="list-nav">
                {articlesLinks.map((item, i) => {
                  return (
                    <button
                      className={
                        allArticles.currentFilter === item
                          ? "active-btn-articles btn-nav mx-2 text-uppercase"
                          : "btn-nav mx-2 text-uppercase"
                      }
                      onClick={() => handleFilter(item)}
                      key={i}
                      aria-label={"nav " + item}>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            {loading && <Spinner />}
            {/* wrapper all articles */}
            <div className="container">
              <div className="wrapper-articles row d-flex flex-wrap justify-content-evenly align-items-start">
                {!loading &&
                  !error &&
                  apiData.map((article: ArticleShape): React.ReactNode => {
                    return <OneArticle article={article} currentWidth="col-md-5 col-12" key={article?._id} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}
