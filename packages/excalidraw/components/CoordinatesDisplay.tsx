import { memo, useMemo } from "react";

import { getCommonBounds } from "@excalidraw/element";
import { round } from "@excalidraw/math";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import "./CoordinatesDisplay.scss";

type CoordinatesDisplayProps = {
  elements: readonly ExcalidrawElement[];
  showDimensions?: boolean;
  showCenter?: boolean;
  decimalPlaces?: number;
};

export const CoordinatesDisplay = memo(
  ({
    elements,
    showDimensions = true,
    showCenter = false,
    decimalPlaces = 2,
  }: CoordinatesDisplayProps) => {
    const data = useMemo(() => {
      if (elements.length === 0) {
        return null;
      }

      const [minX, minY, maxX, maxY] = getCommonBounds(elements);
      const width = maxX - minX;
      const height = maxY - minY;
      const centerX = minX + width / 2;
      const centerY = minY + height / 2;

      return {
        x: round(minX, decimalPlaces),
        y: round(minY, decimalPlaces),
        width: round(width, decimalPlaces),
        height: round(height, decimalPlaces),
        centerX: round(centerX, decimalPlaces),
        centerY: round(centerY, decimalPlaces),
      };
    }, [elements, decimalPlaces]);

    if (!data) {
      return (
        <div className="coordinates-display coordinates-display--empty">
          No selection
        </div>
      );
    }

    return (
      <div className="coordinates-display">
        <div className="coordinates-display__group">
          <span className="coordinates-display__label">X</span>
          <span className="coordinates-display__value">{data.x}</span>
        </div>
        <div className="coordinates-display__group">
          <span className="coordinates-display__label">Y</span>
          <span className="coordinates-display__value">{data.y}</span>
        </div>

        {showDimensions && (
          <>
            <div className="coordinates-display__group">
              <span className="coordinates-display__label">W</span>
              <span className="coordinates-display__value">{data.width}</span>
            </div>
            <div className="coordinates-display__group">
              <span className="coordinates-display__label">H</span>
              <span className="coordinates-display__value">{data.height}</span>
            </div>
          </>
        )}

        {showCenter && (
          <>
            <div className="coordinates-display__group">
              <span className="coordinates-display__label">CX</span>
              <span className="coordinates-display__value">{data.centerX}</span>
            </div>
            <div className="coordinates-display__group">
              <span className="coordinates-display__label">CY</span>
              <span className="coordinates-display__value">{data.centerY}</span>
            </div>
          </>
        )}
      </div>
    );
  },
);

CoordinatesDisplay.displayName = "CoordinatesDisplay";
