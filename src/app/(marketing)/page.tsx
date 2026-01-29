export default function Home() {
  return (
    <div className="max-w-[700px] m-auto flex flex-col items-center gap-12  mt-64">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl tracking-tight text-center font-serif font-normal ">
          The Professional Network <br /> for builders to show & tell!
        </h1>
        <p className="font-sans text-center text-xl text-gray-600">
          Showcase your work, launch projects, find jobs, and connect <br />{" "}
          with the most (in)credible people.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none font-sans text-sm leading-5 rounded-xl py-2  px-6 text-gray-900 bg-gray-100 border-gray-300  hover:bg-gray-200">
          Log In
        </button>
        <button className="flex items-center font-semibold border transition-all ease-in duration-75 font-sans whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-2 px-6 bg-emerald-500 text-white border-emerald-600   hover:bg-emerald-600">
          Register
        </button>
      </div>
    </div>
  );
}
