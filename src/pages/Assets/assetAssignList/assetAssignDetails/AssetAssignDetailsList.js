import React from "react";

const AssetAssignDetailsList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-11/12 m-auto mt-5 text-blue-900 text-sm">
        <tr className="text-left bg-gray-100 border-2 rounded-md">
          <th className="px-5">Item center</th>
          <th className="px-5">Type</th>
          <th className="px-5">Brand</th>
          <th className="px-5">Model</th>
          <th className="px-5">Serial No</th>
          <th className="px-5">Status</th>
          <th className="px-5">Action</th>
        </tr>
        <tr className="border-2 rounded-md">
          <td className="px-5 p-2">Laptop</td>
          <td className="px-5 p-2">Macbook Pro</td>
          <td className="px-5 p-2">Apple</td>
          <td className="px-5 p-2">ABCD123456789</td>
          <td className="px-5 p-2">SN123456712</td>
          <td className="px-5 p-2 text-green-600">Active</td>
          <td className="px-5 p-2 flex gap-1 justify-end">
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-paperclip"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-message"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-clock-rotate-left"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-plus"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-eye"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-ellipsis-vertical"></i>
          </td>
        </tr>
        <tr className="border-2 rounded-md">
          <td className="px-5 p-2">Laptop</td>
          <td className="px-5 p-2">Macbook Pro</td>
          <td className="px-5 p-2">Apple</td>
          <td className="px-5 p-2">ABCD123456789</td>
          <td className="px-5 p-2">SN123456712</td>
          <td className="px-5 p-2 text-green-600">Active</td>
          <td className="px-5 p-2 flex gap-1 justify-end">
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-paperclip"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-message"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-clock-rotate-left"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-plus"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-eye"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-ellipsis-vertical"></i>
          </td>
        </tr>
        <tr className="border-2 rounded-md">
          <td className="px-5 p-2">Laptop</td>
          <td className="px-5 p-2">Macbook Pro</td>
          <td className="px-5 p-2">Apple</td>
          <td className="px-5 p-2">ABCD123456789</td>
          <td className="px-5 p-2">SN123456712</td>
          <td className="px-5 p-2 text-red-600">Not Working</td>
          <td className="px-5 p-2 flex gap-1 justify-end">
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-paperclip"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-message"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-clock-rotate-left"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-plus"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-eye"></i>
            <i className="border p-2 mt-2 cursor-pointer fa-solid fa-ellipsis-vertical"></i>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default AssetAssignDetailsList;
