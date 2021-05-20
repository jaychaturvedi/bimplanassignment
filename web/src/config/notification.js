import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function ShowNotification(type = "success", message = "Error") {
  if (type === "success") toast.success(message);
  else toast.error(message);
}
