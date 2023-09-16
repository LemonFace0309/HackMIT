type Direction = "N" | "S" | "E" | "W";

export const formatCoordinate = (coord: number, pos: Direction, neg: Direction) => {
  const direction = coord > 0 ? pos : neg;
  return `${Math.abs(coord).toFixed(3)}° ${direction}`;
};
