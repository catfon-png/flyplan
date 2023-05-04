import React, { useEffect } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleAuth, getUserId } from "../state/slicers/loginSlice";
import "./Login.css";

export interface ILoginPageProps {}

export const Login = (props: ILoginPageProps) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuthStateChange = (user: User | null) => {
    if (user) {
      dispatch(toggleAuth(true));
      navigate("/dashboard");
    } else {
      dispatch(toggleAuth(false));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);
    return () => {
      unsubscribe();
    };
  }, [auth, dispatch, navigate]);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        navigate("/");
        dispatch(getUserId(auth.currentUser?.uid!));
      })
      .catch((error) => {
        console.log(error);
        dispatch(toggleAuth(false));
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center"           style={{ backgroundColor : "#F5F5F5" }}>
      <div className="max-w-md w-full bg-white rounded-lg px-10 py-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Login
          </h2>
          <p className="text-gray-500 mt-6" style={{ color: "#9A9A9A" }}>Please sign in to continue</p>
        </div>
        <div>
          <button
            type="submit"
            style={{ color: "#535353" }}
            className="w-full flex justify-center py-2 px-4 text-sm font-medium bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => signInWithGoogle()}
          >
            <img height={5} className="h-6 w-6 mr-2 text-flyplanyellow" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.eclipseeducation.com.au%2Fimages%2FGoogle_Reviews_logo.png&f=1&nofb=1&ipt=675ea162815674e00aa196a574caf4d6188452557bd8458bcaed18f378d5cbe5&ipo=images" alt="" />

            <link type="image/png" sizes="16x16" rel="icon" href=".../icons8-google-16.png"/>

            Login with Google
          </button>
        </div>
        <div className="text-center text-gray-400 flex justify-center">
        <button onClick={() => navigate("/")} className="flex items-center" style={{ color: "#EBBE6F" }}>
  <FaArrowLeft className="mr-2" />
  Go to home
</button>

</div>

      </div>
    </div>
  );
  
};
