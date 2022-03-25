import React from "react";

function Loader({height = 8, width = 8}) {
  return (
    <div class=" flex justify-center items-center">
      <div class={`animate-spin rounded-full h-${height} w-${width} border-b-4 border-gray-900`}></div>
    </div>
  );
}

export default Loader;
