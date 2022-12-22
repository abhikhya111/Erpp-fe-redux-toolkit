import React from "react";

const CategorySubConditonTop = ({ topTitle }) => {
  return (
    <div className="p-3 shadow">
      <div className="flex gap-2 flex-wrap justify-between">
        <div className="flex flex-wrap">
          <div className="flex items-center gap-2 font-semibold">
            <i className="fa-solid fa-arrow-left"></i>
            <p>{topTitle}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold">
            <option>All Category</option>
            <option>Electronic</option>
            <option>Cloths</option>
            <option>Vehicle</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold"
          />
          <button className="bg-blue-900 px-3 py-1 rounded text-gray-100">
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySubConditonTop;
