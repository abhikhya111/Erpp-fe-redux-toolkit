import React from "react";
import CategorySubConditonTop from "../CategorySubConditonTop";
import AddAssetConditionCompo from "./AddAssetCondition";

const AddAssetCondition = () => {
  return (
    <div className="bg-white">
      <CategorySubConditonTop topTitle="Add Asset Conditions" />
      <AddAssetConditionCompo />
    </div>
  );
};

export default AddAssetCondition;
