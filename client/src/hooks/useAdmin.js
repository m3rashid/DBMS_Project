import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/actions/auth.action";

const useAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return {
    handleLogout,
  };
};

export default useAdmin;