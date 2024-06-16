import Heading from "./components/Heading";
import Paginations from "./components/Paginations";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import { useState, useEffect } from "react";

function App() {
  let [pageNumber, setPageNumber] = useState(1);
  let [currency, setCurrency] = useState("usd");
  let [data, setData] = useState([]);
  let [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${pageNumber}&per_page=20&price_change_percentage=24h&locale=en&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, [pageNumber, currency]);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&locale=en&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => setSearchData(json))
      .catch((error) => console.log(error));
  }, []);
  /////////////////////
  return (
    <>
      <Heading />
      <SearchBox
        currency={currency}
        setCurrency={setCurrency}
        searchData={searchData}
      />
      <Table data={data} currency={currency} />
      <Paginations pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </>
  );
}

export default App;
