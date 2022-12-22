import React from "react";

const AssetCategory = () => {
  return (
    <div className="rounded bg-white shadow-md p-5 my-5">
      <div className="flex gap-10 items-center flex-wrap">
        <p className="text-xl font-semibold">Asset Category</p>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold"
          />
          <select className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold">
            <option>All Category</option>
            <option>Electronic</option>
            <option>Cloths</option>
            <option>Vahicle</option>
          </select>
          <select className="bg-gray-100 border-2 rounded outline-0 px-2 py-1 sm:w-52 w-full font-semibold">
            <option>All Sub-Category</option>
            <option>Electronic</option>
            <option>Cloths</option>
            <option>Vahicle</option>
          </select>
          <i className="fa-solid fa-filter border p-2 border-blue-700 text-blue-700 rounded cursor-pointer"></i>
          <i className="fa-solid fa-print border p-2 border-blue-700 text-blue-700 rounded cursor-pointer"></i>
        </div>
        <i className="fa-solid fa-ellipsis-vertical text-blue-700  cursor-pointer"></i>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mt-5 text-blue-900">
          <tr className="border-2 bg-gray-100">
            <th className="text-left pl-5 py-1">Category</th>
            <th className="text-left pl-5 py-1">Sub-Category</th>
            <th className="text-left pl-5 py-1">Available</th>
            <th className="text-left pl-5 py-1">New</th>
            <th className="text-left pl-5 py-1">Returned</th>
            <th className="text-left pl-5 py-1">Assigned</th>
            <th className="text-left pl-5 py-1">Total</th>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
          <tr className="border-2">
            <td className="text-left pl-5 py-1">Electronic</td>
            <td className="text-left pl-5 py-1">Laptop</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">02</td>
            <td className="text-left pl-5 py-1">10</td>
            <td className="text-left pl-5 py-1">50</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default AssetCategory;
