import cookie from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../assets/css/register.css";
import Helmet from "../components/Helmet";
import InputRegister from "../components/InputRegister/index";
import { notify } from "../components/Toast";
import { loginAction } from "../redux/actions/authActions";
import { IS_LOGIN } from "../redux/types";
import { apiAxios } from "../utilities/axios";

export default function Login() {
  const dispatch = useDispatch();
  const route = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await apiAxios
      .post("/v1/author/login", user)
      .then(({ data }) => {
        notify("success", data.message);
        const isCookie: string = cookie.get("user_info") || "";
        dispatch(loginAction(IS_LOGIN, JSON.parse(isCookie)));
        localStorage.removeItem("anonymous");
        route.goBack();
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

  return (
    <Helmet
      title="Signup"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
    >
      <main>
        <div className="container">
          <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="head-register">🔥 Login</h1>
            <div className="register">
              <InputRegister
                type="email"
                name="email"
                id="email"
                label="email"
                value={user.email}
                placeholder="example@te.co"
                handleChange={handleChange}
              />
              <InputRegister
                type="password"
                name="password"
                id="password"
                label="password"
                value={user.password}
                placeholder="abc#@%*12"
                handleChange={handleChange}
              />
              <div className="w-100">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit}
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}
