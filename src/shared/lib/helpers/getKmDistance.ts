const formatter = new Intl.NumberFormat('ru', {});

export const getKmDistance = (distance: number) => {
  return `${formatter.format(Math.floor(distance))} км`;
};
