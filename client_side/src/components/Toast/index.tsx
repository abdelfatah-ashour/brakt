import React from "react";
import toast, { Toaster } from "react-hot-toast";

const notify = (type: "success" | "error", msg: string): void => {
  toast[type](msg);
  return;
};

export { notify };

export default function Toastify() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#0b0b0b",
        },
      }}
    />
  );
}
