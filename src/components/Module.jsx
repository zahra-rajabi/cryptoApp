import React, { useState } from "react";
import { useEffect } from "react";
import convertData from "../helper/convertData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Module({ setOpenModal, modalData }) {
  let body = document.body;
  body.style.overflow = "hidden";
  ///////////////////////////
  let [, , currentPrice, marketCap, ath] = modalData;
  ////////////////////////////
  const [chart, setChart] = useState("");
  const [Type, setType] = useState("prices");
  ///////////////////////////
  const modalHandler = (event) => {
    if (event.target === event.currentTarget) {
      setOpenModal(false);
      body.style.overflowY = "scroll";
    }
  };

  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      return (
        <p className="label">{`${Type.replace(
          "_",
          " "
        )} :  $ ${payload[0].value.toFixed(4)}`}</p>
      );
    }
  }
  function clickHandler(event) {
    if (event.target.tagName === "BUTTON") {
      let chartCategory = event.target.innerHTML
        .toLowerCase()
        .replace(" ", "_");
      setType(chartCategory);
    }
  }
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${modalData[1].toLowerCase()}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => setChart(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      onClick={modalHandler}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overscroll-none backdrop-blur-sm"
    >
      <section className="w-3/5 p-4 text-indigo-100 border rounded-lg shadow-md h-4/5 border-indigo-50/50 bg-zinc-900/70 ">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 border-2 border-indigo-100 rounded-full w-fit">
            <img
              src={modalData[0]}
              alt={modalData[1]}
              className="w-10 h-10 rounded-full "
            />
          </div>
          <span className="text-lg font-semibold">
            {modalData[1].toUpperCase()}
          </span>
        </div>
        <div className="w-4/5 mx-auto h-3/5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={convertData(chart, Type)}
              width={400}
              height={400}
              margin={{
                top: 5,
                right: 10,
                left: 50,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeWidth="2px"
                strokeOpacity={0.2}
                strokeDasharray={(3, 3)}
                stroke="#dfdaf0"
              />
              <Line
                type="monotone"
                dataKey={Type}
                dot={false}
                strokeWidth={2}
                stroke="#3c399f"
              />
              <Tooltip content={<CustomTooltip />} />
              <XAxis dataKey="date" hide />
              <YAxis
                domain={["auto", "dataMax"]}
                stroke="#dfdaf08c"
                strokeOpacity={0.2}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="my-4 space-x-4" onClick={clickHandler}>
          <button
            className={`modal-btn ${Type === "prices" ? "active" : null}`}
          >
            Prices
          </button>
          <button
            className={`modal-btn ${Type === "market_caps" ? "active" : null}`}
          >
            Market Caps
          </button>
          <button
            className={`modal-btn ${
              Type === "total_volumes" ? "active" : null
            }`}
          >
            Total Volumes
          </button>
        </div>

        <section className="flex items-center justify-between my-8">
          <div>
            <span className="modal-info">Price :</span>
            <span> $ {currentPrice}</span>
          </div>
          <div>
            <span className="modal-info">ATH :</span>
            <span> $ {ath}</span>
          </div>
          <div>
            <span className="modal-info">Market Cap :</span>
            <span> $ {marketCap}</span>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Module;
