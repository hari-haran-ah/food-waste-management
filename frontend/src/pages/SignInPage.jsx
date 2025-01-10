import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import SignInForm from "../components/SignInForm";
import Cookies from "js-cookie";
import AppIcon from "../components/AppIcon";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await signIn({ email, password });
      Cookies.set("user", JSON.stringify(response.data), {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-10 bg-blue-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            FOOD DONATE APP
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <button
            onClick={() => navigate("/signup")}
            className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-grow pt-24 pb-16 overflow-y-auto bg-gray-100">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
            Sign In
          </h2>

          <SignInForm onSignIn={handleSignIn} loading={loading} error={error} />

          {error && (
            <p className="text-red-600 text-center mt-4 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm mb-2 text-blue-700">Don't have an account?</p>
            <button
              className="text-blue-600 underline hover:text-blue-800 transition duration-300 text-sm font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
