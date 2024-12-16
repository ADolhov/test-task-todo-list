// frontend/app/components/Pagination.jsx
export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    perPage,
    onPerPageChange
  }) {
    const perPageOptions = [5, 10, 25];

    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };

    const handlePerPageChange = (event) => {
      const newPerPage = Number(event.target.value);
      onPerPageChange(newPerPage);
    };

    return (
      <div className="mt-6">
        <div className="flex justify-center gap-2 mb-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span>Items per page:</span>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border rounded px-2 py-1"
          >
            {perPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }