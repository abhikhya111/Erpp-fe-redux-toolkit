import React from "react";
import TopAssetAsignDetails from "./TopAssetDetails";
import AssetAssignDetailsList from "./AssetDetails";

const AllAssetsDetails = () => {
  return (
    <div className="bg-white pb-10 text-left">
      <TopAssetAsignDetails />
      <AssetAssignDetailsList />
    </div>
  );
};

export default AllAssetsDetails;
