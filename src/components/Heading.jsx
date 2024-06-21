function Heading({ night }) {
  return (
    <div
      className={`p-4 mt-4 bg-indigo-600 rounded-lg ${!night && "bg-zinc-700"}`}
    >
      <h1 className="text-base text-indigo-100 md:text-2xl xsm:text-xl ">
        Crypto App
      </h1>
    </div>
  );
}

export default Heading;
