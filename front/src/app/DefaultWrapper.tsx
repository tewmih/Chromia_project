'use client';

import dynamic from "next/dynamic";

const DefaultComponent = dynamic(() => import("./DefaultProviderComponent"), {
  ssr: false,
});

export default DefaultComponent;
