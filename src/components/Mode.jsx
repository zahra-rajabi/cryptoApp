import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

function Mode({ night, setNight }) {
  return (
    <div
      className={`relative w-1/5 xsm:w-2/12 md:w-[8%] overflow-hidden bg-indigo-600 rounded-full cursor-pointer h-7 self-end md:self-center mb-4 md:mb-0 ${
        !night && "bg-zinc-700"
      }`}
      onClick={() => setNight(!night)}
    >
      <IoMoonOutline
        className={`absolute z-10 text-indigo-600 -translate-y-1/2 left-1 top-1/2 size-5 ${
          !night && " !text-zinc-700"
        }`}
      />

      <div
        className={`absolute w-1/2 h-full bg-indigo-100 transition-all duration-300 rounded-full ${
          !night && "translate-x-full bg-indigo-600"
        }`}
      ></div>

      <IoSunnyOutline
        className={`absolute text-indigo-600 -translate-y-1/2 right-1 top-1/2 size-5 ${
          !night && " !text-zinc-100"
        }`}
      />
    </div>
  );
}

export default Mode;
