import { IconContext } from "react-icons";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

function Mode({ night, setNight }) {
  return (
    <div
      className={`relative w-[6%] overflow-hidden bg-indigo-600 rounded-full cursor-pointer h-7 ${
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
          !night && "translate-x-full"
        }`}
      ></div>

      <IoSunnyOutline
        className={`absolute text-indigo-600 -translate-y-1/2 right-1 top-1/2 size-5`}
      />
    </div>
  );
}

export default Mode;
