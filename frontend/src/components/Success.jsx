import React from 'react'

export function Success({message}) {
    return (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-md flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{message || "Success!"}</span>
        </div>
      );
    };
