export const spliceArray = (items = [], page = 0, size = 10) => {
  const startPos = page * size;
  return items.splice(startPos, size);
};
