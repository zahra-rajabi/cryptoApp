import { useState } from "react";

function SearchBox({ setCurrency, searchData }) {
  let [searchResult, setSearchResult] = useState("");
  function currencyHandler(event) {
    let value = event.target.value;
    setCurrency(value);
  }
  function searchHandler(event) {
    let value = event.target.value;
    setSearchResult(value);
  }

  let searchBoxData = searchData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchResult.toLowerCase()) ||
      data.symbol.toLowerCase().includes(searchResult.toLowerCase())
  );
  console.log(searchBoxData);
  return (
    <>
      <form className="w-full mt-16 space-x-2">
        <input
          type="text"
          onChange={searchHandler}
          value={searchResult}
          placeholder="search..."
          className="w-3/12 px-4 py-2 bg-indigo-100 border-none rounded-lg form-input focus:border-none focus:ring-0"
        />
        <select
          className="w-1/12 px-2 bg-indigo-100 border-none rounded-lg focus:border-none focus:ring-0"
          onChange={currencyHandler}
        >
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="jpy">YEN</option>
        </select>
      </form>
      {searchResult && (
        <div className="w-3/12 h-32 px-4 py-2 mt-3 overflow-x-hidden overflow-y-scroll bg-indigo-100 rounded-sm scrollbar scrollbar-w-1 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-track-indigo-400 scrollbar-thumb-indigo-100 ">
          {searchBoxData.map((info) => (
            <div className="flex items-center gap-2 p-2 border-b-2 border-zinc-700/10 last:border-b-0">
              <img src={info.image} alt={info.name} className="w-4 h-4" />
              <p>{info.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBox;
