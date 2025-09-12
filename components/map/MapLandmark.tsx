"use client"

import dynamic from "next/dynamic"

const MapLandmark = dynamic(() => import("./MapLandmarkInner"), {
  ssr: false,
})

export default MapLandmark
