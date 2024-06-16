import chartDown from "../assets/chart-down.svg";
import chartUp from "../assets/chart-up.svg";
function Table({ data, currency }) {
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
    <section className="mt-4 text-indigo-100">
      <table className="w-full text-left rounded-lg ">
        <thead>
          <tr className="border-b-2 ">
            <th className="table-heading">Coin</th>
            <th className="table-heading">Name</th>
            <th className="table-heading">Price</th>
            <th className="table-heading">24H</th>
            <th className="table-heading">Total volume</th>
            <th className="table-heading">last 7 days</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr
              key={coin.id}
              className="overflow-hidden border-b-2 rounded-bl-lg rounded-br-lg border-zinc-200/10"
            >
              <td className="flex items-center gap-4 table-data ">
                <img src={coin.image} alt={coin.name} className="w-4 h-4" />
                <span>{coin.symbol.toUpperCase()}</span>
              </td>
              <td className="table-data">{coin.name}</td>
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
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="table-data">{coin.total_volume}</td>
              <td className="table-data">
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
  );
}

export default Table;
