export const formatUnit = function (refSize: number, scaleSize: number) {
  return function (value: number) {
    return scaleSize * (value / refSize);
  };
};
