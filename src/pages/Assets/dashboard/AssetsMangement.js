import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const AssetsMangement = () => {
  return (
    <div className="rounded bg-white shadow-md p-5 mt-5 w-full md:w-3/4">
      <p className="text-xl font-semibold mb-5 text-center md:text-left">
        Asset Management
      </p>
      <div className="flex md:justify-between gap-10 flex-wrap justify-center md:flex-nowrap">
        <div className="w-48 md:w-72">
          <CircularProgressbar
            value="80"
            text="90%"
            styles={{
              path: { stroke: "#41b741" },
              text: {
                fill: "blue",
                fontSize: "20px",
                fontWeight: "bold",
              },
            }}
            strokeWidth="5"
          />
          <p>Planned Assets Utilization</p>
        </div>
        <div className="w-full">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p>Assigned Assets</p>
              <p>110</p>
            </div>
            <ProgressBar percent={75} filledBackground="#0000FF" />
          </div>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p>Available</p>
              <p>30</p>
            </div>
            <ProgressBar percent={30} filledBackground="#41b741" />
          </div>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <p>Unavailable</p>
              <p>40</p>
            </div>
            <ProgressBar percent={40} filledBackground="#FF0000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsMangement;
