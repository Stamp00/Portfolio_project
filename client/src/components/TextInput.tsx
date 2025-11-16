import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextInput = ({ label, error, fullWidth = false, className = '', ...props }: TextInputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="text-sm font-bold text-text">
          {label}
        </label>
      )}
      <input
        className={`
          bg-white
          border-3 border-text
          rounded-[10px]
          px-[27px] py-[21px]
          text-[36px]
          text-text
          focus:outline-none
          focus:ring-2
          focus:ring-tertiary
          ${fullWidth ? 'w-full' : 'w-[465px]'}
          ${className}
        `}
        style={{ fontFamily: "'Squada One', sans-serif" }}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-600 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
