import { FETCH_WISHLIST, TOGGLE_WISHLIST } from "../types";

const initWishlist: any[] = [];

export function wishlistReducer(
  state = initWishlist,
  {
    type,
    payload,
  }: {
    type: string;
    payload: any;
  }
) {
  switch (type) {
    case FETCH_WISHLIST:
      return (state = payload);
    case TOGGLE_WISHLIST:
      return (state = payload);

    default:
      return state;
  }
}
