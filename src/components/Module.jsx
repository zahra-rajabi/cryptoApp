import { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { useEffect } from "react";
import Loader from "./Loader";
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

function Module({ setOpenModal, modalData, night }) {
  let body = document.body;
  body.style.overflow = "hidden";
  ///////////////////////////
  let [, , currentPrice, marketCap, ath] = modalData;
  let [loader, setLoader] = useState(false);
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
        <p
          className={`label ${
            !night && "text-indigo-600"
          } text-[9px] md:text-[12px]`}
        >{`${Type.replace("_", " ")} :  $ ${payload[0].value.toFixed(4)}`}</p>
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
    setLoader(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${modalData[1].toLowerCase()}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=CG-whH7WndtAnvTnk7hvuYDs8sV`
    )
      .then((res) => res.json())
      .then((json) => {
        setChart(json);
        setLoader(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      onClick={modalHandler}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overscroll-none backdrop-blur-sm"
    >
      <section
        className={`w-full md:w-3/5 mx-4 md:mx-0 p-2 md:p-4 overflow-y-scroll text-indigo-100 border rounded-lg shadow-md h-[65%] xl:h-4/6 xl:w-3/6 border-indigo-50/50 bg-zinc-900/70 ${
          !night && "!bg-indigo-100 border-indigo-600/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`p-1 border-2 border-indigo-100 rounded-full w-fit ${
                !night && "border-zinc-600"
              }`}
            >
              <img
                src={modalData[0]}
                alt={modalData[1]}
                className="w-10 h-10 rounded-full "
              />
            </div>
            <span
              className={`text-lg font-semibold ${!night && "text-zinc-600"}`}
            >
              {modalData[1].toUpperCase()}
            </span>
          </div>

          <div>
            <IoCloseOutline
              onClick={() => {
                setOpenModal(false);
                body.style.overflowY = "scroll";
              }}
              className={`text-indigo-600 size-8 ${!night && "text-zinc-700"}`}
            />
          </div>
        </div>
        <div className="mx-auto h-3/5">
          {loader ? (
            <div className="flex items-center justify-center w-full h-full">
              <Loader />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={convertData(chart, Type)}
                width={400}
                height={400}
              >
                <CartesianGrid
                  strokeWidth="2px"
                  strokeOpacity={0.2}
                  strokeDasharray={(3, 3)}
                  stroke={night ? "#dfdaf0" : "#4f46e5"}
                />
                <Line
                  type="monotone"
                  dataKey={Type}
                  dot={false}
                  strokeWidth={2}
                  stroke={night ? "#3c399f" : "#27272a"}
                />
                <Tooltip content={<CustomTooltip />} />
                <XAxis dataKey="date" hide />
                <YAxis
                  domain={["auto", "dataMax"]}
                  strokeOpacity={0.2}
                  className="text-[9px]"
                  stroke={night ? "#dfdaf0" : "#4f46e5"}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div
          className="flex items-center justify-center my-4 space-x-1 md:space-x-4"
          onClick={clickHandler}
        >
          <button
            className={`modal-btn ${
              Type === "prices"
                ? `active ${!night && "bg-indigo-600 !text-indigo-200"}`
                : null
            } ${!night ? "text-zinc-700 border-zinc-700 font-semibold" : null}`}
          >
            Prices
          </button>
          <button
            className={`modal-btn ${
              Type === "market_caps"
                ? `active ${!night && "bg-indigo-600  !text-indigo-200"}`
                : null
            }  ${
              !night ? "text-zinc-700 border-zinc-700 font-semibold" : null
            }`}
          >
            Market Caps
          </button>
          <button
            className={`modal-btn ${
              Type === "total_volumes"
                ? `active ${!night && "bg-indigo-600  !text-indigo-200"}`
                : null
            }  ${
              !night ? "text-zinc-700 border-zinc-700 font-semibold" : null
            }`}
          >
            Total Volumes
          </button>
        </div>

        <section className="flex items-center justify-between">
          <div>
            <span className={`modal-info ${!night && "text-indigo-600"}`}>
              Price :
            </span>
            <span
              className={`text-[9px] xsm:text-sm ${
                !night && "text-zinc-700 font-semibold"
              }`}
            >
              &nbsp; $ {currentPrice}
            </span>
          </div>
          <div>
            <span className={`modal-info  ${!night && "text-indigo-600"}`}>
              ATH :
            </span>
            <span
              className={`text-[9px] xsm:text-sm ${
                !night && "text-zinc-700 font-semibold"
              }`}
            >
              &nbsp; $ {ath}
            </span>
          </div>
          <div>
            <span className={`modal-info ${!night && "text-indigo-600"}`}>
              Market Cap :
            </span>
            <span
              className={`text-[9px] xsm:text-sm ${
                !night && "text-zinc-700 font-semibold"
              }`}
            >
              &nbsp; $ {marketCap}
            </span>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Module;
