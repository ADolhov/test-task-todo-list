// frontend/app/components/FlashMessage.jsx
export default function FlashMessage({ message, type = 'success', onDismiss }) {
    const bgColor = {
      success: 'bg-green-100 border-green-500 text-green-700',
      error: 'bg-red-100 border-red-500 text-red-700',
      info: 'bg-blue-100 border-blue-500 text-blue-700'
    }[type];

    return (
      <div
        className={`${bgColor} border-l-4 p-4 mb-4 rounded flex justify-between items-center duration-300 transition`}
        role="alert"
      >
        <p>{message}</p>
        <button
          onClick={onDismiss}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    );
  }