//App.jsx
import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DonatingFoodPage from './pages/DonatingFoodPage'; 
import BookingFoodPage from './pages/BookingFoodPage'; 
import FoodDetailsPage from './pages/FoodDetailsPage';
import PrivateRoute from './components/PrivateRoute'; 
import HistoryPage from './pages/HistoryPage/';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext'; // Wrap in AuthContext provider for global state

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <AuthProvider> {/* Wrap the whole app with AuthProvider */}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Private Routes */}
              <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
              <Route path="/donating-food" element={<PrivateRoute element={<DonatingFoodPage />} />} />
              <Route path="/booking-food" element={<PrivateRoute element={<BookingFoodPage />} />} />
              <Route path="/donation/:id" element={<PrivateRoute element={<FoodDetailsPage />} />} />
              <Route path="/History" element={<PrivateRoute element={<HistoryPage />} />} />
              <Route path="/about" element={<PrivateRoute element={<About />} />} />


              {/* Fallback for Unknown Routes */}
              <Route
                path="*"
                element={
                  <div className="page-not-found-container">
                    <h1 className="text-6xl font-bold text-red-600 animate-bounce">
                      404
                    </h1>
                    <p className="text-xl mt-4 text-gray-700">
                      Oops! The page you're looking for doesn't exist.
                    </p>
                    <button
                      className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                      onClick={() => (window.location.href = '/home')}
                    >
                      Go to Home
                    </button>
                  </div>
                }
              />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </AuthProvider>
  );
};

export default App;
