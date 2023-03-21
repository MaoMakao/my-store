import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Notification = () => {
  const { message } = useSelector((store) => store.notification);
  console.log(message);
  return (
    <div className="fixed justify-center top-1/2 text-center bg-red-600  z-50 w-full ">
      <Link to="user-account">{message}</Link>
    </div>
  );
};

export default Notification;
