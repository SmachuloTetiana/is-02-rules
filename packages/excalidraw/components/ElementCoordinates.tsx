import React, { useMemo } from "react";

import { pointFrom, pointRotateRads, round } from "@excalidraw/math";

import { getCommonBounds } from "@excalidraw/element";

import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { GlobalPoint } from "@excalidraw/math";

import "./ElementCoordinates.scss";

export interface ElementCoordinatesProps {
  elements: readonly ExcalidrawElement[];
  precision?: number;
}

const getElementCenter = (element: ExcalidrawElement): GlobalPoint => {
  const cx = element.x + element.width / 2;
  const cy = element.y + element.height / 2;
  return pointFrom(cx, cy);
};

const getElementTopLeft = (element: ExcalidrawElement): GlobalPoint => {
  const [cx, cy] = getElementCenter(element);
  return pointRotateRads(
    pointFrom(element.x, element.y),
    pointFrom(cx, cy),
    element.angle,
  );
};

export const ElementCoordinates = ({
  elements,
  precision = 0,
}: ElementCoordinatesProps) => {
  const coordinates = useMemo(() => {
    if (elements.length === 0) {
      return null;
    }

    if (elements.length === 1) {
      const element = elements[0];
      const [topLeftX, topLeftY] = getElementTopLeft(element);
      const [centerX, centerY] = getElementCenter(element);

      return {
        topLeft: { x: round(topLeftX, precision), y: round(topLeftY, precision) },
        center: { x: round(centerX, precision), y: round(centerY, precision) },
        dimensions: {
          width: round(element.width, precision),
          height: round(element.height, precision),
        },
      };
    }

    const [minX, minY, maxX, maxY] = getCommonBounds(elements);
    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;

    return {
      topLeft: { x: round(minX, precision), y: round(minY, precision) },
      center: { x: round(centerX, precision), y: round(centerY, precision) },
      dimensions: {
        width: round(width, precision),
        height: round(height, precision),
      },
    };
  }, [elements, precision]);

  if (!coordinates) {
    return (
      <div className="element-coordinates element-coordinates--empty">
        No element selected
      </div>
    );
  }

  return (
    <div className="element-coordinates">
      <div className="element-coordinates__section">
        <span className="element-coordinates__label">Position</span>
        <div className="element-coordinates__values">
          <span className="element-coordinates__value">
            X: {coordinates.topLeft.x}
          </span>
          <span className="element-coordinates__value">
            Y: {coordinates.topLeft.y}
          </span>
        </div>
      </div>

      <div className="element-coordinates__section">
        <span className="element-coordinates__label">Center</span>
        <div className="element-coordinates__values">
          <span className="element-coordinates__value">
            X: {coordinates.center.x}
          </span>
          <span className="element-coordinates__value">
            Y: {coordinates.center.y}
          </span>
        </div>
      </div>

      <div className="element-coordinates__section">
        <span className="element-coordinates__label">Size</span>
        <div className="element-coordinates__values">
          <span className="element-coordinates__value">
            W: {coordinates.dimensions.width}
          </span>
          <span className="element-coordinates__value">
            H: {coordinates.dimensions.height}
          </span>
        </div>
      </div>
    </div>
  );
};

ElementCoordinates.displayName = "ElementCoordinates";
