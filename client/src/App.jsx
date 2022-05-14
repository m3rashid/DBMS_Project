import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTopics, loadUser } from "./store/actions/auth.action";
import { AdminPage, LoginPage, UserPage } from "./components/routes";

const App = () => {
  const { isAuthUser: userLoggedIn, isAuthAdmin: adminLoggedIn } = useSelector(
    (state) => state.auth
  );
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUser());
    dispatch(getTopics());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <BrowserRouter>
        {userLoggedIn ? (
          <UserPage />
        ) : adminLoggedIn ? (
          <AdminPage />
        ) : (
          <LoginPage />
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
