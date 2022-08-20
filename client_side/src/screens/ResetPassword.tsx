import React, { useState } from "react";
import Helmet from "../components/Helmet";
import InputRegister from "../components/InputRegister";
import { notify } from "../components/Toast";
import { apiAxios } from "../utilities/axios";
import { useHistory } from "react-router-dom";
import "../assets/css/register.css";

export default function ResetPassword() {
  const route = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async () => {
    await apiAxios
      .post("/v1/author/reset", { newPassword: newPassword })
      .then(({ data }) => {
        notify("success", data.message);
        route.push("/");
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
      title="Reset Password"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nulla sed odio animi. Magnam mollitia itaque commodi blanditiis iure accusantium rerum laudantium deserunt adipisci. Temporibus aliquid incidunt non hic! Qui."
    >
      <main>
        <div className="container">
          <div className="mainReset d-flex justify-content-center align-items-center">
            <div className="reset d-flex flex-column my-auto">
              <h1 className="text-center">New Password</h1>
              <InputRegister
                label="new password"
                name="new-password"
                type="password"
                id="passwordID"
                value={newPassword}
                placeholder="new password"
                handleChange={handleChange}
              />
              <div className="p-2 w-100">
                <button
                  className="btn btn-primary text-uppercase text-uppercase w-100"
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}
