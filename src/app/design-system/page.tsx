import React from "react";

const DesignSystem = () => {
  return (
    <section className="font-sans p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Design System</h1>
      <section className="border p-2">
        <h2 className="text-2xl md:text-3xl">Typography</h2>
        <h1 className="text-xl md:text-2xl">Typography</h1>
        <h2 className="text-lg md:text-xl">Typography</h2>
        <h3 className="text-md md:text-lg">Typography</h3>
        <h4 className="text-sm md:text-md">Typography</h4>
        <h5 className="text-xs md:text-sm">Typography</h5>
        <h6 className="text-xxs md:text-xs">Typography</h6>
      </section>
      <section className="border p-2 flex   gap-4">
        <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-gray-900 bg-gray-100 border-gray-300  hover:bg-gray-200">
          Log In
        </button>
        <button className="flex items-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 bg-emerald-500 text-white border-emerald-600   hover:bg-emerald-600">
          Register
        </button>
      </section>
    </section>
  );
};

export default DesignSystem;
