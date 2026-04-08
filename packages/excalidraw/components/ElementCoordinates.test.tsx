import React from "react";

import { render } from "../tests/test-utils";

import { ElementCoordinates } from "./ElementCoordinates";

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

describe("ElementCoordinates", () => {
  it("renders empty state when no elements", async () => {
    const { container } = await render(<ElementCoordinates elements={[]} />);

    expect(
      container.querySelector(".element-coordinates--empty"),
    ).not.toBeNull();
  });

  it("renders coordinates for single element", async () => {
    const element = createMockElement({ x: 100, y: 200, width: 50, height: 75 });

    const { container } = await render(
      <ElementCoordinates elements={[element]} />,
    );

    expect(container.textContent).toContain("X: 100");
    expect(container.textContent).toContain("Y: 200");
    expect(container.textContent).toContain("W: 50");
    expect(container.textContent).toContain("H: 75");
  });

  it("renders common bounds for multiple elements", async () => {
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
      <ElementCoordinates elements={[element1, element2]} />,
    );

    expect(container.textContent).toContain("X: 0");
    expect(container.textContent).toContain("Y: 0");
    expect(container.textContent).toContain("W: 300");
    expect(container.textContent).toContain("H: 300");
  });

  it("respects precision prop", async () => {
    const element = createMockElement({ x: 100.456, y: 200.789 });

    const { container } = await render(
      <ElementCoordinates elements={[element]} precision={2} />,
    );

    expect(container.textContent).toContain("X: 100.46");
    expect(container.textContent).toContain("Y: 200.79");
  });
});
