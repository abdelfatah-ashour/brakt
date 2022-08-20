import { useEffect } from "react";
import cookie from "js-cookie";
import { AiTwotoneHeart } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import {
  DefaultRootState,
  RootStateOrAny,
  useDispatch,
  useSelector,
} from "react-redux";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import LOGO from "../../assets/images/logo.png";
import { notify } from "../Toast";
import { loginAction, logoutAction } from "../../redux/actions/authActions";
import { IS_LOGIN, IS_LOGOUT } from "../../redux/types";
import { apiAxios } from "../../utilities/axios";
import { GenerateAnonymous } from "../../utilities/generateAnonymous";
import "./bar.css";
import { AuthShape } from "../../utilities/interfaces";

export default function Bar(): JSX.Element {
  const { auth } = useSelector<
    DefaultRootState,
    {
      auth: AuthShape;
    }
  >((state: RootStateOrAny) => state);

  const dispatch = useDispatch();
  const isCookie = cookie.get("user_info");
  const anonymous = localStorage.getItem("anonymous");
  const wishlist = localStorage.getItem("wishlist_articles");

  useEffect((): void => {
    if (!anonymous && !auth.isLogin) {
      const anonymous = new (GenerateAnonymous as any)("anonymous", v4());
      localStorage.setItem("anonymous", JSON.stringify(anonymous));
    }
  }, [anonymous, auth.isLogin]);

  useEffect((): void => {
    if (!wishlist) {
      localStorage.setItem("wishlist_articles", JSON.stringify([]));
    }
  }, [wishlist, dispatch]);

  window.addEventListener("scroll", (e): void => {
    let elem = document.getElementById("full-bar");
    let scrollVal = Math.floor(window.pageYOffset);

    if (scrollVal > 300) {
      if (!elem?.classList.contains("sticky")) {
        elem?.classList.add("sticky");
      }
    } else {
      elem?.classList.remove("sticky");
    }
  });

  const toggleDropdown = (): void => {
    const list = document.getElementById("dropdown-bar");
    list?.classList.toggle("hidden-dropdown-bar");
  };

  const handleSubmit = async (): Promise<void> => {
    await apiAxios
      .get("/v1/author/logout")
      .then(({ data }) => {
        notify("success", data.message);
        dispatch(logoutAction(IS_LOGOUT, ""));
      })
      .catch((error) => {
        if (error.response) {
          notify("error", error.response.data.message);
        } else if (error.request) {
          notify("error", "valid request");
        } else {
          notify("error", error.message);
        }
      });
  };

  useEffect(() => {
    if (isCookie) {
      dispatch(loginAction(IS_LOGIN, JSON.parse(isCookie)));
    } else {
      dispatch(logoutAction(IS_LOGOUT, ""));
    }
  }, [isCookie, dispatch]);

  return (
    <nav className="full-bar" id="full-bar">
      {/* start bar */}
      <div className="container">
        {/* start left menu */}
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset ms-auto"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="list-left-menu d-flex flex-column justify-content-center align-items-center list-unstyled">
              <li>
                <Link to="/" aria-label="home page">
                  home
                </Link>
              </li>
              <li>
                <Link to="/tags" aria-label="tags page">
                  tags
                </Link>
              </li>
              <li>
                <Link to="/about" aria-label="about page">
                  about
                </Link>
              </li>
              <li>
                <Link to="/contact" aria-label="contact us page">
                  contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row d-flex justify-content-between bar">
          {/* start left aside bar */}
          <div className="col-md-6 col-12 d-flex justify-content-between justify-content-md-start box-logo">
            <button
              aria-label="btn open menu"
              className="btn btn-menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
            >
              <HiMenuAlt2 />
            </button>

            <Link to="/" className="logo" aria-label="logo main application">
              <img src={LOGO} alt="Brakt logo" loading="lazy" />
            </Link>
            <div className="search-head-top">
              <button
                className="icon-search-head-top"
                aria-label="field search"
              >
                <FiSearch />
              </button>
              <input
                type="text"
                name="search"
                id="InputSearch"
                placeholder="Search..."
              />
            </div>
          </div>
          {/* start right aside bar */}
          <div className="col-md-6 col-12 d-flex justify-content-between justify-content-md-end options-bar">
            <Link to="create-post" className="create-post" aria-label="">
              create post
            </Link>
            <div className="d-flex links-options">
              <Link to="/wishlist" aria-label="nav to wishlist page">
                <AiTwotoneHeart />
              </Link>
              {auth.isLogin && (
                <>
                  <div className="profile" aria-label="">
                    <button
                      className="btn-profile"
                      onClick={toggleDropdown}
                      aria-label="toggle dropdown bar"
                    >
                      <CgProfile />
                    </button>
                    <div
                      className="dropdown-profile list-unstyled hidden-dropdown-bar"
                      id="dropdown-bar"
                    >
                      <div className="item-link-dropdown display-info d-flex flex-column my-2">
                        <span>username</span>
                        <span>email</span>
                      </div>
                      <div className="my-2">
                        <hr className="dropdown-divider" />
                      </div>
                      <div className="item-link-dropdown my-2">
                        <Link to="/dashboard">dashboard</Link>
                      </div>

                      <div className="item-link-dropdown my-2">
                        <Link to="create-post">create post</Link>
                      </div>

                      <div className="item-link-dropdown my-2">
                        <hr className="dropdown-divider" />
                      </div>
                      <button
                        className="btn item-link-dropdown my-2 w-100"
                        onClick={handleSubmit}
                        type="button"
                      >
                        sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
              {!auth.isLogin && (
                <Link to="/login" aria-label="nav to notification page">
                  <BiLogInCircle />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
