import { useState, useEffect } from "react";
import Loader from "./Loader";
import Module from "./Module";
import Mode from "./Mode";

function SearchBox({
  setCurrency,
  currency,
  modalData,
  setModalData,
  OpenModal,
  setOpenModal,
  night,
  setNight,
}) {
  let [load, setLoad] = useState(false);
  let [searchResult, setSearchResult] = useState("");
  let [searchData, setSearchData] = useState([]);
  /////////////////

  useEffect(() => {
    setLoad(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&locale=en&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => {
        setSearchData(json);
        setLoad(false);
      })
      .catch((error) => console.log(error));
  }, []);
  ////////////////
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

  return (
    <section className="flex flex-col-reverse mt-16 md:flex-row md:items-center md:justify-between ">
      <section className="relative w-full md:w-1/2 ">
        <form className="flex space-x-2 ">
          <input
            type="text"
            onChange={searchHandler}
            value={searchResult}
            placeholder="search..."
            className={`w-3/5 md:w-5/12 h-9 md:h-full xsm:w-2/5 px-2 md:px-4 md:py-2.5 bg-indigo-100 border-none rounded-lg form-input focus:border-none focus:ring-0 ${
              !night &&
              "bg-zinc-700 text-indigo-100 placeholder:text-indigo-100"
            }`}
          />
          <select
            className={`md:w-3/12 h-9 md:h-full lg:w-2/12 xsm:w-1/6 text-sm md:text-base w-2/5 px-2 bg-indigo-100 border-none rounded-lg focus:border-none focus:ring-0 ${
              !night &&
              "bg-zinc-700 text-indigo-100 placeholder:text-indigo-100"
            }`}
            onChange={currencyHandler}
            value={currency}
          >
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="jpy">YEN</option>
          </select>
        </form>
        {searchResult && (
          <div
            className={`absolute w-3/5  md:w-5/12 xsm:w-2/5 mt-3 overflow-x-hidden bg-zinc-400 rounded-lg  max-h-52 
          ${
            load || !searchBoxData.length
              ? null
              : " scrollbar overflow-y-scroll overscroll-contain  scrollbar-w-2 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-track-indigo-100 scrollbar-thumb-zinc-900"
          }
          ${!night && "scrollbar-track-indigo-400"}
      `}
          >
            {load ? (
              <Loader />
            ) : !searchBoxData.length ? (
              <p className="p-2 text-sm font-semibold text-indigo-500 md:text-base ">
                Nothing found
              </p>
            ) : (
              searchBoxData.map((info) => (
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setModalData([
                      info.image,
                      info.id,
                      info.current_price,
                      info.market_cap,
                      info.ath,
                    ]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm transition-all duration-150 border-b-2 cursor-pointer md:text-base border-zinc-700/10 last:border-b-0 hover:bg-indigo-600 hover:text-white"
                  key={info.id}
                >
                  <img src={info.image} alt={info.name} className="w-4 h-4" />
                  <p>{info.name}</p>
                </div>
              ))
            )}
            {OpenModal ? <Module modalData={modalData} /> : null}
          </div>
        )}
      </section>
      <Mode night={night} setNight={setNight} />
    </section>
  );
}

export default SearchBox;
