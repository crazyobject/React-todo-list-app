import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PushNotifier = (props) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1400}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  );
};
export default PushNotifier;
