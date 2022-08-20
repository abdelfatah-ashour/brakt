import { lazy, Suspense, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { io } from "socket.io-client";
import Bar from "./components/Bar";
import Spinner from "./components/Spinner";
import Toaster from "./components/Toast";
import { FETCH_WISHLIST } from "./redux/types";
import DetailsArticle from "./screens/DetailsArticle";
import ForgetPassword from "./screens/ForgetPassword";
import Login from "./screens/login";
import ResetPassword from "./screens/ResetPassword";
import SignUp from "./screens/signup";
import Wishlist from "./screens/Wishlist";
const Home = lazy(() => import("./screens/Home"));
const About = lazy(() => import("./screens/About"));
const Faq = lazy(() => import("./screens/Faq"));
const Contact = lazy(() => import("./screens/Contact"));
const OneTag = lazy(() => import("./screens/OneTag"));
const Tags = lazy(() => import("./screens/Tags"));
const CreatePost = lazy(() => import("./screens/CreatePost"));

export const Socket = io("/", {
  transports: ["websocket"],
  secure: process.env.REACT_APP_MODE === "production",
});

interface Auth {
  isLogin: Boolean;
  _id: string;
  username: string;
  email: string;
}

export default function App() {
  // const { auth: isAuth } = useSelector<Auth>((state) => state);

  // console.log(isAuth);

  let auth: Auth = {
    isLogin: false,
    _id: "",
    email: "",
    username: "",
  };

  // memoize the all washlist from localstorage and use it with dispacth
  const arrOfWishList = useMemo(() => {
    const getWishlist: string = localStorage?.getItem("wishlist_articles") || "";
    const arr = JSON.parse(getWishlist);
    return arr;
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // get all wishlist from locat storage and siaptch it to store
    dispatch({ type: FETCH_WISHLIST, payload: arrOfWishList });
  }, [arrOfWishList, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Bar />
        <Toaster />
        <Switch>
          <Route path="/tags/:oneTag">
            <Suspense fallback={<Spinner />}>
              <OneTag />
            </Suspense>
          </Route>
          <Route path="/tags">
            <Suspense fallback={<Spinner />}>
              <Tags />
            </Suspense>
          </Route>
          <Route path="/article/:articleId">
            <Suspense fallback={<Spinner />}>
              <DetailsArticle />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          </Route>
          <Route path="/contact">
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          </Route>
          <Route path="/forget-password/reset">
            <Suspense fallback={<Spinner />}>{!auth.isLogin ? <ResetPassword /> : <Home />}</Suspense>
          </Route>
          <Route path="/forget-password">
            <Suspense fallback={<Spinner />}>{auth.isLogin ? <ForgetPassword /> : <Home />}</Suspense>
          </Route>
          <Route path="/signup">
            <Suspense fallback={<Spinner />}>{!auth.isLogin ? <SignUp /> : <Home />}</Suspense>
          </Route>
          <Route path="/login">
            <Suspense fallback={<Spinner />}>{!auth.isLogin ? <Login /> : <Home />}</Suspense>
          </Route>
          <Route path="/FAQ">
            <Suspense fallback={<Spinner />}>
              <Faq />
            </Suspense>
          </Route>
          <Route path="/wishlist">
            <Suspense fallback={<Spinner />}>
              <Wishlist />
            </Suspense>
          </Route>
          <Route path="/create-post">
            <Suspense fallback={<Spinner />}>
              <CreatePost />
            </Suspense>
          </Route>
          <Route path="/" exact>
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          </Route>
          <Route>
            <Suspense fallback={<Spinner />}>
              <PageNotFound />
            </Suspense>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function PageNotFound() {
  return <h1>404 page not found</h1>;
}
