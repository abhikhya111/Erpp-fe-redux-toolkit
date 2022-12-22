import React from "react";
import Images from "../../../../assets/images/laptop.jpg";

const AssetDetails = () => {
  return (
    <div>
      <div className="flex p-5 justify-center md:justify-between gap-5 flex-wrap md:flex-nowrap">
        <img src={Images} alt="" className="border p-5 w-2/5" />
        <div className="border p-5">
          <p className="text-base font-bold">
            HP 15s-du1115TU Intel CDC N4020. HP 15s-du1115TU Intel CDC N4020. HP
            15s-du1115TU Intel CDC N4020. HP 15s-du1115TU Intel CDC N4020
          </p>
          <div className="mt-4">
            <div className="flex gap-12 mt-3">
              <div>
                <p className="py-1">Asset No</p>
                <p className="py-1">Available Qty</p>
                <p className="py-1">Asset Condition</p>
                <p className="py-1">Amount</p>
                <p className="py-1">Brand</p>
                <p className="py-1">Model Name</p>
                <p className="py-1">Serial No</p>
                <p className="py-1">Warranty</p>
                <p className="py-1">Purchase Date</p>
              </div>
              <div>
                <p className="font-bold py-1">ABC2345, ABC2345, ABC2345</p>
                <p className="font-bold py-1">3</p>
                <p className="font-bold py-1">New</p>
                <p className="font-bold py-1">3125.36 USD</p>
                <p className="font-bold py-1">Apple</p>
                <p className="font-bold py-1">Macbook Pro</p>
                <p className="font-bold py-1">
                  ABCD12345675, ABCD12345675, ABCD12345675
                </p>
                <p className="font-bold py-1">01-02-2021 to 31-02-2022</p>
                <p className="font-bold py-1">01-02-2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5 px-5">
        <div className="w-2/5"></div>
        <div className="border p-5">
          <p className="text-lg font-bold">About this item</p>
          <ul className="list-disc px-5">
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
