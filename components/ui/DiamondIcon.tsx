import React from "react";
import Svg, { Path } from "react-native-svg";

export default function DiamondIcon({ size = 12, color = "#ffffff" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L3 9l9 13 9-13-9-7z"
        stroke={color}
        strokeWidth={1.6}
        fill={color + "30"} 
        strokeLinejoin="round"
      />
      <Path
        d="M12 2v20M3 9h18M3 9l9 6 9-6"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}