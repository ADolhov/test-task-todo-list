// frontend/app/components/ErrorMessage.jsx
export default function ErrorMessage({ message, onDismiss }) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span className="block sm:inline">{message}</span>
        {onDismiss && (
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }