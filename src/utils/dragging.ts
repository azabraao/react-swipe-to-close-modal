export const normalizeYAxis = (y: number) => {
  return y < 0 ? y * -1 : y;
};

export const normalizeXAxis = (x: number) => {
  return x < 0 ? x * -1 : x;
};

export const transformAxisIntoPercentage = (axis: number) => {
  let axisInPercentage = (axis * -1) / 100;
  if (axisInPercentage < 0) axisInPercentage *= -1;

  const finalPositiveAxis = (axisInPercentage - 1) * -1;
  return finalPositiveAxis < 0 ? 0 : finalPositiveAxis;
};

export const getAxisOrientedOpacity = (x: number, y: number) => {
  let opacity = 1;
  y = normalizeYAxis(y);
  x = normalizeXAxis(x);

  if (x > y) {
    opacity = transformAxisIntoPercentage(x);
  } else {
    opacity = transformAxisIntoPercentage(y);
  }
  return opacity;
};
