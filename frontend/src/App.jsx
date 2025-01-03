import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DonatingFoodPage from "./pages/DonatingFoodPage";
 // Adjust the path as needed
import BookingFoodPage from './pages/BookingFoodPage'; // Adjust the path as needed


const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            {/* Main Routes */}
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route path="/home" element={<HomePage />} />
            <Route path="donating-food" element={<DonatingFoodPage />} />
            <Route path="booking-food" element={<BookingFoodPage />} />
            

            
            {/* Fallback for Unknown Routes */}
            <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
