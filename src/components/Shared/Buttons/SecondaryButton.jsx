export function SecondaryButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`
        rounded-xl
        border
        border-[var(--text-primary)]
        bg-transparent
        px-5 py-2.5
        font-medium
        text-[var(--text-primary)]
        transition-colors
        duration-200
        hover:bg-[var(--background-secondary)]
        cursor-pointer
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}