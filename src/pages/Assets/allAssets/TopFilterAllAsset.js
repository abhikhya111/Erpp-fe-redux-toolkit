import React from "react";

const TopFilterAdd = () => {
  return (
    <div className="flex gap-2 flex-wrap justify-between">
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold"
        />
        <select className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold">
          <option>All Asset</option>
          <option>Laptop</option>
          <option>Computer</option>
          <option>Mobile</option>
          <option>Table</option>
          <option>T-shirt</option>
        </select>
        <i className="fa-solid fa-filter border p-2 border-blue-700 text-blue-700 rounded cursor-pointer"></i>
      </div>
      <div>
        <button className="bg-blue-900 px-3 py-1 rounded text-gray-100">
          + Add Asset
        </button>
      </div>
    </div>
  );
};

export default TopFilterAdd;
