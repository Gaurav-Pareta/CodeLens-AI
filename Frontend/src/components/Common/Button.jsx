export const Button = ({ 
  children, 
  onClick, 
  isLoading = false, 
  disabled = false,
  className = "" 
}) => {
  const baseClasses = "w-full px-6 py-3 font-medium rounded-lg flex items-center justify-center gap-2";
  const stateClasses = isLoading 
    ? 'bg-blue-800 cursor-not-allowed'
    : 'bg-blue-600 hover:bg-blue-700';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${stateClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Reviewing Code...</span>
        </>
      ) : (
        <>
          <span>🔍</span>
          <span>Review Code</span>
        </>
      )}
    </button>
  );
};