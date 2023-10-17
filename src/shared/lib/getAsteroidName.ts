/**
 * функция, которая возвращает имя астероида, заключенное в скобки
 * @param {String} name - полное имя астероида
 * @returns {String} имя астероида, заключенное в скобки
 */
export const getAsteroidName = (name: string): string => {
  return name.split('(')[1].slice(0, -1);
};
