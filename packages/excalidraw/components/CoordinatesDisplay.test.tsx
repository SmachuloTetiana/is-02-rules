import React from "react";

import { render } from "../tests/test-utils";

import { CoordinatesDisplay } from "./CoordinatesDisplay";

import type { ExcalidrawElement } from "@excalidraw/element/types";

const createMockElement = (
  overrides: Partial<ExcalidrawElement> = {},
): ExcalidrawElement =>
  ({
    id: "test-id",
    type: "rectangle",
    x: 100,
    y: 200,
    width: 50,
    height: 75,
    angle: 0,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "hachure",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    index: "a0",
    roundness: null,
    seed: 1,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
    ...overrides,
  }) as ExcalidrawElement;

describe("CoordinatesDisplay", () => {
  it("renders empty state when no elements", async () => {
    const { container } = await render(<CoordinatesDisplay elements={[]} />);

    expect(
      container.querySelector(".coordinates-display--empty"),
    ).not.toBeNull();
    expect(container.textContent).toContain("No selection");
  });

  it("renders coordinates for single element", async () => {
    const element = createMockElement({ x: 100, y: 200, width: 50, height: 75 });
    const { container } = await render(
      <CoordinatesDisplay elements={[element]} />,
    );

    expect(container.textContent).toContain("100");
    expect(container.textContent).toContain("200");
    expect(container.textContent).toContain("50");
    expect(container.textContent).toContain("75");
  });

  it("renders bounding box for multiple elements", async () => {
    const element1 = createMockElement({
      id: "el1",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });
    const element2 = createMockElement({
      id: "el2",
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    });

    const { container } = await render(
      <CoordinatesDisplay elements={[element1, element2]} />,
    );

    expect(container.textContent).toContain("0");
    expect(container.textContent).toContain("300");
  });

  it("hides dimensions when showDimensions is false", async () => {
    const element = createMockElement();
    const { container } = await render(
      <CoordinatesDisplay elements={[element]} showDimensions={false} />,
    );

    const labels = container.querySelectorAll(".coordinates-display__label");
    const labelTexts = Array.from(labels).map((l) => l.textContent);

    expect(labelTexts).toContain("X");
    expect(labelTexts).toContain("Y");
    expect(labelTexts).not.toContain("W");
    expect(labelTexts).not.toContain("H");
  });

  it("shows center coordinates when showCenter is true", async () => {
    const element = createMockElement({ x: 0, y: 0, width: 100, height: 100 });
    const { container } = await render(
      <CoordinatesDisplay elements={[element]} showCenter />,
    );

    const labels = container.querySelectorAll(".coordinates-display__label");
    const labelTexts = Array.from(labels).map((l) => l.textContent);

    expect(labelTexts).toContain("CX");
    expect(labelTexts).toContain("CY");
  });

  it("respects decimalPlaces prop", async () => {
    const element = createMockElement({ x: 10.123456, y: 20.654321 });
    const { container } = await render(
      <CoordinatesDisplay elements={[element]} decimalPlaces={3} />,
    );

    expect(container.textContent).toContain("10.123");
    expect(container.textContent).toContain("20.654");
  });
});
