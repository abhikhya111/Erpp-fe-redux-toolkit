import React from "react";
import { Link } from "react-router-dom";

const TopAssetDetails = () => {
  return (
    <div className="border-b-2">
      <div className="p-5">
        <div className="flex justify-between text-blue-900 flex-wrap">
          <Link to="/assets/allassets" className="flex items-center gap-5">
            <i className="fa-solid fa-arrow-left"></i>
            <p>Asset Details</p>
          </Link>
          <div className="flex items-center gap-5">
            <div className="flex gap-2 items-center">
              <i className="fa-solid fa-message text-sm mt-1"></i>
              <p>Remark</p>
            </div>
            <div>
              <button className="bg-blue-900 px-3 py-1 rounded text-gray-100">
                + Add Asset
              </button>
            </div>
            <i className="fa-solid fa-ellipsis-vertical text-blue-700  cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAssetDetails;
