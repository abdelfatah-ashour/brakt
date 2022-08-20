import React, { useState } from "react";
import InputRegister from "../components/InputRegister/index";
import Helmet from "../components/Helmet";
import { apiAxios } from "../utilities/axios";
import { notify } from "../components/Toast";
import { Link } from "react-router-dom";
import "../assets/css/register.css";

export default function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
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
      .post("/v1/author/signup", user)
      .then(({ data }) => {
        notify("success", data.message);
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
            <h1 className="head-register">🔥 Sign Up</h1>
            <div className="register">
              <InputRegister
                type="text"
                name="firstName"
                id="firstName"
                label="first name"
                value={user.firstName}
                placeholder="First Name"
                handleChange={handleChange}
              />
              <InputRegister
                type="text"
                name="lastName"
                id="lastName"
                label="last name"
                value={user.lastName}
                placeholder="Last Name"
                handleChange={handleChange}
              />
              <InputRegister
                type="text"
                name="username"
                id="username"
                label="username"
                value={user.username}
                placeholder="@username"
                handleChange={handleChange}
              />
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
                  Sign Up
                </button>
              </div>
            </div>
            <div className="my-3 p-2">
              <div className="w-100 mb-2">
                Have already an account ?{" "}
                <strong>
                  <Link to="/login" style={{ color: "#323ebe" }}>
                    login
                  </Link>
                </strong>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}
