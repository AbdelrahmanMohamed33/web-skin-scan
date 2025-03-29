import React from 'react';
const Button = ({ width, title, onPressed, disable }) => {
  return (
    <div className={`w-${width}`}>
      <button
        className={`w-full px-4 py-2 text-white font-bold text-lg rounded ${
          disable ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
        }`}
        onClick={disable ? null : onPressed}
        disabled={disable}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;