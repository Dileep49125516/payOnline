export const Failure = ({ message }) => {
    return (
      <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md flex items-center justify-center">
        <svg
          className="w-6 h-6 text-red-600 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span>{message || "Something went wrong!"}</span>
      </div>
    );
  };
  