import React from 'react';

const PrimaryButton = ({ children, className, props }) => {
    return (
        <button
            {...props}
            className={`
        rounded-xl
        px-5 py-2.5
        font-medium
        bg-[var(--button-primary-bg)]
        text-[var(--button-primary-text)]
        transition-colors
        duration-200
        hover:opacity-90
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;