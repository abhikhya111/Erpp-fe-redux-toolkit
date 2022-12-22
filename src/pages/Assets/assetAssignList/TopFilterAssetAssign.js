import React from "react";

const TopFilterAdd = () => {
  return (
    <div className="flex gap-2 flex-wrap justify-between items-center">
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 border-2 rounded outline-0 px-2 py-1  sm:w-52 w-full font-semibold"
        />
        <select className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 font-semibold sm:w-52 w-full">
          <option>All Asset</option>
          <option>Laptop</option>
          <option>Computer</option>
          <option>Mobile</option>
          <option>Table</option>
          <option>T-shirt</option>
        </select>
        <i className="fa-solid fa-filter border p-2 border-blue-700 text-blue-700 rounded cursor-pointer"></i>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <p className="w-2 h-2 rounded-full bg-green-600"></p>
          <p>Active</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className="w-2 h-2 rounded-full bg-blue-700"></p>
          <p>Replacement</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className="w-2 h-2 rounded-full bg-yellow-600"></p>
          <p>Not Working</p>
        </div>
        <i className="fa-solid fa-ellipsis-vertical text-blue-700  cursor-pointer"></i>
      </div>
    </div>
  );
};

export default TopFilterAdd;
