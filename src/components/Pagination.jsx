import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const PaginationModal = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bottom-0 py-2 flex justify-end px-5 space-x-2">

      {/* Prev Button */}
      <button
        className={`px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded transition ${
            currentPage === i + 1
              ? "bg-purple-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleDoubleRight />
      </button>

    </div>
  );
};

export default PaginationModal;
