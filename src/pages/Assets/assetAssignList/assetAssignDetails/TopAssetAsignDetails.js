import React from "react";
import { Link } from "react-router-dom";

const TopAssetAssignDetails = () => {
  return (
    <div className="border-b-2">
      <div className="p-5">
        <div className="flex justify-between text-blue-900 flex-wrap">
          <Link to="/assets/assetassign" className="flex items-center gap-5 flex-wrap">
            <i className="fa-solid fa-arrow-left"></i>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="bg-purple-700 w-6 h-6 rounded-full text-white flex items-center justify-center">
                B
              </p>
              <div className="flex items-center gap-2 sm:gap-10 flex-wrap">
                <p className="text-lg font-semibold">
                  Bhupinder Singh (ID12345678)
                </p>
                <p className="text-sm text-blue-700">
                  Manager | IT Infa And Security
                </p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <i className="fa-solid fa-print border p-2 border-blue-700 text-blue-700 rounded cursor-pointer"></i>
            <i className="fa-solid fa-ellipsis-vertical text-blue-700  cursor-pointer"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAssetAssignDetails;
