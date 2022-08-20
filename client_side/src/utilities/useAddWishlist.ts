import { notify } from "../components/Toast";
import { store } from "../redux/store";
import { FETCH_WISHLIST, TOGGLE_WISHLIST } from "../redux/types";
import { ArticleShape } from "./interfaces";

export function ToggleWishlist(initState: ArticleShape) {
  const getWishlist = localStorage.getItem("wishlist_articles");

  // if wishlist is empty
  if (!getWishlist) {
    const newWishlist = JSON.stringify([initState]);
    localStorage.setItem("wishlist_articles", newWishlist);
    store.dispatch({
      type: "FETCH_WISHLIST",
      payload: [initState],
    });
    notify("success", "🚀 Removed Article");
  } else {
    // here toggle wishlist items
    const arr: ArticleShape[] | [] = JSON.parse(getWishlist);

    if (arr.find((item) => item._id === initState._id)) {
      // already in wishlist
      const newWishlist = arr.filter((item) => item._id !== initState._id);
      localStorage.setItem("wishlist_articles", JSON.stringify(newWishlist));
      store.dispatch({
        type: TOGGLE_WISHLIST,
        payload: newWishlist,
      });
      notify("success", "🦄 Removed Article");
    } else {
      localStorage.setItem(
        "wishlist_articles",
        JSON.stringify([initState, ...arr])
      );
      store.dispatch({
        type: FETCH_WISHLIST,
        payload: [initState, ...arr],
      });
      notify("success", "🚀 Addred Article");
    }
  }
}
