import React from "react";

const TotalCount = () => {
  return (
    <div className="flex justify-between gap-5 flex-wrap lg:flex-nowrap">
      <div className="bg-blue-700 w-40 pt-5 px-5 rounded">
        <p className="text-lg text-white font-medium">All Assets</p>
        <div className="text-white mt-10 text-right">
          <p className="text-4xl font-bold">200</p>
          <p>Total</p>
        </div>
      </div>

      <div className="bg-green-500 w-40 pt-5 px-5 rounded">
        <p className="text-lg text-white font-medium">Available</p>
        <div className="text-white mt-10 text-right">
          <p className="text-4xl font-bold">100</p>
          <p>Total</p>
        </div>
      </div>
      <div className="bg-blue-700 w-40 pt-5 px-5 rounded">
        <p className="text-lg text-white font-medium">Assigned</p>
        <div className="text-white mt-10 text-right">
          <p className="text-4xl font-bold">50</p>
          <p>Total</p>
        </div>
      </div>
      <div className="bg-red-500 w-40 pt-5 px-5 rounded">
        <p className="text-lg text-white font-medium">Unavailable</p>
        <div className="text-white mt-10 text-right">
          <p className="text-4xl font-bold">50</p>
          <p>Total</p>
        </div>
      </div>
      <div className="bg-white w-40 p-5 rounded shadow-md">
        <p className="text-lg font-medium text-blue-700">
          Registration/ Termination
        </p>
        <div className="text-white text-right">
          <p className="text-4xl font-bold text-red-500">10</p>
          <p className="text-blue-700">Total</p>
        </div>
      </div>
      <div className="bg-white w-40 p-5 rounded shadow-md">
        <p className="text-lg font-medium text-blue-700">
          New Request
        </p>
        <div className="text-white mt-4 text-right">
          <p className="text-4xl font-bold text-red-500">10</p>
          <p className="text-blue-700">Total</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCount;
