import React from "react";
import Ibuprofen from "../assets/ibuprofen.png";

function Home() {
  return (
    <div className="flex justify-center p-3">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={Ibuprofen} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Ibuprofen</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #winter
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
