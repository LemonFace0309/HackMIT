import * as React from "react";
// @ts-ignore
import area from "@turf/area";

export function ControlPanel({ polygons }: { polygons: any[] }) {
  let polygonArea = 0;
  for (const polygon of polygons) {
    polygonArea += area(polygon);
  }

  return (
    <div className="control-panel">
      <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )}
    </div>
  );
}
