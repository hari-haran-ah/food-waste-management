const LoadingSpinner = ({ size = '8' }) => {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`w-${size} h-${size} border-4 border-t-transparent border-blue-500 rounded-full animate-spin`}
          role="status"
          aria-label="Loading..."
        ></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  