import Heading from "./components/Heading";
import Paginations from "./components/Paginations";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";

function App() {
  let [pageNumber, setPageNumber] = useState(1);
  let [currency, setCurrency] = useState("usd");
  let [data, setData] = useState([]);

  let [isLoading, setIsLoading] = useState(false);

  ////////////////////////////////////
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${pageNumber}&per_page=20&price_change_percentage=24h&locale=en&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [pageNumber, currency]);

  /////////////////////
  return (
    <>
      <Heading />

      {!isLoading ? (
        <>
          <SearchBox currency={currency} setCurrency={setCurrency} />
          <Table data={data} currency={currency} />
          <Paginations pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
