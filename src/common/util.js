function clamp(x, fromX, toX) {
  let result = x;
  if (result < fromX) result = fromX;
  if (result > toX) result = toX;

  return result;
}

export default clamp;
