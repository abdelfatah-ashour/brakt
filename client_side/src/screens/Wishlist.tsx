import React from "react";
import { DefaultRootState, RootStateOrAny, useSelector } from "react-redux";
import Helmet from "../components/Helmet";
import OneArticle from "../components/OneArticle";

export default function Wishlist() {
  const { wishlist } = useSelector<
    DefaultRootState,
    {
      wishlist: [];
    }
  >((state: RootStateOrAny) => state);
  return (
    <Helmet
      title="♥ wishlist"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
    >
      <main>
        <div className="container">
          <div className="d-flex flex-wrap w-100 justify-content-center align-items-start">
            {wishlist.length > 0 &&
              wishlist.map((article, i) => {
                return <OneArticle article={article} key={i} />;
              })}
            {wishlist.length === 0 && (
              <div className="alert alert-info">wishlist is empty</div>
            )}
          </div>
        </div>
      </main>
    </Helmet>
  );
}
