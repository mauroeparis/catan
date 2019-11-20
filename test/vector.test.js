import V from "../src/Vector";

describe("Vector", () => {
  const P = (x, y) => new V(x, y);

  it("should be array like serializable", () => {
    const v = P(1, 1);
    expect(v.toString()).toBe(`${v.x},${v.y}`);
  });

  it("should define the zero vector", () => {
    expect(V.zero.x).toBe(0);
    expect(V.zero.y).toBe(0);
  });

  it("should add", () => {
    const v = P(5, 2);
    const w = P(-5, -2);
    expect(V.add(v, w)).toStrictEqual(V.zero);
    expect(V.add(v, 10)).toStrictEqual(P(15, 12));
  });

  it("should rotate", () => {
    const v = P(1, 0);
    const h = Math.sqrt(2) / 2;
    expect(V.rot(v, -45).x).toBeCloseTo(h);
    expect(V.rot(V.rot(v, -45), Math.PI / 4, false).x).toBeCloseTo(v.x);
  });
});
