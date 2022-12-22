import React from "react";

const CategoryList = () => {
  return (
    <div className="mt-3 h-screen">
      <div className="flex justify-between px-5 py-3 font-semibold border-b-2">
        <p>Electronic</p>
        <i className="fa-solid fa-trash-can mt-1 cursor-pointer"></i>
      </div>
      <div className="flex justify-between px-5 py-3 font-semibold border-b-2">
        <p>Cloths</p>
        <i className="fa-solid fa-trash-can mt-1 cursor-pointer"></i>
      </div>
      <div className="flex justify-between px-5 py-3 font-semibold border-b-2">
        <p>Vehicle</p>
        <i className="fa-solid fa-trash-can mt-1 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default CategoryList;
