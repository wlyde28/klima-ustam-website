import React from 'react';

const Switch = React.forwardRef(({ className = '', checked, onCheckedChange, ...props }, ref) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-primary-600' : 'bg-gray-200'} ${className}`}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      ref={ref}
      {...props}
    >
      <span
        data-state={checked ? 'checked' : 'unchecked'}
        className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
});

Switch.displayName = 'Switch';

export { Switch };