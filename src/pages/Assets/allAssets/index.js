import React from "react";
import TopFilterAllAsset from "./TopFilterAllAsset";
import AllAssetsList from "./AllAssetsList";

const AllAssets = () => {
  return (
    <div className="bg-white p-5 shadow text-left">
      <TopFilterAllAsset />
      <AllAssetsList />
    </div>
  );
};

export default AllAssets;
