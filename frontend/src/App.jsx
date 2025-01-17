import React, { useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DonatingFoodPage from "./pages/DonatingFoodPage";
import BookingFoodPage from "./pages/BookingFoodPage";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import HistoryPage from "./pages/HistoryPage";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import PageLoader from "./components/PageLoader";

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Define the paths where Footer should be displayed
  const showFooterRoutes = [
    "/",
    "/signup",
    "/home",
    "/donating-food",
    "/booking-food",
    "/history",
    "/about",
  ];

  // Check if the current path matches a route where Footer should be shown
  const shouldShowFooter = showFooterRoutes.includes(location.pathname);

  // Trigger loading state during route changes
  const handleStartLoading = () => setLoading(true);
  const handleStopLoading = () => setLoading(false);

  return (
    <AuthProvider>
      {/* Display the PageLoader when loading is true */}
      {loading && <PageLoader />}

      <div className="p-4">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
            nodeRef={nodeRef}
            onEnter={handleStartLoading} // Start loading when route transition begins
            onEntered={handleStopLoading} // Stop loading when route transition ends
          >
            <div ref={nodeRef}>
              <Routes location={location}>
                {/* Public Routes */}
                <Route path="/" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Private Routes */}
                <Route
                  path="/home"
                  element={<PrivateRoute element={<HomePage />} />}
                />
                <Route
                  path="/donating-food"
                  element={<PrivateRoute element={<DonatingFoodPage />} />}
                />
                <Route
                  path="/booking-food"
                  element={<PrivateRoute element={<BookingFoodPage />} />}
                />
                <Route
                  path="/history"
                  element={<PrivateRoute element={<HistoryPage />} />}
                />
                <Route
                  path="/about"
                  element={<PrivateRoute element={<About />} />}
                />

                {/* Fallback for Unknown Routes */}
                <Route
                  path="*"
                  element={
                    <div className="page-not-found-container text-center py-40">
                      <h1 className="text-6xl font-bold text-red-600 animate-bounce">
                        404
                      </h1>
                      <p className="text-xl mt-4 text-gray-700">
                        Oops! The page you're looking for doesn't exist.
                      </p>
                      <button
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        onClick={() => (window.location.href = "/home")}
                      >
                        Go to Home
                      </button>
                    </div>
                  }
                />
              </Routes>
              {/* Conditionally render Footer */}
              {shouldShowFooter && <Footer />}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </AuthProvider>
  );
};

export default App;
