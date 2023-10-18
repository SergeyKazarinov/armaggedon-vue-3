/**
 * Функция, которая получает среднее значение
 * @param {Number} diameterMin - минимальный диаметр
 * @param {Number}  diameterMax - максимальный диаметр
 * @returns {Number}  средней значение
 */
export const getDiameterAsteroid = (diameterMin: number, diameterMax: number): number => {
  return Math.floor((diameterMin + diameterMax) / 2);
};
