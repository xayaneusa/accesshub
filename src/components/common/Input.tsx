import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const inputClasses = `
      block px-4 py-2 w-full text-base
      border rounded-md
      bg-white text-slate-900
      transition duration-150 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${error ? 'border-red-500' : 'border-slate-300'}
      ${props.disabled ? 'bg-slate-100 cursor-not-allowed' : ''}
      ${className}
    `;

    const containerClasses = `
      ${fullWidth ? 'w-full' : ''}
      mb-4
    `;

    return (
      <div className={containerClasses}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;