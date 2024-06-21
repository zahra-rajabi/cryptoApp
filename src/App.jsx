import Heading from "./components/Heading";
import Paginations from "./components/Paginations";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
/////////////////////
let body = document.body;
///////////////////
function App() {
  let [pageNumber, setPageNumber] = useState(1);
  let [currency, setCurrency] = useState("usd");
  let [data, setData] = useState([]);
  let [modalData, setModalData] = useState([]);
  let [OpenModal, setOpenModal] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [night, setNight] = useState(true);
  //////////////////////////////////////
  night
    ? (body.style.backgroundColor = "#27272a")
    : (body.style.backgroundColor = "#e0e7ff");

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
      <Heading night={night} />

      {!isLoading ? (
        <>
          <SearchBox
            currency={currency}
            setCurrency={setCurrency}
            modalData={modalData}
            setModalData={setModalData}
            OpenModal={OpenModal}
            night={night}
            setNight={setNight}
            setOpenModal={setOpenModal}
          />
          <Table
            data={data}
            currency={currency}
            modalData={modalData}
            setModalData={setModalData}
            OpenModal={OpenModal}
            setOpenModal={setOpenModal}
            night={night}
          />
          <Paginations pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
