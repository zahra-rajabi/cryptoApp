let number = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

function Pagination({ pageNumber, setPageNumber }) {
  return (
    <div className="flex items-center justify-center w-full my-12">
      <button
        className={`button ${pageNumber === 1 ? "opacity-50" : ""} mr-2`}
        onClick={pageNumber !== 1 ? () => setPageNumber(pageNumber - 1) : null}
      >
        Previous
      </button>
      {number.map((page, index) => (
        <div
          className="flex justify-center items-center text-[9px] md:text-base"
          key={index}
        >
          {page === 29 ? (
            <span className="mr-2 text-indigo-400 ">...</span>
          ) : (
            ""
          )}

          <button
            className={`w-8 md:w-10 p-2 mx-2 text-indigo-400 border-2 border-indigo-400 rounded-lg ${
              page === pageNumber
                ? "bg-indigo-400 text-zinc-800 font-medium"
                : "bg-none"
            }`}
            style={
              page === 1 ||
              page === 2 ||
              page === 29 ||
              page === 30 ||
              page === pageNumber
                ? { display: "block", marginLeft: "0" }
                : { display: "none" }
            }
            onClick={() => {
              setPageNumber(page);
            }}
          >
            {page}
          </button>

          {page === 2 ? (
            <span
              className={`text-indigo-400 ${
                pageNumber > 2 && pageNumber < 29 ? "mr-2" : ""
              }`}
            >
              ...
            </span>
          ) : (
            ""
          )}
        </div>
      ))}
      <button
        className={` button ${pageNumber === 30 ? "opacity-50" : ""}`}
        onClick={
          pageNumber !== 30
            ? () => {
                setPageNumber(pageNumber + 1);
              }
            : null
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
