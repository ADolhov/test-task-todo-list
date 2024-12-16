// frontend/app/components/Filter.jsx
export default function Filter({ currentFilter, onFilterChange }) {
    return (
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded ${
            currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('pending')}
          className={`px-4 py-2 rounded ${
            currentFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded ${
            currentFilter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>
    );
  }