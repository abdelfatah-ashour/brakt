import React, { useState } from "react";
import Helmet from "../components/Helmet";
import InputRegister from "../components/InputRegister";
import { apiAxios } from "../utilities/axios";
import "../assets/css/register.css";
import { notify } from "../components/Toast";
import { useHistory } from "react-router-dom";

export default function ForgetPassword() {
  const route = useHistory();
  const [reset, setReset] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReset(e.target.value);
  };

  const handleSubmit = async () => {
    await apiAxios
      .post("/v1/author/forget", { email: reset })
      .then(({ data }) => {
        notify("success", data.message);
        route.push("/forget-password/reset");
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
      description={
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
      }
    >
      <main>
        <div className="container">
          <div className="mainReset d-flex justify-content-center align-items-center">
            <div className="reset d-flex flex-column my-auto">
              <h1 className="text-center">Reset Password</h1>

              <InputRegister
                label="your email"
                name="reset"
                type="email"
                id="resetId"
                value={reset}
                placeholder="type your email"
                handleChange={handleChange}
              />
              <div className="p-2 w-100">
                <button
                  className="btn btn-primary text-uppercase text-uppercase w-100"
                  onClick={handleSubmit}
                >
                  reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}
