// Utility 2d vector maths for the board

class V {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(v, w) {
    if (typeof w === "number") return new V(v.x + w, v.y + w);
    return new V(v.x + w.x, v.y + w.y);
  }

  static rot(v, a, degree = false) {
    // Rotates vector v in a radians (or degrees if degree = true)
    const radians = degree ? a * (Math.PI / 180) : a;
    const [sina, cosa] = [Math.sin(radians), Math.cos(radians)];
    return new V(cosa * v.x - sina * v.y, sina * v.x + cosa * v.y);
  }

  static get zero() {
    return new V(0, 0);
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}
export default V;
