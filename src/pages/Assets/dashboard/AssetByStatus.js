import React from "react";

const AssetByStatus = () => {
  return (
    <div className="rounded bg-white shadow-md p-5 mt-5 w-full md:w-2/6">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">Asset By status</p>
        <p className="text-blue-700 flex items-center gap-2 cursor-pointer">
          <i classNam="fa-solid fa-angle-down"></i>
          <p>All Asset</p>
        </p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-green-600 mt-2"></p>
          <p>Active</p>
        </div>
        <p className="font-bold">100</p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-blue-700 mt-2"></p>
          <p>Replacement</p>
        </div>
        <p className="font-bold">10</p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-yellow-600 mt-2"></p>
          <p>Not Working</p>
        </div>
        <p className="font-bold">03</p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-orange-600 mt-2"></p>
          <p>Lost</p>
        </div>
        <p className="font-bold">01</p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-orange-600 mt-2"></p>
          <p>Near warranty 01</p>
        </div>
        <p className="font-bold">12</p>
      </div>
      <div className="flex justify-between my-5 flex-wrap">
        <div className="flex item-center gap-2">
          <p className="w-3 h-3 rounded-full bg-orange-600 mt-2"></p>
          <p>Out of warranty 01</p>
        </div>
        <p className="font-bold">03</p>
      </div>
    </div>
  );
};

export default AssetByStatus;
