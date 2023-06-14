import React from "react";

export default function ProductCard() {
  return (
    <div className="max-w-[250px] rounded overflow-hidden shadow-lg">
      <img
        src="https://thumbnail.10x10.co.kr/webimage/image/basic600/209/B002095704.jpg?cmd=thumb&w=200&h=200&fit=true&ws=false"
        alt=""
        className="w-full"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
        </p>
      </div>
      <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
      </div>
    </div>
  );
}
