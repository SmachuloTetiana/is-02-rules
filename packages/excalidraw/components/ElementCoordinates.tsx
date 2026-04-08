import React, { useMemo } from "react";

import { getCommonBounds } from "@excalidraw/element";
import { arrayToMap } from "@excalidraw/common";

import "./ElementCoordinates.scss";

import type { ExcalidrawElement } from "@excalidraw/element/types";

type ElementCoordinatesProps = {
  elements: readonly ExcalidrawElement[];
  precision?: number;
};

const formatValue = (value: number, precision: number): string => {
  return precision > 0 ? value.toFixed(precision) : String(Math.round(value));
};

export const ElementCoordinates = React.memo(
  ({ elements, precision = 0 }: ElementCoordinatesProps) => {
    const coordinates = useMemo(() => {
      if (elements.length === 0) {
        return null;
      }

      const elementsMap = arrayToMap(elements);
      const [minX, minY, maxX, maxY] = getCommonBounds(elements, elementsMap);
      const width = maxX - minX;
      const height = maxY - minY;

      return {
        x: minX,
        y: minY,
        width,
        height,
      };
    }, [elements]);

    if (!coordinates) {
      return <div className="element-coordinates element-coordinates--empty" />;
    }

    return (
      <div className="element-coordinates">
        <span className="element-coordinates__item">
          X: {formatValue(coordinates.x, precision)}
        </span>
        <span className="element-coordinates__item">
          Y: {formatValue(coordinates.y, precision)}
        </span>
        <span className="element-coordinates__item">
          W: {formatValue(coordinates.width, precision)}
        </span>
        <span className="element-coordinates__item">
          H: {formatValue(coordinates.height, precision)}
        </span>
      </div>
    );
  },
);
