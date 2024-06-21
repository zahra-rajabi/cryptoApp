import chartDown from "../assets/chart-down.svg";
import chartUp from "../assets/chart-up.svg";
import Module from "./Module";

function Table({
  data,
  currency,
  modalData,
  setModalData,
  OpenModal,
  setOpenModal,
  night,
}) {
  function currencyHandler() {
    if (currency === "usd") {
      return "$ ";
    } else if (currency === "eur") {
      return "€ ";
    } else if (currency === "jpy") {
      return "¥ ";
    }
  }

  return (
    <>
      <section
        className={`mt-10 md:mt-4 text-indigo-100 ${
          !night && "text-zinc-700"
        } overflow-x-auto`}
      >
        <table className="w-full text-[7px] xsm:text-[9px] text-left rounded-lg md:text-base ">
          <thead>
            <tr className={`border-b-2 ${!night && "border-zinc-700"}`}>
              <th className="table-heading">Coin</th>
              <th className="table-heading">Name</th>
              <th className="table-heading">Price</th>
              <th className="table-heading">24H</th>
              <th className="table-heading">Total volume</th>
              <th className="hidden table-heading md:block">last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coin) => (
              <tr
                key={coin.id}
                className={`border-b-2 border-zinc-200/10  ${
                  !night && "border-zinc-700/20"
                } `}
              >
                <td
                  className="space-x-2 cursor-pointer table-data"
                  onClick={() => {
                    setOpenModal(true);
                    setModalData([
                      coin.image,
                      coin.id,
                      coin.current_price,
                      coin.market_cap,
                      coin.ath,
                    ]);
                  }}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="inline-block w-5 h-6 pb-1 md:w-4 md:h-5"
                  />
                  <span className="mx-auto">{coin.symbol.toUpperCase()}</span>
                </td>
                <td className="font-semibold tracking-wide table-data first-letter:capitalize">
                  {coin.name}
                </td>
                <td className="table-data">
                  <b>{currencyHandler()}</b>
                  {coin.current_price}
                </td>
                <td
                  className="table-data"
                  style={
                    coin.price_change_percentage_24h < 0
                      ? { color: "#FF3131	" }
                      : { color: "#009E60	" }
                  }
                >
                  {Number(coin.price_change_percentage_24h).toFixed(2)}%
                </td>
                <td className="table-data">{coin.total_volume}</td>
                <td className="hidden table-data md:block">
                  <img
                    src={
                      coin.price_change_percentage_24h < 0 ? chartDown : chartUp
                    }
                    alt="chart"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {OpenModal && (
        <Module
          setOpenModal={setOpenModal}
          modalData={modalData}
          night={night}
        />
      )}
    </>
  );
}

export default Table;
