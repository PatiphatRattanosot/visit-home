const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="join my-6 flex justify-center">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`join-item btn btn-sm ${
            number === currentPage ? "btn-active btn-primary" : ""
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
