import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserId } from "../../state/slicers/loginSlice";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { emptyDashboard } from "../../state/slicers/dashboardSlice";
import { resetFlightData } from "../../state/slicers/flightSlice";
import { onAuthStateChanged, User } from "firebase/auth";

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  const userId = useSelector((state: RootState) => state.loginReducer.userId);

  const auth = getAuth(); // Initialize auth
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Local state
  const [loading, setLoading] = useState(true);

  const handleAuthStateChange = (userId: User | null) => {
    if (userId) {
      dispatch(getUserId(userId.uid));
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const updateActiveTab = () => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/":
        setActiveTab("search");
        break;
      case "/dashboard":
        setActiveTab("dashboard");
        // dispatch(resetFlightData());
        // dispatch(resetSearch());
        break;
    }
  };

  const handleDashboardClick = () => {
    if (!isLoadingDashboard) {
      // check if not already loading
      setIsLoadingDashboard(true);
      setActiveTab("dashboard");
      // dispatch(resetFlightData());
      // dispatch(resetSearch());
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    updateActiveTab();
  }, [location]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(getUserId(""));
      navigate("/");
      dispatch(emptyDashboard());
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    });
  };

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setIsLoadingDashboard(false); // reset the loading flag once dashboard finishes loading
    }
  }, [location]);

  return (
    <>
      <div className="sticky top-0 z-10">
        {!isLoginPage && (
          <nav className="flex items-center justify-between bg-white sm:mx-20 md:mx-40 lg:mx-100 pt-10">
            <div className="flex items-center text-gray-800 pb-3">
              <Link
                to="/"
                onClick={() => setActiveTab("search")}
                className="text-3xl font-logo"
              >
                flyplan
              </Link>
            </div>
            <div className="flex">
              <div>
                {userId ? (
                  <button
                    onClick={handleLogout}
                    className="inline-block px-4 py-2 leading-none text-flyplanyellow bg-white border border-flyplanyellow rounded hover:bg-grey"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="inline-block px-4 py-2 leading-none text-white bg-flyplanyellow rounded hover:bg-yellow-500 lg:mt-0"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
        {!isLoginPage && (
          <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-400 sm:mx-10 md:mx-40 lg:mx-100 border-b border-gray-100">
            <ul className="flex justify-center mb-0 ml-0 text-base bg-white">
              <li className="mr-2 w-full md:w-auto">
                {" "}
                {/* add w-full and md:w-auto classes */}
                <Link
                  to="/"
                  className={`inline-block p-4 rounded-t-lg hover:text-flyplanyellow dark:hover:text-flyplanyellow ${
                    activeTab === "search"
                      ? "text-flyplanyellow border-flyplanyellow border-b-2 w-60 active dark:text-flyplanyellow dark:border-flyplanyellow font-bold"
                      : "text-gray-400 border-b-2 w-60 border-b-1 "
                  }`}
                  onClick={() => setActiveTab("search")}
                >
                  Search
                </Link>
              </li>
              <li className="mr-2 w-full md:w-auto">
                {" "}
                {/* add w-full and md:w-auto classes */}
                <Link
                  to="/dashboard"
                  className={`inline-block p-4 rounded-t-lg hover:text-flyplanyellow dark:hover:text-yellow-500 ${
                    activeTab === "dashboard"
                      ? "text-flyplanyellow border-flyplanyellow border-b-2 w-60 active dark:text-flyplanyellow dark:border-flyplanyellow font-bold"
                      : "text-gray-400 border-b-2 w-60 border-b-1"
                  }`}
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
